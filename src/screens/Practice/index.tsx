import React, { useEffect, useState } from "react";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as Haptics from "expo-haptics";
import { useKeepAwake } from "expo-keep-awake";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";

import useStats from "./hooks/useStats";

import FindPair from "@/components/Practice/FindPair";
import ProgressBar from "@/components/Practice/ProgressBar";
import SelectAnswers from "@/components/Practice/SelectAnswers";
import ShowSymbol from "@/components/Practice/ShowSymbol";
import Timer from "@/components/Practice/Timer";
import { CardMode, DifficultyLevelType, Kana, PracticeScreenMode } from "@/constants/kana";
import letters, { ILetter } from "@/data/letters";
import { generateRandomLetters, shuffleArray } from "@/helpers/letters";
import { RootStackParamList } from "@/types/navigationTypes";



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
`;

const Header = styled.View`
  width: 100%;
  flex-direction: column;
  gap: 22px;
`;


function PracticeScreen({ route, navigation }: LearnScreenProps) {
  useKeepAwake();

  const { 
    keysCardModeState, 
    keysModeState, 
    keysDifficultyLevelState, 
    mode } = route.params;

  const IS_TIMER = keysDifficultyLevelState.includes(DifficultyLevelType.TimeTest);
  const ONE_ATTEMPT = keysDifficultyLevelState.includes(DifficultyLevelType.OneAttempt);
  

  const stats = useStats({
    cardModeState: keysCardModeState,
  });

  const insets = useSafeAreaInsets();

  type Question = {
    symbol: string;
    kana: Kana;
    answers: {
      title: string;
      id: number;
    }[];
    trueAnswer: number;
  };

  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setQuestionIndex] = useState(0);

  const getAnswers = (l: ILetter[][], letter: ILetter, kana?: Kana) => {
    return shuffleArray(
      [
        letter,
        ...generateRandomLetters(l, {
          limit: 3,
          excludeLetter: letter,
        }),
      ].map(({ ka, hi, en, id }) => ({
        title: kana === Kana.Hiragana ? hi : kana === Kana.Katakana ? ka : en,
        id: id,
      }))
    );
  };
  

  useEffect(() => {
    const l = [letters[0], letters[1], letters[2], letters[3], letters[4]];

    if (mode == PracticeScreenMode.Testing) {
      stats.startTimer();


      const questions = [];

      for (let i = 0; i < l.length; i++) {
        const row = l[i];
        
        for (let j = 0; j < row.length; j++) {
          const cell = row[j];
          
          const type =
            keysCardModeState[Math.floor(Math.random() * keysCardModeState.length)];

          switch (type) {
            case CardMode.hiraganaToKatakana: {
              questions.push({ symbol: cell.hi, kana: Kana.Hiragana, answers: getAnswers(l, cell, Kana.Katakana), trueAnswer: cell.id });
              continue;
            }
            case CardMode.hiraganaToRomaji: {
              questions.push({symbol: cell.hi, kana: Kana.Hiragana, answers: getAnswers(l, cell, Kana.English), trueAnswer: cell.id });
              continue;
            }
            case CardMode.katakanaToHiragana: {
              questions.push({symbol: cell.ka, kana: Kana.Katakana, answers: getAnswers(l, cell, Kana.Hiragana), trueAnswer: cell.id });
              continue;
            }
            case CardMode.katakanaToRomaji: {
              questions.push({symbol: cell.ka, kana: Kana.Katakana, answers: getAnswers(l, cell, Kana.English), trueAnswer: cell.id });
              continue;
            }
            case CardMode.romajiToHiragana: {
              questions.push({symbol: cell.en, kana: Kana.English, answers: getAnswers(l, cell, Kana.Hiragana), trueAnswer: cell.id });
              continue;
            }
            case CardMode.romajiToKatakana: {
              questions.push({symbol: cell.en, kana: Kana.English, answers: getAnswers(l, cell, Kana.Katakana), trueAnswer: cell.id });
              continue;
            }
          }
        }
      }
    
      setQuestions(shuffleArray(questions));
    }
  }, []);
  
  const onFinish = (trueSelected: boolean) => {
    const responseTime = 5;
    stats.recordAnswer(trueSelected, responseTime, questions[index].symbol);

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    if (index === questions.length - 1) {
      const finalStats = stats.getStats();
      navigation.navigate("Results", { stats: finalStats });
    } else {
      setQuestionIndex((prev) => prev + 1);
    }
  };

  return (
    <Container paddingTop={insets.top}>
      <Header>
        <ProgressBar
          close={() => navigation.goBack()}
          current={index}
          all={questions.length}
        />
        {IS_TIMER && mode === PracticeScreenMode.Testing && <Timer />}
      </Header>

      {mode == PracticeScreenMode.WordGame && <FindPair
        pairs={[
          [{ title: "か", id: "か" },{ title: "う (2)", id: "2う" }],
          [{ title: "う", id: "う" },{ title: "か (2)", id: "2か" }],
          [{ title: "け", id: "け" },{ title: "け (2)", id: "2け" }],
          [{ title: "こ", id: "こ" },{ title: "こ (2)", id: "2こ" }],
        ]}
        answers={[
          ["か", "2か"],
          ["う", "2う"],
          ["け", "2け"],
          ["こ", "2こ"],
        ]}
        title={"Сопоставь хирагану с романдзи."}
      />}

      {questions.length > 0 && mode == PracticeScreenMode.Testing && (
        <>
          <ShowSymbol
            symbol={questions[index].symbol}
            subtext={questions[index].kana}
          />
          <SelectAnswers
            answers={questions[index].answers}
            onCompleted={onFinish}
            trueAnswer={questions[index].trueAnswer}
          />
        </>
      )}
    </Container>
  );
}

export default PracticeScreen;