import React from "react";

import { StackNavigationProp } from "@react-navigation/stack";
import { Animated } from "react-native";
import styled from "styled-components/native";

import Button from "@/components/Button";
import PreviewCard from "@/components/PreviewCard";
import { RootStackParamList } from "@/types/navigationTypes";


type PracticeNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface PracticeProps {
  navigation: PracticeNavigationProp;
}

const Learning: React.FC<PracticeProps> = ({ navigation }) => {
  const Container = styled.View`
    padding-left: 20px;
    padding-right: 20px;
    flex: 1;
  `;

  const Content = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: 15px;
  `;

  const scrollY = new Animated.Value(0);

  return (
    <Container>
      <PreviewCard
        imageSource={"learning"}
        onEdit={() => navigation.navigate("ChooseAlphabet", {
          screen: "Learning"
        })}
      />

      <Content>
        <Button title={"Learn"} type={"general"} fontSize={17} />
      </Content>
    </Container>
  );
};

export default Learning;