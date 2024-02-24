import React, { useEffect, useMemo, useState } from "react";

import styled from "styled-components/native";

interface ChooseLettersProps {
  title: string;

  romanji: string;
  shuffle: string[];
  translate: string;

  kana: string;

  onFinish?: (hasError: boolean) => void;
}

const DELAY = 500;

const EducationPracticeChooseLetters: React.FC<ChooseLettersProps> = ({
  title,
  romanji,
  translate,
  kana,
  shuffle,
  onFinish
}) => {
  const letters = useMemo(() => kana.split(""), [kana]);

  const [questionTitle, setTitle] = useState(`${title} ${romanji} (${translate})`);

  const [shuffleLetters, setShuffleLetters] = useState(shuffle);

  useEffect(() => {
    setTimeout(() => {
      setShuffleLetters(shuffle);
      setTitle(`${title} ${romanji} (${translate})`);
    }, DELAY);
  }, [title, shuffle, romanji, translate]);

  const emptyLetters = useMemo(() => letters.map(() => null), [letters]);

  const [selectedLetters, setSelectedLetters] = useState(
    emptyLetters as (null | { letter: string; index: number })[]
  );

  const [trueAnswers, setTrueAnswers] = useState(
    emptyLetters as (null | true | false)[]
  );

  const onClickLetter = (data: { index: number; letter: string }) => {
    let isFirstElem = false;

    setSelectedLetters((prev) =>
      prev.map((item) => {
        if (item === null && !isFirstElem) {
          isFirstElem = true;
          return data;
        }
        return item;
      })
    );
  };

  const isSelected = (data: { index: number; letter: string }) =>
    selectedLetters.some(
      (element) =>
        element?.index === data.index && element.letter === data.letter
    );

  const reset = () => {
    setSelectedLetters(emptyLetters);
    setTrueAnswers(emptyLetters);
  };

  useEffect(() => {
    if (selectedLetters.every((letter) => letter !== null)) {
      const answers = letters.map(
        (letter, index) => letter === selectedLetters[index]?.letter
      );

      setTrueAnswers(answers);

      const hasError = answers.some((answer) => !answer);

      onFinish?.(hasError);

      setTimeout(reset, DELAY);
    }
  }, [selectedLetters]);

  useEffect(() => {
    setTimeout(reset, DELAY);
  }, [kana]);

  return (
    <Container>
      <Question>{questionTitle}</Question>

      <Content>
        <WordContainer onPress={reset}>
          {selectedLetters.map((letter, i) => (
            <LetterContainer
              correct={trueAnswers[i]}
              isCurrent={letter === null && selectedLetters[i - 1] !== null}
              key={`selected-letter${i}-${letter?.letter}`}
            >
              {letter !== null && <Letter>{letter?.letter}</Letter>}
            </LetterContainer>
          ))}
        </WordContainer>

        <ChooseLettersContainer>
          {shuffleLetters.map((letter, index) => {
            const data = { index: index, letter: letter };
            const selected = isSelected(data);

            return (
              <ChooseLettersBox
                selected={selected}
                onPress={() => !selected && onClickLetter(data)}
                key={`letter-list-${letter}-${index}`}
              >
                <ChooseLettersText selected={selected}>
                  {letter}
                </ChooseLettersText>
              </ChooseLettersBox>
            );
          })}
        </ChooseLettersContainer>
      </Content>
    </Container>
  );
};

export default EducationPracticeChooseLetters;

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

const Content = styled.View`
  width: 100%;
  flex-direction: row;
  flex-direction: column;
  justify-content: center;
`;

const WordContainer = styled.Pressable`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

type LetterContainerProps = {
  isCurrent: boolean
  correct: true | false | null
};

const LetterContainer = styled.View<LetterContainerProps>`
  width: 22px;
  height: 26px;
  border-color: ${({ theme, isCurrent, correct }) =>
    isCurrent
      ? theme.colors.second_color3
      : correct === null
        ? theme.colors.color3
        : correct
          ? theme.colors.second_color2
          : theme.colors.second_color1};
  border-bottom-width: 2px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Letter = styled.Text`
  font-size: 22px;
  color: ${({ theme }) => theme.colors.color4};  
`;

const ChooseLettersContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 9px;
  margin-top: 30px;
`;

type ChooseLettersBox = {
  selected: boolean;
};

const ChooseLettersBox = styled.TouchableOpacity<ChooseLettersBox>`
  border-radius: 12px;
  border-width: 1px;
  border-color: ${({ theme, selected }) =>
    !selected ? theme.colors.color2 : "transparent"};
  padding: 10px;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 50px;
  height: 50px;
`;

const ChooseLettersText = styled.Text<ChooseLettersBox>`
  font-size: 22px;
  color: ${({ theme, selected }) => !selected ? theme.colors.color4 : "transparent"};
`;