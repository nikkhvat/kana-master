import React from "react";

import { useTheme } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styled from "styled-components/native";

import { Colors } from "@/constants/app";
import { useAppSelector } from "@/hooks/redux";
import learningImage from "@/resources/preview/learning.png";
import practiceImage from "@/resources/preview/practice.png";
import wordgameImage from "@/resources/preview/wordgame.png";
import { RootState } from "@/store/store";

type PreviewCard = {
  imageSource: "learning" | "practice" | "wordgame";
  onEdit?: () => void;
};

const Container = styled.ImageBackground`
  height: 240px;
  border-color: transparent;
  border-radius: 20px;
  overflow: hidden;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 15px;
  position: relative;
  margin-top: 20px;

  padding-left: 15px;
  padding-right: 15px;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.colors.color4};
  font-size: 28px;
  font-weight: 700;
`;

const SubTitle = styled.Text`
  color: ${({ theme }) => theme.colors.color3};
  font-size: 13px;
`;

const Button = styled.Pressable`
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.color4};
  border-radius: 40px;
  position: absolute;
  right: 15px;
  top: -20px;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Content = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.color1 };
  border-radius: 12px;
  height: 80px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 15px;
`;

const PreviewCard: React.FC<PreviewCard> = ({
  imageSource,
  onEdit,
}) => {
  const colors = useTheme().colors as Colors;

  const selectedLettersHiragana = useAppSelector((state: RootState) => state.kana.selectedLettersHiragana);
  const selectedLettersKatakana = useAppSelector((state: RootState) => state.kana.selectedLettersKatakana);

  const preview =
    imageSource === "learning"
      ? learningImage
      : imageSource === "practice"
        ? practiceImage
        : wordgameImage;

  return (
    <Container source={preview} resizeMode="cover">
      <Content>
        <Title>{selectedLettersHiragana + selectedLettersKatakana}</Title>
        <SubTitle>
          {selectedLettersHiragana ? "Hiragana" : " "}
          {selectedLettersHiragana !== 0 && selectedLettersKatakana !== 0
            ? " / "
            : ""}
          {selectedLettersKatakana ? "Katakana" : " "}
        </SubTitle>
        <Button onPress={() => onEdit?.()}>
          <Icon name={"square-edit-outline"} size={24} color={colors.color1} />
        </Button>
      </Content>
    </Container>
  );
};

export default PreviewCard;