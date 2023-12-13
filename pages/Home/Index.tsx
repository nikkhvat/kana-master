import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";

import Learning from "./Learning";
import Practice from "./Practice";
import WordBuilding from "./WordBuilding";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import styled from 'styled-components/native';

const Container = styled.View<{paddingTop: number }>`
  flex: 1;
  background-color: ${({theme}: any) => theme.colors.background};
  padding-top: ${({ paddingTop }) => paddingTop + "px"};
`

const Title = styled.Text`
  font-size: 28;
  font-weight: 700;
  margin-left: 20;
  margin-top: 20;
  margin-bottom: 10;
  color: ${({ theme }) => theme.colors.color4};
`

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  height: 54px;
`

const TabLine = styled.View`
  background-color: ${({ theme }) => theme.colors.color4};
  height: 2px;
  width: 32px;
  position: absolute;
  top: -6px;
  left: 0;
`

const Tab = styled.Text<{active: boolean }>`
  font-size: 15px;
  font-weight: 700;
  color: ${({ active, theme }) => active 
    ? theme.colors.color4 
    : theme.colors.color3};
  cursor: pointer;
`

const Content = styled.View`
  flex: 1;
`

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  enum Screen {
    Learning,
    Practice,
    WordBuilding
  }

  const [screen, setScreen] = useState(Screen.Learning);

  const screens = [
    { title: "Practice", val: Screen.Learning },
    { title: "Testing", val: Screen.Practice },
    { title: "Word game", val: Screen.WordBuilding },
  ];

  const insets = useSafeAreaInsets();

  return (
    <Container paddingTop={insets.top} >
      <Title>Learning</Title>
      <Header>
        {screens.map((item) => (
          <TouchableOpacity key={item.val} onPress={() => setScreen(item.val)} >
            <Tab active={item.val === screen} >{item.title}</Tab>
            {item.val === screen && <TabLine />}
          </TouchableOpacity>
        ))}
      </Header>
      <Content>
        {screen === Screen.Learning && <Learning />}
        {screen === Screen.Practice && <Practice />}
        {screen === Screen.WordBuilding && <WordBuilding />}
      </Content>
    </Container>
  );
};

export default React.memo(HomeScreen);
