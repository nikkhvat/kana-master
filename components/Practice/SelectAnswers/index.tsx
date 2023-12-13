import React from "react";
import { Text } from "react-native";

import styled from "styled-components/native";

const AnswersContainer = styled.View`
  flex-direction: column;
  gap: 15px;
`

const AnswersRow = styled.View`
  flex-direction: row;
  gap: 15px;
`

const AnswersItem = styled.TouchableOpacity<{type: "green" | "red" | "transparent"}>`
  width: 165px;
  height: 165px;

  justify-content: center;
  align-items: center;

  border-width: 1px;
  border-color: ${({ type, theme }) => type === "green" ? "#7ABC71" : type === "red" ? "#F4817D" : theme.colors.color2 };
  background-color: ${({ type, theme }) => type === "green" ? "#7ABC71" : type === "red" ? "#F4817D" : theme.colors.color2 };
  border-radius: 12px;
`

const AnswersItemText = styled.Text<{type: "green" | "red" | "transparent"}>`
  color: ${({theme, type}) => type === "transparent" ? theme.colors.color4 : theme.colors.color1};
  font-size: 22px;
`

interface SelectAnswersProp {
  answers: {
    title: string;
    type: "green" | "red" | "transparent";
  }[];
}

const SelectAnswers: React.FC<SelectAnswersProp> = ({ answers }) => {

  if (answers.length !== 4) return <Text>Answers to be 4</Text>

  return (
    <AnswersContainer>
      <AnswersRow>
        <AnswersItem type={answers[0].type}>
          <AnswersItemText type="green">{answers[0].title}</AnswersItemText>
        </AnswersItem>
        <AnswersItem type={answers[1].type}>
          <AnswersItemText type="transparent">{answers[1].title}</AnswersItemText>
        </AnswersItem>
      </AnswersRow>

      <AnswersRow>
        <AnswersItem type={answers[2].type}>
          <AnswersItemText type="red">{answers[2].title}</AnswersItemText>
        </AnswersItem>
        <AnswersItem type={answers[3].type}>
          <AnswersItemText type="transparent">{answers[3].title}</AnswersItemText>
        </AnswersItem>
      </AnswersRow>
    </AnswersContainer>
  );
};


export default SelectAnswers;