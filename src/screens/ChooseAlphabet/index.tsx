import React, { useCallback, useState } from "react";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styled, { useTheme } from "styled-components/native";

import ChooseAlphabetModal from "@/components/ChooseAlphabetModal";
import KanaCategory from "@/components/KanaCategory";
import { Colors } from "@/constants/app";
import { RootStackParamList } from "@/types/navigationTypes";

const Container = styled.View<{ paddingTop: number }>`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.color1};
  padding-top: ${({ paddingTop }) => paddingTop + "px"};
`;

const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
`;

const HeaderButton = styled.Pressable`
  justify-content: row;
  justify-content: center;
  align-items: center;
  padding: 18px;
  margin: -18px;
`;

type ChooseAlphabetNavigationProp = StackNavigationProp<RootStackParamList, "ChooseAlphabet">;
type ChooseAlphabetScreenRouteProp = RouteProp<RootStackParamList, "ChooseAlphabet">;

interface ChooseAlphabetProps {
  route: ChooseAlphabetScreenRouteProp;
  navigation: ChooseAlphabetNavigationProp;
}

const ChooseAlphabet: React.FC<ChooseAlphabetProps> = ({ route, navigation }) => {

  const { screen } = route.params;

  const insets = useSafeAreaInsets();

  const colors = useTheme().colors as Colors;

  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const closeModal = useCallback(() => setModalVisible(false), []);

  return (
    <Container paddingTop={insets.top}>
      <Header>
        <HeaderButton onPress={() => navigation.goBack()}>
          <Icon name="keyboard-backspace" size={24} color={colors.color4} />
        </HeaderButton>
        <HeaderButton onPress={() => setModalVisible(true)}>
          <Icon name="square-edit-outline" size={24} color={colors.color4} />
        </HeaderButton>
      </Header>

      {!isModalVisible && (
        <KanaCategory screen={screen} navigation={navigation} />
      )}
      <ChooseAlphabetModal closeModal={closeModal} show={isModalVisible} />
    </Container>
  );
};

export default ChooseAlphabet;