import React, { useEffect, useState } from "react";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as Haptics from "expo-haptics";
import { useKeepAwake } from "expo-keep-awake";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";


import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import useStats from "@/hooks/useStats";
import { CardMode, DifficultyLevelType, Kana, KanaAlphabet, PracticeScreenMode, QuestionTypeBuildingWord, QuestionTypeChooseLetter, QuestionTypeChooseWord, QuestionTypeFindPairWord, TestMode } from "@/shared/constants/kana";
import { lettersTable } from "@/shared/data/lettersTable";
import { Word } from "@/shared/data/words";
import { shuffleArray } from "@/shared/helpers/letters";
import { getAnswers, getRandomWords } from "@/shared/helpers/words";
import { RootStackParamList } from "@/shared/types/navigationTypes";
import { AnyQuestion, Question } from "@/shared/types/questions";
import LinearProgressBar from "@/shared/ui/progressbar/linear/linear-progress-bar";
import { countAvailableWords } from "@/store/features/kana/slice";
import { RootState } from "@/store/store";
import EducationPracticeShowQuestions from "@/widgets/education/education-practice-show-questions/education-practice-show-questions";
import EducationPracticeTimer from "@/widgets/education/education-practice-timer/education-practice-timer";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Practice">;
type LearnScreenRouteProp = RouteProp<RootStackParamList, "Practice">;

interface LearnScreenProps {
  route: LearnScreenRouteProp
  navigation: HomeScreenNavigationProp
}

