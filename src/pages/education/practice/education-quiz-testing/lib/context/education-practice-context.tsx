import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

import { RootState } from "@/app/store";
import {
  CardMode,
  Kana,
  QuestionMode,
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
import { useHaptic } from "@/shared/helpers/haptic";
import { kanaTemplates } from "@/shared/helpers/hieroglyph-recognition/templates";

interface generateQuestionsProps {
  selectedLetters: RootState["kana"]["selected"];
  keysCardModeState: CardMode[];
  questionMode: QuestionMode
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
  const { triggerSuccessNotification, triggerErrorNotification } = useHaptic();

  const [currentIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);

  const submit = (
    trueSelected: boolean,
    callback?: (onFinishPractice: boolean, trueAnswer: boolean) => void,
  ) => {
    if (trueSelected) {
      triggerSuccessNotification();
    } else {
      triggerErrorNotification();
    }

    if (currentIndex > questions.length - 1) return;

    setQuestionIndex((prev) => prev + 1);
    callback?.(currentIndex === questions.length - 1, trueSelected);
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
    questionMode
  }: generateQuestionsProps): Question[] => {
    const isDraw = questionMode === QuestionMode.Brash

    const katakanaLetters = [
      ...selectedLetters.base.katakana,
      ...selectedLetters.dakuon.katakana,
      ...selectedLetters.handakuon.katakana,
      ...selectedLetters.yoon.katakana,
    ].map((item) => lettersTableById[item as LettersKeys])
    .filter(item => !isDraw ? true : Object.prototype.hasOwnProperty.call(kanaTemplates.katakana, item.ka));

    const hiraganaLetters = [
      ...selectedLetters.base.hiragana,
      ...selectedLetters.dakuon.hiragana,
      ...selectedLetters.handakuon.hiragana,
      ...selectedLetters.yoon.hiragana,
    ].map((item) => lettersTableById[item as LettersKeys])
    .filter(item => !isDraw ? true : Object.prototype.hasOwnProperty.call(kanaTemplates.hiragana, item.hi));

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
          const letter = katakanaLetters[i] as never as ILetter;
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
                [katakanaLetters] as never as ILetter[][],
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
          const letter = hiraganaLetters[i] as never as ILetter;
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
                [hiraganaLetters] as never as ILetter[][],
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
