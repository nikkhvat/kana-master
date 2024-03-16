import React, { createContext, FC, PropsWithChildren, useContext, useState } from "react";

import * as Haptics from "expo-haptics";

import { RootState } from "@/app/store";
import { CardMode, Kana, QuestionTypeChooseLetter } from "@/shared/constants/kana";
import { ILetter, LettersKeys, lettersTableById } from "@/shared/data/lettersTable";
import { shuffleArray } from "@/shared/helpers/letters";
import { getAnswersWithRandom } from "@/shared/helpers/words";
import { Question } from "@/shared/types/questions";

interface generateQuestionsProps {
  selectedLetters: RootState["kana"]["selected"]
  keysCardModeState: CardMode[]
}
interface EducationPracticeContextValue {
  init: (questions: Question[]) => void;
  generateQuestions: (options: generateQuestionsProps) => Question[];
  submit: (
    trueSelected: boolean,
    callback?: (onFinishPractice: boolean, trueAnswer: boolean) => void
  ) => void;
  questions: Question[]
  currentIndex: number
}

export const EducationPracticeContext = createContext<EducationPracticeContextValue>({
  init: () => { },
  submit: () => { },
  generateQuestions: () => [],
  questions: [],
  currentIndex: 0
});

export const useEducationPracticeContext = () => useContext(EducationPracticeContext);

export const EducationPracticeContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);

  // Когда отвечаешь на вопрос вызываеться эта функция
  // параметр trueSelected: правильный ли ответ
  // callback передаёться
  // > onFinishPractice - true если вопросы закончились
  // > trueAnswer - true если вопросы был правильный 
  const submit = (
    trueSelected: boolean,
    callback?: (onFinishPractice: boolean, trueAnswer: boolean) => void,
  ) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    if (currentIndex > questions.length - 1) return;

    if (currentIndex === questions.length - 1) {
      callback?.(true, trueSelected);
    } else {
      setQuestionIndex((prev) => prev + 1);
      callback?.(false, trueSelected);
    }
  };

  // Передаёться масив вопросов 
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

    const kanaLetters = [
      ...selectedLetters.base.katakana,
      ...selectedLetters.dakuon.katakana,
      ...selectedLetters.handakuon.katakana,
      ...selectedLetters.yoon.katakana,
    ].map(item => lettersTableById[item as LettersKeys]);

    const hiraLetters = [
      ...selectedLetters.base.hiragana,
      ...selectedLetters.dakuon.hiragana,
      ...selectedLetters.handakuon.hiragana,
      ...selectedLetters.yoon.hiragana,
    ].map(item => lettersTableById[item as LettersKeys]);

    const questions: Question[] = [];

    {
      // Generate questions for Kana
      const questionTypes = [];

      if (keysCardModeState.includes(CardMode.romajiToKatakana)) questionTypes.push(CardMode.romajiToKatakana);
      if (keysCardModeState.includes(CardMode.katakanaToRomaji)) questionTypes.push(CardMode.katakanaToRomaji);
      if (keysCardModeState.includes(CardMode.katakanaToHiragana)) questionTypes.push(CardMode.katakanaToHiragana);
      
      if (questionTypes.length > 0) {
        for (let i = 0; i < kanaLetters.length; i++) {
          const letter = kanaLetters[i] as ILetter;
          if (letter !== undefined) {
            
            const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
            const kanaType  = type === CardMode.romajiToKatakana
              ? Kana.English : Kana.Katakana;
  
            questions.push({
              type: QuestionTypeChooseLetter,
              symbol: letter,
              kana: kanaType,
              answers: getAnswersWithRandom(
                [kanaLetters] as ILetter[][], 
                letter, 
              ),
              trueAnswer: letter.id,
              mode: type
            });
          }
        }
      }
    }

    {
      const questionTypes = [];

      if (keysCardModeState.includes(CardMode.hiraganaToKatakana)) questionTypes.push(CardMode.hiraganaToKatakana);
      if (keysCardModeState.includes(CardMode.hiraganaToRomaji)) questionTypes.push(CardMode.hiraganaToRomaji);
      if (keysCardModeState.includes(CardMode.romajiToHiragana)) questionTypes.push(CardMode.romajiToHiragana);

      if (questionTypes.length > 0) {
        for (let i = 0; i < hiraLetters.length; i++) {
          const letter = hiraLetters[i] as ILetter;
          if (letter !== undefined) {
            const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
            const kanaType = type === CardMode.romajiToHiragana
              ? Kana.English : Kana.Hiragana;
            
            questions.push({
              type: QuestionTypeChooseLetter,
              symbol: letter,
              kana: kanaType,
              answers: getAnswersWithRandom(
                [hiraLetters] as ILetter[][],
                letter,
              ),
              trueAnswer: letter.id,
              mode: type
            });
          }
        }
      }
    }

    if (questions.length > 20) {
      return shuffleArray(getRandomElementsFromArray(questions, 25));
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
        generateQuestions
      }}
    >
      {children}
    </EducationPracticeContext.Provider>
  );
};
