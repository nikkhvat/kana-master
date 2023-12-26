import React from "react";

import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const Question = styled.Text`
  color: ${({ theme }) => theme.colors.color4};
  font-size: 17px;
  font-weight: 600;
  margin-top: 35px;
  margin-bottom: 30px;
  width: 100%;
  text-align: center;
`;

const Columns = styled.View`
  height: 50px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 15px;

  width: 100%;
`;

interface ItemProp {
  isCorrect: boolean;
  isSelect: boolean;
  isError: boolean;
}

const Item = styled.TouchableOpacity<ItemProp>`
  /* flex: 1; */
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${({ theme, isCorrect, isSelect, isError }) =>
    isCorrect
      ? theme.colors.second_color2 
      : isError ? theme.colors.second_color1
      : isSelect ? theme.colors.second_color2 : theme.colors.color3};
  background-color: ${({ theme, isCorrect, isSelect, isError }) =>
    isCorrect ? theme.colors.second_color2
      : isError ? theme.colors.second_color1
      : isSelect ? "transparent" : "transparent"};
  /* padding: 14px; */
  height: 50px;
`;

const Text = styled.Text`
  color: ${({ theme }) => theme.colors.color4};
  font-size: 17px;
  font-weight: 400;
`;

interface ChooseValueProps {
  title: string
  questions: {text: string, key: string}[]
}

const ChooseValue: React.FC<ChooseValueProps> = ({ title, questions = [] }) => {
  return (
    <Container>
      <Question>{title}</Question>

      <Columns>
        {questions.map((question) => (
          <Item
            key={question.key}
            isCorrect={false}
            isSelect={false}
            isError={false}
          >
            <Text>{question.text}</Text>
          </Item>
        ))}
      </Columns>
    </Container>
  );
};

export default ChooseValue;