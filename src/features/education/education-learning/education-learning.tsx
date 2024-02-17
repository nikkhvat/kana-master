import React from "react";

import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { Dimensions } from "react-native";
import styled from "styled-components/native";

import Button from "@/shared/ui/button/button";
import { RootStackParamList } from "@/shared/types/navigationTypes";
import KanaSelectedCard from "@/widgets/education/education-selected-card/education-kana-selected-card";



type PracticeNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface PracticeProps {
  navigation: PracticeNavigationProp;
}

const screenWidth = Dimensions.get("window").width;

const Container = styled.View<{width: number}>`
  padding-left: 20px;
  padding-right: 20px;
  flex: 1;
  width: ${({ width }) => `${width}px`};
`;

const Content = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 15px;
`;

const EducationLearning: React.FC<PracticeProps> = ({ navigation }) => {

  const { t } = useTranslation();

  return (
    <Container width={screenWidth} >
      <KanaSelectedCard
        imageSource={"learning"}
        onEdit={() =>
          navigation.navigate("ChooseAlphabet", {
            screen: "Learning",
          })
        }
      />

      <Content>
        <Button title={t("practice.start")} type={"general"} fontSize={17} />
      </Content>
    </Container>
  );
};

export default EducationLearning;