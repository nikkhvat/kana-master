import React from "react";

import Button from "../../components/Button";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import styled, { useTheme } from "styled-components/native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../../App";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";

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

const HeaderButton = styled.TouchableOpacity`
  justify-content: row;
  justify-content: center;
  align-items: center;
`;

const InfoContainer = styled.View`
  height: 120px;
  border-color: ${({ theme }) => theme.colors.color2};
  border-bottom-width: 1px;
  padding-left: 20px;
  padding-right: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

const InfoBlock = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 40%;
`

const InfoTitle = styled.Text`
  color: ${({ theme }) => theme.colors.color4};
  font-size: 34px;
  font-weight: 700;
`;

const InfoSubTitle = styled.Text`
  color: ${({ theme }) => theme.colors.color4};
  font-size: 15px;
  font-weight: 400;
  margin-top: 10px;
`;

const VerticalBorder = styled.View`
  width: 1px;
  height: 70px;
  background-color: ${({ theme }) => theme.colors.color2};
`;

const Scroll = styled.ScrollView`
  padding-left: 20px;
  padding-right: 20px;
`;

const KanaStatContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding-top: 30px;
`

const KanaCard = styled.View`
  width: 108px;
  height: 85px;
  border-radius: 12px;
  border-color: ${({ theme }) => theme.colors.color2};
  border-width: 1px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const KanaCardTitle = styled.Text`
  color: ${({ theme }) => theme.colors.color4};
  font-size: 13px;
  font-weight: 700;
`;

const KanaCardSubTitle = styled.Text`
  color: ${({ theme }) => theme.colors.second_color3};
  font-size: 22px;
  font-weight: 700;
`;

const SelectionTitle = styled.Text`
  color: ${({ theme }) => theme.colors.color4};
  font-size: 17px;
  font-weight: 700;
  margin-top: 30px;
  margin-bottom: 15px;
`;

const SelectionContainer = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
`;

const SelectionRow = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`

type SelectionButtonProp = {
  empty?: boolean;
  selected?: boolean
  type?: "text" | "container"
};

const SelectionButton = styled.TouchableOpacity<SelectionButtonProp>`
  height: 50px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border-width: ${({ empty }) => (empty ? "0px" : "1px")};
  border-color: ${({ theme }) => theme.colors.color2};
  background-color: ${({ theme, selected, type }) =>
    selected
      ? type == "text"
        ? theme.colors.second_color3
        : theme.colors.second_color4
      : "transparent"};
  flex: 1;
`;

const SelectionText = styled.Text<{active?: boolean}>`
  color: ${({ theme, active }) => active ? theme.colors.color5 : theme.colors.color4};
  font-size: 13px;
  font-weight: 700;
`;

type ChooseAlphabetNavigationProp = StackNavigationProp<RootStackParamList, "ChooseAlphabet">;

interface ChooseAlphabetProps {
  navigation: ChooseAlphabetNavigationProp;
}

const ChooseAlphabet: React.FC<ChooseAlphabetProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const colors = useTheme().colors as Colors;

  return (
    <Container paddingTop={insets.top}>
      <Header>
        <HeaderButton onPress={() => navigation.goBack()}>
          <Icon name="keyboard-backspace" size={24} color={colors.color4} />
        </HeaderButton>
        <HeaderButton>
          <Icon name="square-edit-outline" size={24} color={colors.color4} />
        </HeaderButton>
      </Header>

      <InfoContainer>
        <InfoBlock>
          <InfoTitle>127</InfoTitle>
          <InfoSubTitle>Entries in scope</InfoSubTitle>
        </InfoBlock>
        <VerticalBorder />
        <InfoBlock>
          <InfoTitle>24</InfoTitle>
          <InfoSubTitle>Avaleble words</InfoSubTitle>
        </InfoBlock>
      </InfoContainer>

      <Scroll>
        <KanaStatContainer>
          <KanaCard>
            <KanaCardTitle>Hiragana</KanaCardTitle>
            <KanaCardSubTitle>46</KanaCardSubTitle>
          </KanaCard>
          <KanaCard>
            <KanaCardTitle>Katakana</KanaCardTitle>
            <KanaCardSubTitle>20</KanaCardSubTitle>
          </KanaCard>
        </KanaStatContainer>

        <SelectionTitle>Kana quick selection</SelectionTitle>

        <SelectionContainer>
          <SelectionRow>
            <SelectionButton empty></SelectionButton>
            <SelectionButton selected type="text">
              <SelectionText active>Hiragana</SelectionText>
            </SelectionButton>
            <SelectionButton>
              <SelectionText>Katakana</SelectionText>
            </SelectionButton>
          </SelectionRow>
          <SelectionRow>
            <SelectionButton>
              <SelectionText>Basic</SelectionText>
            </SelectionButton>
            <SelectionButton selected>
              <Icon name="check" size={24} color={colors.color4} />
            </SelectionButton>
            <SelectionButton>
              <Icon name="close" size={24} color={colors.color4} />
            </SelectionButton>
          </SelectionRow>
          <SelectionRow>
            <SelectionButton>
              <SelectionText>Dakuon</SelectionText>
            </SelectionButton>
            <SelectionButton selected>
              <Icon name="check" size={24} color={colors.color4} />
            </SelectionButton>
            <SelectionButton>
              <Icon name="close" size={24} color={colors.color4} />
            </SelectionButton>
          </SelectionRow>
          <SelectionRow>
            <SelectionButton selected type="text">
              <SelectionText active>Handakuon</SelectionText>
            </SelectionButton>
            <SelectionButton selected>
              <Icon name="check" size={24} color={colors.color4} />
            </SelectionButton>
            <SelectionButton selected>
              <Icon name="check" size={24} color={colors.color4} />
            </SelectionButton>
          </SelectionRow>
          <SelectionRow>
            <SelectionButton>
              <SelectionText>Yoon</SelectionText>
            </SelectionButton>
            <SelectionButton>
              <Icon name="close" size={24} color={colors.color4} />
            </SelectionButton>
            <SelectionButton>
              <Icon name="close" size={24} color={colors.color4} />
            </SelectionButton>
          </SelectionRow>
        </SelectionContainer>

        <Button
          customStyles={{ marginTop: 60, marginBottom: 15 }}
          title={"Confirm"}
          type={"general"}
          fontSize={17}
          onClick={() => {
            navigation.goBack();
          }}
        />
      </Scroll>
    </Container>
  );
};

export default ChooseAlphabet;