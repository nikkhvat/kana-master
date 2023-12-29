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
import { CardMode, DifficultyLevelType, Kana, PracticeScreenMode, TestMode } from "@/constants/kana";
import { ILetter, lettersTable } from "@/data/lettersTable";
import { Word } from "@/data/words";
import { generateRandomLetters, shuffleArray } from "@/helpers/letters";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { countAvailableWords } from "@/store/features/kana/slice";
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

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(countAvailableWords());
  }, []);

  const { 
    keysCardModeState, //  keysCardModeState ["hiragana_to_romaji", "romaji_to_hiragana"]
    keysModeState, // keysModeState ["choice", "word_building", "find_pair"]
    keysDifficultyLevelState, 
    mode } = route.params;

  const IS_TIMER = keysDifficultyLevelState.includes(DifficultyLevelType.TimeTest);
  const ONE_ATTEMPT = keysDifficultyLevelState.includes(DifficultyLevelType.OneAttempt);
  

  const stats = useStats({
    cardModeState: keysCardModeState,
  });

  const insets = useSafeAreaInsets();

  type Question = {
    type: "choose-letter"
    symbol: string;
    kana: Kana;
    answers: { title: string; id: string; }[];
    trueAnswer: string;
  };

  type QuestionChoice = {
    type: "choose-word";

    title: string;
    questions: { text: string; key: string }[];
    trueKey: string;
  };

  type QuestionWordBuilding = {
    type: "building-word";

    title: string;
    romanji: string;
    translate: string;
    kana: string;
    shuffle: string[];
  };

  type QuestionFindPair = {
    type: "find-pair-word";

    title: string
    pairs: { title: string; id: string; }[][]
    answers: string[][]
  };

  const [questions, setQuestions] = useState<
    (Question | QuestionChoice | QuestionWordBuilding | QuestionFindPair)[]
  >([]);
  const [index, setQuestionIndex] = useState(0);

  const getRandomWords = (
    excludedWords: string[],
    allWords: Word[]
  ): Word => {
    // const availableWords = excludedWords.indexOf(allWords);
    const availableWords = allWords.filter(
      (word) => !excludedWords.includes(word.romanji)
    );

    if (availableWords.length === 0) {
      return {
        kana: "null",
        kanji: "null",
        romanji: "null",
        translate: "null",
      };
    }

    const randomIndex = Math.floor(Math.random() * availableWords.length);
    return availableWords[randomIndex];
  };

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

  const selectedWords = useAppSelector((state: RootState) => state.kana.selectedWords);

  const kanaWords: Word[] = selectedWords.katakana;
  const hiraWords: Word[] = selectedWords.hiragana;
  // type QuestionChoice = {
  //   type: "choose-word";

  //   title: string;
  //   questions: { text: string; key: string }[];
  // };

  // type QuestionWordBuilding = {
  //   type: "building-word";

  //   title: string;
  //   romanji: string;
  //   translate: string;
  //   kana: string;
  // };

  // type QuestionFindPair = {
  //   type: "find-pair-word";

  //   title: string;
  //   pairs: { title: string; id: string }[][];
  //   answers: string[][];
  // };

  const generateWordQuestion = (
    word: Word,
    questionTypes: TestMode[],
    kana: "katakana" | "hirigana",
    mode: "romanji" | "kana"
  ): QuestionChoice | QuestionWordBuilding | QuestionFindPair => {
    const type =
      questionTypes[Math.floor(Math.random() * questionTypes.length)];

    switch (type) {
      case TestMode.Choice: {
        const word1 = getRandomWords([word.romanji], kana === "hirigana" ? hiraWords : kanaWords);
        const word2 = getRandomWords([word.romanji, word1.romanji], kana === "hirigana" ? hiraWords : kanaWords);
        const word3 = getRandomWords([word.romanji, word1.romanji, word2.romanji], kana === "hirigana" ? hiraWords : kanaWords);

        return {
          type: "choose-word",
          title: `Выбери раманджи для ${word.kana}`,
          questions: shuffleArray([
            { text: word.romanji, key: word.romanji },
            { text: word1.romanji, key: word1.romanji },
            { text: word2.romanji, key: word2.romanji },
            { text: word3.romanji, key: word3.romanji },
          ]),
          trueKey: word.romanji,
        };
      }
      case TestMode.WordBuilding: {
        return {
          type: "building-word",
          title: `Выбери ${mode === "romanji" ? "романджи" : kana === "hirigana" ? "хиригану" : "катакану"}`,
          romanji: mode === "romanji" ? word.kana : word.romanji,
          shuffle: shuffleArray(
            (mode === "romanji" ? word.romanji : word.kana).split("")
          ),
          translate: word.translate,
          kana: mode === "romanji" ? word.romanji : word.kana,
        };
      }
      case TestMode.FindPair: {
        const word1 = getRandomWords([word.romanji], kana === "hirigana" ? hiraWords : kanaWords);
        const word2 = getRandomWords([word.romanji, word1.romanji], kana === "hirigana" ? hiraWords : kanaWords);
        const word3 = getRandomWords([word.romanji, word1.romanji, word2.romanji], kana === "hirigana" ? hiraWords : kanaWords);

        const kanaElements = [word?.kana, word1?.kana, word2?.kana, word3?.kana];
        const romanjiElements = [word?.romanji, word1?.romanji, word2?.romanji, word3?.romanji];

        kanaElements.sort(() => Math.random() - 0.5);
        romanjiElements.sort(() => Math.random() - 0.5);

        const shuffledPairs = kanaElements.map((kana, index) => {
          return [{ title: kana, id: kana }, { title: romanjiElements[index], id: romanjiElements[index] }];
        });

        return {
          type: "find-pair-word",
          title: `Сопоставь ${
            kana === "hirigana" ? "хиригану" : "катакану"
          } с романдзи.`,
          pairs: shuffledPairs,
          answers: [
            [word?.kana, word?.romanji],
            [word1?.kana, word1?.romanji],
            [word2?.kana, word2?.romanji],
            [word3?.kana, word3?.romanji],
          ],
        };
      }
    }
  };

  

  useEffect(() => {
    if (mode == PracticeScreenMode.WordGame) {
      const questions: (
        | Question
        | QuestionChoice
        | QuestionWordBuilding
        | QuestionFindPair
      )[] = [];

      
      const wordsCount: number = kanaWords.length + hiraWords.length;

      const questionsCount: number = wordsCount > 20 ? 20 : wordsCount;

      // Generate questions for Kana
      const questionTypes: CardMode[] = [];
      
      if (keysCardModeState.includes(CardMode.hiraganaToRomaji)) questionTypes.push(CardMode.hiraganaToRomaji);
      if (keysCardModeState.includes(CardMode.romajiToHiragana)) questionTypes.push(CardMode.romajiToHiragana);
      if (keysCardModeState.includes(CardMode.katakanaToRomaji)) questionTypes.push(CardMode.katakanaToRomaji);
      if (keysCardModeState.includes(CardMode.romajiToKatakana)) questionTypes.push(CardMode.romajiToKatakana);

      const cardTypes: TestMode[] = [];

      if (keysModeState.includes(TestMode.Choice)) cardTypes.push(TestMode.Choice);
      if (keysModeState.includes(TestMode.WordBuilding)) cardTypes.push(TestMode.WordBuilding);
      if (keysModeState.includes(TestMode.FindPair)) cardTypes.push(TestMode.FindPair);

      const addedQuestionKana: string[] = [];
      const addedQuestionHira: string[] = [];

      for (let i = 0; i < questionsCount; i++) {
        const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];

        switch (type) {
          case CardMode.hiraganaToRomaji: {
            const word = getRandomWords(addedQuestionHira, hiraWords);

            if (word !== null) {
               addedQuestionHira.push(word?.romanji);
               questions.push(generateWordQuestion(word, cardTypes, "hirigana", "kana"));
            }
            continue;
          }
          case CardMode.romajiToHiragana: {
            const word = getRandomWords(addedQuestionHira, hiraWords);

            if (word !== null) {
               addedQuestionHira.push(word?.romanji);
               questions.push(
                 generateWordQuestion(word, cardTypes, "hirigana", "romanji")
               );
            }
            continue;
          }
          case CardMode.katakanaToRomaji: {
            const word = getRandomWords(addedQuestionKana, kanaWords);
            if (word !== null) {
               addedQuestionKana.push(word?.romanji);
               questions.push(generateWordQuestion(word, cardTypes, "katakana", "kana"));
            }

            continue;
          }
          case CardMode.romajiToKatakana: {
            const word = getRandomWords(addedQuestionKana, kanaWords);
            if (word !== null) {
               addedQuestionKana.push(word?.romanji);
               questions.push(generateWordQuestion(word, cardTypes, "katakana", "romanji"));
            }
            continue;
          }
        }
      }

      setQuestions(shuffleArray(questions));
    }

    if (mode == PracticeScreenMode.Testing) {
      const questions: Question[] = [];

      {
        // Generate questions for Kana
        const questionTypes = [];
        
        if (keysCardModeState.includes(CardMode.romajiToKatakana)) questionTypes.push(CardMode.romajiToKatakana);
        if (keysCardModeState.includes(CardMode.katakanaToRomaji)) questionTypes.push(CardMode.katakanaToRomaji);
        if (keysCardModeState.includes(CardMode.katakanaToHiragana)) questionTypes.push(CardMode.katakanaToHiragana);
        
        for (let i = 0; i < kanaLetters.length; i++) {
          const letter = kanaLetters[i];

          const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];

          switch (type) {
              case CardMode.katakanaToHiragana: {
                questions.push({type: "choose-letter", symbol: letter.ka, kana: Kana.Katakana, answers: getAnswers([kanaLetters], letter, Kana.Hiragana), trueAnswer: letter.id });
                continue;
              }
              case CardMode.katakanaToRomaji: {
                questions.push({type: "choose-letter", symbol: letter.ka, kana: Kana.Katakana, answers: getAnswers([kanaLetters], letter, Kana.English), trueAnswer: letter.id });
                continue;
              }
              case CardMode.romajiToKatakana: {
                questions.push({type: "choose-letter", symbol: letter.en, kana: Kana.English, answers: getAnswers([kanaLetters], letter, Kana.Katakana), trueAnswer: letter.id });
                continue;
              }
            }
        }
      }

      {
        // Generation for Hira 
        const questionTypes = [];
        
        if (keysCardModeState.includes(CardMode.hiraganaToKatakana)) questionTypes.push(CardMode.hiraganaToKatakana);
        if (keysCardModeState.includes(CardMode.hiraganaToRomaji)) questionTypes.push(CardMode.hiraganaToRomaji);
        if (keysCardModeState.includes(CardMode.romajiToHiragana)) questionTypes.push(CardMode.romajiToHiragana);
        
        for (let i = 0; i < hiraLetters.length; i++) {
          const letter = hiraLetters[i];

          const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];

          switch (type) {
            case CardMode.hiraganaToKatakana: {
              questions.push({type: "choose-letter", symbol: letter.hi, kana: Kana.Hiragana, answers: getAnswers([hiraLetters], letter, Kana.Katakana), trueAnswer: letter.id });
              continue;
            }
            case CardMode.hiraganaToRomaji: {
              questions.push({type: "choose-letter", symbol: letter.hi, kana: Kana.Hiragana, answers: getAnswers([hiraLetters], letter, Kana.English), trueAnswer: letter.id });
              continue;
            }
            case CardMode.romajiToHiragana: {
              questions.push({type: "choose-letter", symbol: letter.en, kana: Kana.English, answers: getAnswers([hiraLetters], letter, Kana.Hiragana), trueAnswer: letter.id });
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

    stats.recordAnswer(trueSelected, responseTime, "questions[index]");

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    if (index === questions.length - 1) {
      const finalStats = stats.getStats();
      navigation.navigate("Results", { stats: finalStats });
    } else {
      setQuestionIndex((prev) => prev + 1);
    }
  };

  const ShowQuestion = () => {
    const currentQuestion = questions[index];

    if (questions.length === 0) return <></>;

    if (
      currentQuestion?.type === "choose-letter" &&
      mode === PracticeScreenMode.Testing
    ) {
      const question = currentQuestion as Question;

      return (
        <>
          <ShowSymbol symbol={question.symbol} subtext={question.kana} />
          <SelectAnswers
            answers={question.answers}
            onCompleted={onFinish}
            trueAnswer={question.trueAnswer}
          />
        </>
      );
    }

    if (
      currentQuestion?.type === "find-pair-word" &&
      mode == PracticeScreenMode.WordGame
    ) {
      const question = currentQuestion as QuestionFindPair;

      return (
        <FindPair
          pairs={question.pairs}
          answers={question.answers}
          onCompleted={(isError) => onFinish(!isError)}
          title={question.title}
        />
      );
    }

    if (
      currentQuestion?.type === "building-word" &&
      mode == PracticeScreenMode.WordGame
    ) {
      {
        return (
          <ChooseLetters
            title={currentQuestion.title}
            romanji={currentQuestion.romanji}
            translate={currentQuestion.translate}
            kana={currentQuestion.kana}
            shuffle={currentQuestion.shuffle}
            onFinish={(isError) => onFinish(!isError)}
          />
        );
      }
    }

    if (
      currentQuestion?.type === "choose-word" &&
      mode == PracticeScreenMode.WordGame
    ) {
      return (
        <ChooseValue
          title={currentQuestion.title}
          questions={currentQuestion.questions}
          onCompleted={(isError) => onFinish(!isError)}
          trueKey={currentQuestion.trueKey}
        />
      );      
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

      {ShowQuestion()}
    </Container>
  );
}

export default PracticeScreen;