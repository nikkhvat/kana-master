/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";

import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { GestureHandlerRootView, HandlerStateChangeEvent, PanGestureHandler } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";

import Learning from "./Learning";
import Practice from "./Practice";
import WordBuilding from "./WordBuilding";

import { RootStackParamList } from "@/types/navigationTypes";


type ContainerProps = {
  paddingTop: number;
};

const Container = styled.View<ContainerProps>`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding-top: ${({ paddingTop }) => paddingTop + "px"};
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: 700;
  margin-left: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.color4};
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  height: 54px;
`;

const TabLine = styled.View`
  background-color: ${({ theme }) => theme.colors.color4};
  height: 2px;
  width: 32px;
  position: absolute;
  top: 4px;
  left: 10px;
`;

type TabProps = {
  active: boolean;
};

const Tab = styled.Text<TabProps>`
  font-size: 15px;
  font-weight: 700;
  color: ${({ active, theme }) =>
    active ? theme.colors.color4 : theme.colors.color3};
`;

const Content = styled.View`
  flex: 1;
`;

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const screenWidth = Dimensions.get("window").width;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  enum Screen {
    Learning,
    Practice,
    WordBuilding
  }

  const { t } = useTranslation();

  const [screen, setScreen] = useState(Screen.Learning);

  const screens = [
    { title: t("learning.practice"), val: Screen.Learning },
    { title: t("learning.testing"), val: Screen.Practice },
    { title: t("learning.wordGame"), val: Screen.WordBuilding },
  ];

  const insets = useSafeAreaInsets();

  const onSwipeEnd = (
    event: HandlerStateChangeEvent<Record<string, unknown>>
  ) => {
    const { translationX } = event.nativeEvent;

    if (typeof translationX === "number") {
      if (translationX > 50 && screen > Screen.Learning) {
        handleTabPress(screen - 1);
      } else if (translationX < -50 && screen < Screen.WordBuilding) {
        handleTabPress(screen + 1);
      }
    }
  };

  const scrollViewRef = useRef<ScrollView>();

  const handleTabPress = (index: number) => {
    scrollViewRef?.current?.scrollTo({ x: index * screenWidth, animated: false });

    switch (index) {
      case 0:
        setScreen(Screen.Learning);
        break;
      case 1:
        setScreen(Screen.Practice);
        break;
      case 2:
        setScreen(Screen.WordBuilding);
        break;
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler onEnded={onSwipeEnd}>
        <Container paddingTop={insets.top}>
          <Title>{t("tabs.learning")}</Title>
          <Header>
            {screens.map((item) => (
              <TouchableOpacity
                key={item.val}
                style={{
                  padding: 10,
                }}
                onPress={() => handleTabPress(item.val)}
              >
                <Tab active={item.val === screen}>{item.title}</Tab>
                {item.val === screen && <TabLine />}
              </TouchableOpacity>
            ))}
          </Header>
          <Content>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              ref={scrollViewRef as any}
              style={{ flex: 1 }}
              scrollEnabled={false}
            >
              <Learning navigation={navigation} />
              <Practice navigation={navigation} />
              <WordBuilding navigation={navigation} />
            </ScrollView>
          </Content>
        </Container>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default React.memo(HomeScreen);
