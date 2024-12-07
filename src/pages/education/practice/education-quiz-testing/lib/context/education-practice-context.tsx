import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

import { Vibration } from 'react-native';

import * as Haptics from "expo-haptics";

import { RootState } from "@/app/store";
import {
  CardMode,
  Kana,
  QuestionTypeChooseLetter,
} from "@/shared/constants/kana";
import {
  ILetter,
  LettersKeys,
  lettersTableById,
} from "@/shared/data/lettersTable";
import { shuffleArray } from "@/shared/helpers/letters";
import { getAnswersWithRandom } from "@/shared/helpers/words";
import { Question } from "@/shared/types/questions";
import { useAppSelector } from "@/shared/model/hooks";
import { isAndroid, isIOS } from "@/shared/constants/platformUtil";

interface generateQuestionsProps {
  selectedLetters: RootState["kana"]["selected"];
  keysCardModeState: CardMode[];
}
interface EducationPracticeContextValue {
  init: (questions: Question[]) => void;
  generateQuestions: (options: generateQuestionsProps) => Question[];
  submit: (
    trueSelected: boolean,
    callback?: (onFinishPractice: boolean, trueAnswer: boolean) => void,
  ) => void;
  questions: Question[];
  currentIndex: number;
}

export const EducationPracticeContext =
  createContext<EducationPracticeContextValue>({
    init: () => {},
    submit: () => {},
    generateQuestions: () => [],
    questions: [],
    currentIndex: 0,
  });

export const useEducationPracticeContext = () =>
  useContext(EducationPracticeContext);

export const EducationPracticeContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [currentIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);

  const isEnabledHaptic = useAppSelector(
    (state) => state.profile.isEnabledHaptic,
  );

  const submit = (
    trueSelected: boolean,
    callback?: (onFinishPractice: boolean, trueAnswer: boolean) => void,
  ) => {
    if (isEnabledHaptic) {
      if (isIOS()) {
        if (trueSelected) {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        } else {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
      }

      if (isAndroid()) {
        const successPattern = [0, 1];
        const errorPattern = [0, 1, 100, 1];


        if (trueSelected) {
          Vibration.vibrate(successPattern);
        } else {
          Vibration.vibrate(errorPattern);
        }
      }
    }

    if (currentIndex > questions.length - 1) return;

    setQuestionIndex((prev) => prev + 1);
    if (currentIndex === questions.length - 1) {
      callback?.(true, trueSelected);
    } else {
      callback?.(false, trueSelected);
    }
  };

  const init = (questions: Question[]) => {
    setQuestions(questions);
  };

  function getRandomElementsFromArray(arr: Question[], numElements = 25) {
    if (arr.length === 0) return [];

    const tempArray = [...arr];
    const randomElements = [];

    for (let i = 0; i < numElements && tempArray.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * tempArray.length);
      randomElements.push(tempArray.splice(randomIndex, 1)[0]);
    }

    return randomElements;
  }

  const generateQuestions = ({
    selectedLetters,
    keysCardModeState,
  }: generateQuestionsProps): Question[] => {
    const katakanaLetters = [
      ...selectedLetters.base.katakana,
      ...selectedLetters.dakuon.katakana,
      ...selectedLetters.handakuon.katakana,
      ...selectedLetters.yoon.katakana,
    ].map((item) => lettersTableById[item as LettersKeys]);

    const hiraganaLetters = [
      ...selectedLetters.base.hiragana,
      ...selectedLetters.dakuon.hiragana,
      ...selectedLetters.handakuon.hiragana,
      ...selectedLetters.yoon.hiragana,
    ].map((item) => lettersTableById[item as LettersKeys]);

    const questions: Question[] = [];

    {
      const questionTypes = [];

      if (keysCardModeState.includes(CardMode.romajiToKatakana))
        questionTypes.push(CardMode.romajiToKatakana);
      if (keysCardModeState.includes(CardMode.katakanaToRomaji))
        questionTypes.push(CardMode.katakanaToRomaji);
      if (keysCardModeState.includes(CardMode.katakanaToHiragana))
        questionTypes.push(CardMode.katakanaToHiragana);

      if (questionTypes.length > 0) {
        for (let i = 0; i < katakanaLetters.length; i++) {
          const letter = katakanaLetters[i] as ILetter;
          if (letter !== undefined) {
            const type =
              questionTypes[Math.floor(Math.random() * questionTypes.length)];
            const kanaType =
              type === CardMode.romajiToKatakana ? Kana.Romanji : Kana.Katakana;

            questions.push({
              type: QuestionTypeChooseLetter,
              symbol: letter,
              kana: kanaType,
              answers: getAnswersWithRandom(
                [katakanaLetters] as ILetter[][],
                letter,
              ),
              trueAnswer: letter.id,
              mode: type,
            });
          }
        }
      }
    }

    {
      const questionTypes = [];

      if (keysCardModeState.includes(CardMode.hiraganaToKatakana))
        questionTypes.push(CardMode.hiraganaToKatakana);
      if (keysCardModeState.includes(CardMode.hiraganaToRomaji))
        questionTypes.push(CardMode.hiraganaToRomaji);
      if (keysCardModeState.includes(CardMode.romajiToHiragana))
        questionTypes.push(CardMode.romajiToHiragana);

      if (questionTypes.length > 0) {
        for (let i = 0; i < hiraganaLetters.length; i++) {
          const letter = hiraganaLetters[i] as ILetter;
          if (letter !== undefined) {
            const type =
              questionTypes[Math.floor(Math.random() * questionTypes.length)];
            const kanaType =
              type === CardMode.romajiToHiragana ? Kana.Romanji : Kana.Hiragana;

            questions.push({
              type: QuestionTypeChooseLetter,
              symbol: letter,
              kana: kanaType,
              answers: getAnswersWithRandom(
                [hiraganaLetters] as ILetter[][],
                letter,
              ),
              trueAnswer: letter.id,
              mode: type,
            });
          }
        }
      }
    }

    if (questions.length > 10) {
      return shuffleArray(getRandomElementsFromArray(questions, 10));
    } else {
      return shuffleArray(questions);
    }

    return [];
  };

  return (
    <EducationPracticeContext.Provider
      value={{
        init,
        submit,
        questions,
        currentIndex,
        generateQuestions,
      }}
    >
      {children}
    </EducationPracticeContext.Provider>
  );
};
