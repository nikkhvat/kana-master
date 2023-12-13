import React from "react";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types";

import { StackNavigationProp } from "@react-navigation/stack";
import styled from 'styled-components/native';
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ProgressBar from "../../components/Practice/ProgressBar";
import SelectAnswers from "../../components/Practice/SelectAnswers";
import ShowSymbol from "../../components/Practice/ShowSymbol";

import FindPair from "../../components/Practice/FindPair";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Practice">;
type LearnScreenRouteProp = RouteProp<RootStackParamList, "Practice">;

interface LearnScreenProps {
  route: LearnScreenRouteProp
  navigation: HomeScreenNavigationProp
}

const Container = styled.View<{paddingTop: number }>`
  flex: 1;

  padding: 20px;
  padding-top: ${({ paddingTop }) => (paddingTop + 20) + "px"};
  background-color: ${({ theme }) => theme.colors.color1};
  justify-content: space-between;
  align-items: center;

  width: 100%;
`


function PracticeScreen({ route, navigation }: LearnScreenProps) {
  const { 
    keysCardModeState, 
    keysModeState, 
    keysDifficultyLevelState, 
    mode } = route.params;

  const insets = useSafeAreaInsets();

  return (
    <Container paddingTop={insets.top}>
      <ProgressBar close={() => navigation.goBack()} current={5} all={22} />

      {/* Find the pair */}
      {/* <FindPair
        pairs={[
          [{ title: "か", id: "か" },{ title: "う (2)", id: "2う" },],
          [{ title: "う", id: "う" },{ title: "か (2)", id: "2か" },],
          [{ title: "け", id: "け" },{ title: "け (2)", id: "2け" },],
          [{ title: "こ", id: "こ" },{ title: "こ (2)", id: "2こ" },],
        ]}
        answers={[
          ["か", "2か"],
          ["う", "2う"],
          ["け", "2け"],
          ["こ", "2こ"],
        ]}
        title={"Сопоставь хирагану с романдзи."}
      /> */}

      {/* Select item */}
      {/* <ShowSymbol symbol={"KA"} subtext={"Hiragana"} />

      <SelectAnswers
        answers={[
          { title: "か", type: "green" },
          { title: "う", type: "transparent" },
          { title: "け", type: "red" },
          { title: "こ", type: "red" },
        ]}
      /> */}
    </Container>
  );
}

export default PracticeScreen;