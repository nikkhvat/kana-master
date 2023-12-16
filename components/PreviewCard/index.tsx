import React from "react";

import { ImageSourcePropType } from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";

import styled from 'styled-components/native';
import { Colors } from "../../layout";
import { useAppSelector } from "../../shared/store/hooks";
import { RootState } from "../../shared/store/store";

type PreviewCard = {
  imageSource: ImageSourcePropType;
  onEdit?: Function
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
`

const Title = styled.Text`
  color: ${({ theme }: any) => theme.colors.color4};
  font-size: 28px;
  font-weight: 700;
`

const SubTitle = styled.Text`
  color: ${({ theme }: any) => theme.colors.color3};
  font-size: 13px;
`

const Button = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  background-color: ${({theme}: any) => theme.colors.color4};
  border-radius: 40px;
  position: absolute;
  right: 15px;
  top: -20px;
  flex: 1;
  justify-content: center;
  align-items: center;
`

const Content = styled.View`
  width: 315px;
  background-color: ${({ theme }) => theme.colors.color1 };
  border-radius: 12px;
  height: 79px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 15px;
`

const PreviewCard: React.FC<PreviewCard> = ({
  imageSource,
  onEdit,
}) => {
  const colors = useTheme().colors as Colors;

  const selectedLettersHiragana = useAppSelector((state: RootState) => state.kana.selectedLettersHiragana)
  const selectedLettersKatakana = useAppSelector((state: RootState) => state.kana.selectedLettersKatakana)

  return (
    <Container source={imageSource} resizeMode="cover">
      <Content>
        <Title>{selectedLettersHiragana + selectedLettersKatakana}</Title>
        <SubTitle>
          {selectedLettersHiragana ? "Hiragana" : " "}
          {selectedLettersHiragana !== 0 && selectedLettersKatakana !== 0 ? " / " : ""}
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