/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

import styled from "styled-components/native";

interface EducationPracticeFindPairProps {
  pairs: {
    title: string
    id: number | string
  }[][]
  answers: (string | number)[][]
  onCompleted?: (hasError: boolean) => void
  onError?: () => void
  title: string
}

type Item = {
  title: string;
  id: number | string;
  index: number
};

const EducationPracticeFindPair: React.FC<EducationPracticeFindPairProps> = ({
  pairs,
  answers,
  onCompleted,
  onError,
  title,
}) => {
  const [hasError, setHasError] = useState(false);

  const [selectedPair, setSelectedPair] = useState(null as null | Item);
  const [matchedPairs, setMatchedPairs] = useState([] as any[]);

  const [errorsPairs, setErrorsPairs] = useState([] as any[]);

  const isCorrectPair = (pair1: Item, pair2: Item) => {
    return answers.some(
      (answer) => answer.includes(pair1.id) && answer.includes(pair2.id)
    );
  };

  const isMatched = (id: string | number) => {
    return matchedPairs.some((pair) => pair.includes(id));
  };

  const isAlreadyMatched = (pair: Item) => {
    return matchedPairs.includes(pair.id);
  };

  const pick = (pair: Item) => {
    if (pair.index === selectedPair?.index) {
      setSelectedPair(pair);
      return;
    }

    if (isAlreadyMatched(pair)) {
      return;
    }

    if (selectedPair && selectedPair.id !== pair.id) {
      if (isCorrectPair(selectedPair, pair)) {
        setMatchedPairs([...matchedPairs, selectedPair.id, pair.id]);
      } else {
        if (!hasError) setHasError(true);
        setErrorsPairs([selectedPair!.id, pair.id]);
        onError?.();
        setTimeout(() => {
          setErrorsPairs(() => []);
        }, 500);
      }
      setSelectedPair(null);
    } else {
      setSelectedPair(pair);
    }
  };

  useEffect(() => {
    if (matchedPairs.length === pairs.length * 2) {
      onCompleted?.(hasError);
    }
  }, [matchedPairs]);

  return (
    <Container>
      <Question>{title}</Question>
      <Pairs>
        {pairs.map((pair) => (
          <Row key={pair[0].id}>
            <Item
              isError={errorsPairs.includes(pair[0].id)}
              isSelect={pair[0].id === selectedPair?.id}
              isCorrect={isMatched(pair[0].id)}
              onPress={() => pick({ ...pair[0], index: 0 })}
            >
              <Text>{pair[0].title}</Text>
            </Item>
            <Item
              isError={errorsPairs.includes(pair[1].id)}
              isSelect={pair[1].id === selectedPair?.id}
              isCorrect={isMatched(pair[1].id)}
              onPress={() => pick({ ...pair[1], index: 1 })}
            >
              <Text>{pair[1].title}</Text>
            </Item>
          </Row>
        ))}
      </Pairs>
    </Container>
  );
};

export default EducationPracticeFindPair;

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

const Pairs = styled.View`
  flex-direction: column;
  gap: 15px;
`;

const Row = styled.View`
  height: 50px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 15px;

  width: 100%;
`;

interface ItemProp {
  isCorrect: boolean
  isSelect: boolean
  isError: boolean
}

const Item = styled.TouchableOpacity<ItemProp>`
  flex: 1;
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
  font-size: 22px;
`;