function EducationPracticePage({ route, navigation }: LearnScreenProps) {
  useKeepAwake();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(countAvailableWords());
  }, []);

  const {
    keysCardModeState,
    keysModeState,
    keysDifficultyLevelState,
    mode
  } = route.params;

  const IS_TIMER = keysDifficultyLevelState.includes(DifficultyLevelType.TimeTest);
  const ONE_ATTEMPT = keysDifficultyLevelState.includes(DifficultyLevelType.OneAttempt);

  const stats = useStats({
    cardModeState: keysCardModeState,
  });

  const insets = useSafeAreaInsets();

  const [questions, setQuestions] = useState<AnyQuestion[]>([]);
  const [index, setQuestionIndex] = useState(0);

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

  const generateWordQuestion = (
    word: Word,
    questionTypes: TestMode[],
    kana: KanaAlphabet,
    mode: "romanji" | "kana"
  ): AnyQuestion => {
    const type =
      questionTypes[Math.floor(Math.random() * questionTypes.length)];

    switch (type) {
      case TestMode.Choice: {
        const word1 = getRandomWords(
          [word.romanji],
          kana === KanaAlphabet.Hiragana ? hiraWords : kanaWords
        );
        const word2 = getRandomWords(
          [word.romanji, word1.romanji],
          kana === KanaAlphabet.Hiragana ? hiraWords : kanaWords
        );
        const word3 = getRandomWords(
          [word.romanji, word1.romanji, word2.romanji],
          kana === KanaAlphabet.Hiragana ? hiraWords : kanaWords
        );

        return {
          type: QuestionTypeChooseWord,
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
          type: QuestionTypeBuildingWord,
          title: `Выбери ${mode === "romanji"
              ? "романджи"
              : kana === KanaAlphabet.Hiragana
                ? "хиригану"
                : "катакану"
            }`,
          romanji: mode === "romanji" ? word.kana : word.romanji,
          shuffle: shuffleArray(
            (mode === "romanji" ? word.romanji : word.kana).split("")
          ),
          translate: word.translate,
          kana: mode === "romanji" ? word.romanji : word.kana,
        };
      }
      case TestMode.FindPair: {
        const word1 = getRandomWords(
          [word.romanji],
          kana === KanaAlphabet.Hiragana ? hiraWords : kanaWords
        );
        const word2 = getRandomWords(
          [word.romanji, word1.romanji],
          kana === KanaAlphabet.Hiragana ? hiraWords : kanaWords
        );
        const word3 = getRandomWords(
          [word.romanji, word1.romanji, word2.romanji],
          kana === KanaAlphabet.Hiragana ? hiraWords : kanaWords
        );

        const kanaElements = [
          word?.kana,
          word1?.kana,
          word2?.kana,
          word3?.kana,
        ];
        const romanjiElements = [
          word?.romanji,
          word1?.romanji,
          word2?.romanji,
          word3?.romanji,
        ];

        kanaElements.sort(() => Math.random() - 0.5);
        romanjiElements.sort(() => Math.random() - 0.5);

        const shuffledPairs = kanaElements.map((kana, index) => {
          return [
            { title: kana, id: kana },
            { title: romanjiElements[index], id: romanjiElements[index] },
          ];
        });

        return {
          type: QuestionTypeFindPairWord,
          title: `Сопоставь ${kana === KanaAlphabet.Hiragana ? "хиригану" : "катакану"
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

  function getRandomElementsFromArray(arr: Question[], numElements = 25) {
    const tempArray = [...arr];
    const randomElements = [];

    for (let i = 0; i < numElements && tempArray.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * tempArray.length);
      randomElements.push(tempArray.splice(randomIndex, 1)[0]);
    }

    return randomElements;
  }


  useEffect(() => {
    if (mode == PracticeScreenMode.WordGame) {
      const questions: AnyQuestion[] = [];

      const wordsCount: number = kanaWords.length + hiraWords.length;

      const questionsCount: number = wordsCount > 20 ? 20 : wordsCount;

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
              questions.push(generateWordQuestion(word, cardTypes, KanaAlphabet.Hiragana, "kana"));
            }
            continue;
          }
          case CardMode.romajiToHiragana: {
            const word = getRandomWords(addedQuestionHira, hiraWords);

            if (word !== null) {
              addedQuestionHira.push(word?.romanji);
              questions.push(
                generateWordQuestion(word, cardTypes, KanaAlphabet.Hiragana, "romanji")
              );
            }
            continue;
          }
          case CardMode.katakanaToRomaji: {
            const word = getRandomWords(addedQuestionKana, kanaWords);
            if (word !== null) {
              addedQuestionKana.push(word?.romanji);
              questions.push(
                generateWordQuestion(word, cardTypes, KanaAlphabet.Katakana, "kana")
              );
            }

            continue;
          }
          case CardMode.romajiToKatakana: {
            const word = getRandomWords(addedQuestionKana, kanaWords);
            if (word !== null) {
              addedQuestionKana.push(word?.romanji);
              questions.push(
                generateWordQuestion(
                  word,
                  cardTypes,
                  KanaAlphabet.Katakana,
                  "romanji"
                )
              );
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
              questions.push({ type: QuestionTypeChooseLetter, symbol: letter.ka, kana: Kana.Katakana, answers: getAnswers([kanaLetters], letter, Kana.Hiragana), trueAnswer: letter.id });
              continue;
            }
            case CardMode.katakanaToRomaji: {
              questions.push({ type: QuestionTypeChooseLetter, symbol: letter.ka, kana: Kana.Katakana, answers: getAnswers([kanaLetters], letter, Kana.English), trueAnswer: letter.id });
              continue;
            }
            case CardMode.romajiToKatakana: {
              questions.push({ type: QuestionTypeChooseLetter, symbol: letter.en, kana: Kana.English, answers: getAnswers([kanaLetters], letter, Kana.Katakana), trueAnswer: letter.id });
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
              questions.push({ type: QuestionTypeChooseLetter, symbol: letter.hi, kana: Kana.Hiragana, answers: getAnswers([hiraLetters], letter, Kana.Katakana), trueAnswer: letter.id });
              continue;
            }
            case CardMode.hiraganaToRomaji: {
              questions.push({ type: QuestionTypeChooseLetter, symbol: letter.hi, kana: Kana.Hiragana, answers: getAnswers([hiraLetters], letter, Kana.English), trueAnswer: letter.id });
              continue;
            }
            case CardMode.romajiToHiragana: {
              questions.push({ type: QuestionTypeChooseLetter, symbol: letter.en, kana: Kana.English, answers: getAnswers([hiraLetters], letter, Kana.Hiragana), trueAnswer: letter.id });
              continue;
            }
          }
        }
      }

      if (questions.length > 20) {
        setQuestions(shuffleArray(getRandomElementsFromArray(questions, 25)));
      } else {
        setQuestions(shuffleArray(questions));
      }

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

  return (
    <Container paddingTop={insets.top}>
      <Header>
        <LinearProgressBar
          close={() => navigation.goBack()}
          current={index}
          all={questions.length}
        />
        {IS_TIMER && mode === PracticeScreenMode.Testing && <EducationPracticeTimer />}
      </Header>

      <EducationPracticeShowQuestions
        onFinish={onFinish}
        questions={questions}
        mode={mode}
        question={questions[index]} />
    </Container>
  );
}

export default EducationPracticePage;


const Container = styled.View<{ paddingTop: number }>`
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
