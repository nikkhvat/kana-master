import React, { useEffect, useState } from "react";

import { Text } from "react-native";
import styled from "styled-components/native";

import { TEST_DELAY } from "@/constants/kana";

const AnswersContainer = styled.View`
  flex-direction: column;
  gap: 15px;
`;

const AnswersRow = styled.View`
  flex-direction: row;
  gap: 15px;
`;

const AnswersItem = styled.TouchableOpacity<{type: "green" | "red" | "transparent"}>`
  width: 165px;
  height: 165px;

  justify-content: center;
  align-items: center;

  border-width: 1px;
  border-color: ${({ type, theme }) => type === "green" ? "#7ABC71" : type === "red" ? "#EF625D" : theme.colors.color2 };
  background-color: ${({ type, theme }) => type === "green" ? "#7ABC71" : type === "red" ? "#EF625D" : theme.colors.color2 };
  border-radius: 12px;
`;

const AnswersItemText = styled.Text<{type: "green" | "red" | "transparent"}>`
  color: ${({theme, type}) => type === "transparent" ? theme.colors.color4 : theme.colors.color5};
  font-size: 22px;
`;

interface SelectAnswersProp {
  answers: {
    title: string;
    id: number | string;
  }[];
  trueAnswer: string | number;
  onError?: (id: number | string) => void;
  onCompleted?: (isErrors: boolean) => void;
}

const SelectAnswers: React.FC<SelectAnswersProp> = ({ 
  answers, 
  trueAnswer, 
  onError, 
  onCompleted 
}) => {
  
  const [errors, setErrors] = useState([] as (string | number)[]);
  const [corrected, setCorrected] = useState(null as string | number | null);
  
  useEffect(() => {
    setErrors([]);
    setCorrected(null);
  }, [trueAnswer, answers]);
  
  if (answers.length !== 4) return <Text>Answers to be 4</Text>;

  const pick = (id: number | string) => {
    if (corrected !== null) return;

    if (errors.includes(id)) return; 

    if (id !== trueAnswer) {
      setErrors((prev) => [...prev, id]);

      setTimeout(() => {
        onError?.(id);
      }, TEST_DELAY);
      return; 
    }

    setCorrected(id);

    setTimeout(() => {
      onCompleted?.(errors.length === 0);
    }, TEST_DELAY);

  };

  const getStatus = (id: string | number) => {
    if (errors.includes(id)) return "red";
    else if (corrected === id) return "green";
    else return "transparent";
  };

  return (
    <AnswersContainer>
      <AnswersRow>
        <AnswersItem onPress={() => pick(answers[0].id)} type={getStatus(answers[0].id)}>
          <AnswersItemText type={getStatus(answers[0].id)}>{answers[0].title}</AnswersItemText>
        </AnswersItem>
        <AnswersItem onPress={() => pick(answers[1].id)} type={getStatus(answers[1].id)}>
          <AnswersItemText type={getStatus(answers[1].id)}>{answers[1].title}</AnswersItemText>
        </AnswersItem>
      </AnswersRow>

      <AnswersRow>
        <AnswersItem onPress={() => pick(answers[2].id)} type={getStatus(answers[2].id)}>
          <AnswersItemText type={getStatus(answers[2].id)}>{answers[2].title}</AnswersItemText>
        </AnswersItem>
        <AnswersItem onPress={() => pick(answers[3].id)} type={getStatus(answers[3].id)}>
          <AnswersItemText type={getStatus(answers[3].id)}>{answers[3].title}</AnswersItemText>
        </AnswersItem>
      </AnswersRow>
    </AnswersContainer>
  );
};


export default SelectAnswers;