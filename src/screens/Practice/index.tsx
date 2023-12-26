import React, { useEffect, useState } from "react";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as Haptics from "expo-haptics";
import { useKeepAwake } from "expo-keep-awake";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";

import useStats from "./hooks/useStats";

import ChooseLetters from "@/components/Practice/ChooseLetters";
import ChooseValue from "@/components/Practice/ChooseValue";
import FindPair from "@/components/Practice/FindPair";
import ProgressBar from "@/components/Practice/ProgressBar";
import SelectAnswers from "@/components/Practice/SelectAnswers";
import ShowSymbol from "@/components/Practice/ShowSymbol";
import Timer from "@/components/Practice/Timer";
import { CardMode, DifficultyLevelType, Kana, PracticeScreenMode } from "@/constants/kana";
import { ILetter, lettersTable } from "@/data/lettersTable";
import { generateRandomLetters, shuffleArray } from "@/helpers/letters";
import { useAppSelector } from "@/hooks/redux";
import { RootState } from "@/store/store";
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
      id: string;
    }[];
    trueAnswer: string;
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

  const selectedLetters = useAppSelector((state: RootState) => state.kana.selected);

  const kanaLetters = [
    ...selectedLetters.base.katakana,
    ...selectedLetters.dakuon.katakana,
    ...selectedLetters.handakuon.katakana,
    ...selectedLetters.yoon.katakana,
  ].map(item => lettersTable[item]);

  const hiraLetters = [
    ...selectedLetters.base.hiragana,
    ...selectedLetters.dakuon.hiragana,
    ...selectedLetters.handakuon.hiragana,
    ...selectedLetters.yoon.hiragana,
  ].map(item => lettersTable[item]);

  useEffect(() => {
    
    if (mode == PracticeScreenMode.Testing) {
      const questions: Question[] = [];

      {
        // Generate questions for Kana
        const typesQuestions = [];
        
        if (keysCardModeState.includes(CardMode.romajiToKatakana)) typesQuestions.push(CardMode.romajiToKatakana);
        if (keysCardModeState.includes(CardMode.katakanaToRomaji)) typesQuestions.push(CardMode.katakanaToRomaji);
        if (keysCardModeState.includes(CardMode.katakanaToHiragana)) typesQuestions.push(CardMode.katakanaToHiragana);
        
        for (let i = 0; i < kanaLetters.length; i++) {
          const letter = kanaLetters[i];

          const type = typesQuestions[Math.floor(Math.random() * typesQuestions.length)];

          switch (type) {
              case CardMode.katakanaToHiragana: {
                questions.push({symbol: letter.ka, kana: Kana.Katakana, answers: getAnswers([kanaLetters], letter, Kana.Hiragana), trueAnswer: letter.id });
                continue;
              }
              case CardMode.katakanaToRomaji: {
                questions.push({symbol: letter.ka, kana: Kana.Katakana, answers: getAnswers([kanaLetters], letter, Kana.English), trueAnswer: letter.id });
                continue;
              }
              case CardMode.romajiToKatakana: {
                questions.push({symbol: letter.en, kana: Kana.English, answers: getAnswers([kanaLetters], letter, Kana.Katakana), trueAnswer: letter.id });
                continue;
              }
            }
        }
      }

      {
        // Generation for Hira 
        const typesQuestions = [];
        
        if (keysCardModeState.includes(CardMode.hiraganaToKatakana)) typesQuestions.push(CardMode.hiraganaToKatakana);
        if (keysCardModeState.includes(CardMode.hiraganaToRomaji)) typesQuestions.push(CardMode.hiraganaToRomaji);
        if (keysCardModeState.includes(CardMode.romajiToHiragana)) typesQuestions.push(CardMode.romajiToHiragana);
        
        for (let i = 0; i < hiraLetters.length; i++) {
          const letter = hiraLetters[i];

          const type = typesQuestions[Math.floor(Math.random() * typesQuestions.length)];

          switch (type) {
            case CardMode.hiraganaToKatakana: {
              questions.push({ symbol: letter.hi, kana: Kana.Hiragana, answers: getAnswers([hiraLetters], letter, Kana.Katakana), trueAnswer: letter.id });
              continue;
            }
            case CardMode.hiraganaToRomaji: {
              questions.push({symbol: letter.hi, kana: Kana.Hiragana, answers: getAnswers([hiraLetters], letter, Kana.English), trueAnswer: letter.id });
              continue;
            }
            case CardMode.romajiToHiragana: {
              questions.push({symbol: letter.en, kana: Kana.English, answers: getAnswers([hiraLetters], letter, Kana.Hiragana), trueAnswer: letter.id });
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

      {/* Find the pair mode */}
      {/* {mode == PracticeScreenMode.WordGame && <FindPair
        pairs={[
          [{ title: "か", id: "か" },{ title: "う", id: "2う" }],
          [{ title: "う", id: "う" },{ title: "か", id: "2か" }],
          [{ title: "け", id: "け" },{ title: "け", id: "2け" }],
          [{ title: "こ", id: "こ" },{ title: "こ", id: "2こ" }],
        ]}
        answers={[
          ["か", "2か"],
          ["う", "2う"],
          ["け", "2け"],
          ["こ", "2こ"],
        ]}
        title={"Сопоставь хирагану с романдзи."}
      />} */}

      {/* Choose value practice */}
      {/* <ChooseValue
        title={"Выбери романдзи для きく"}
        questions={[
          { text: "KIKU", key: "KIKU" },
          { text: "KUKI", key: "KUKI" },
          { text: "KIKE", key: "KIKE" }
        ]}
      /> */}

      {/* Choose letters words */}
      {mode == PracticeScreenMode.WordGame && <ChooseLetters
        title={"Выбери хирагану для"}
        romanji={"ningen"}
        translate={"human"}
        kana={"にんげん"}
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