import React from 'react'
import PreviewCard from '@/components/PreviewCard';

import Button from '@/components/Button';

import styled from "styled-components/native"
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/navigationTypes';
import { Animated } from 'react-native';

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
        onEdit={() => navigation.navigate("ChooseAlphabet")}
      />

      <Content>
        <Button title={"Learn"} type={"general"} fontSize={17} />
      </Content>
    </Container>
  );
};

export default Learning;