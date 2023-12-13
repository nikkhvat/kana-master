import React from "react";

import { StyleSheet } from "react-native";
import { ImageSourcePropType } from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";

import { Colors } from "../../App";

import styled from 'styled-components/native';

type PreviewCard = {
  imageSource: ImageSourcePropType;
  title: string,
  subtitle: string,
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
  title,
  subtitle,
  onEdit,
}) => {
  const colors = useTheme().colors as Colors;

  return (
    <Container source={imageSource} resizeMode="cover" >
      <Content>
        <Title>{title}</Title>
        <SubTitle>{subtitle}</SubTitle>
        <Button onPress={() => onEdit?.()}>
          <Icon
            name={"square-edit-outline"}
            size={24}
            color={colors.color1}
          />
        </Button>
      </Content>
    </Container>
  );
};

export default PreviewCard;