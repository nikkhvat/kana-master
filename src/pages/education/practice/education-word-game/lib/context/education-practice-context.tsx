import React, { createContext, FC, PropsWithChildren, useContext, useState } from "react";

import * as Haptics from "expo-haptics";

import generateChoiceAnswer from "../helpers/generate-choice-answer";
import generateFindThePair from "../helpers/generate-find-the-pair";
import generateWordBuilding from "../helpers/generate-word-building";

import { RootState } from "@/app/store";
import { CardMode, KanaAlphabet, TestMode, WordBuildingType } from "@/shared/constants/kana";
import { ILetter, LettersKeys, lettersTableById } from "@/shared/data/lettersTable";
import { Word } from "@/shared/data/words";
import { shuffleArray } from "@/shared/helpers/letters";
import { getRandomWords } from "@/shared/helpers/words";
import { AnyWordGameQuestion, Maybe } from "@/shared/types/questions";

interface generateQuestionsProps {
  selectedLetters: RootState["kana"]["selected"]
  selectedWords: RootState["kana"]["selectedWords"]
  keysModeState: TestMode[]
  lang: string
}
interface EducationPracticeContextValue {
  init: (questions: AnyWordGameQuestion[]) => void;
  generateQuestions: (options: generateQuestionsProps) => AnyWordGameQuestion[];
  submit: (
    trueSelected: boolean,
    callback?: (onFinishPractice: boolean, trueAnswer: boolean) => void
  ) => void;
  questions: AnyWordGameQuestion[]
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
  const [questions, setQuestions] = useState<AnyWordGameQuestion[]>([]);

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

  const init = (questions: AnyWordGameQuestion[]) => {
    setQuestions(questions);
  };

  const generateWordQuestion = (
    word: Word,
    questionTypes: TestMode[],
    kana: KanaAlphabet,
    mode: "romanji" | "kana",
    kanaWords: Word[],
    hiraWords: Word[],
    lang: string,
    kanaLetters: ILetter[],
    hiraLetters: ILetter[],
  ): Maybe<AnyWordGameQuestion> => {
    const type =
      questionTypes[Math.floor(Math.random() * questionTypes.length)];

    switch (type) {
      case TestMode.Choice: {
        return generateChoiceAnswer({ word, kanaWords, hiraWords, kana, lang});
      }
      case TestMode.WordBuilding: {
        return generateWordBuilding({
          word,
          kanaLetters,
          hiraLetters,
          selectKanaType: kana,
          lang
        });
      }
      case TestMode.FindPair: {
        return generateFindThePair({ word, kanaWords, hiraWords, kana, lang});
      }
    }
  };

  const generateQuestions = ({
    selectedLetters,
    selectedWords,
    keysModeState,
    lang,
  }: generateQuestionsProps): AnyWordGameQuestion[] => {

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

    const kanaWords: Word[] = selectedWords.katakana;
    const hiraWords: Word[] = selectedWords.hiragana;

    const questions: AnyWordGameQuestion[] = [];

    const wordsCount: number = kanaWords.length + hiraWords.length;

    const questionsCount: number = wordsCount > 10 ? 10 : wordsCount;

    const questionTypes: CardMode[] = [];

    if (kanaWords.length >= 10) {
      questionTypes.push(CardMode.katakanaToRomaji);
      questionTypes.push(CardMode.romajiToKatakana);
    }

    if (hiraWords.length >= 10) {
      questionTypes.push(CardMode.hiraganaToRomaji);
      questionTypes.push(CardMode.romajiToHiragana);
    }

    const cardTypes: TestMode[] = [];

    if (keysModeState.includes(TestMode.Choice)) cardTypes.push(TestMode.Choice);
    if (keysModeState.includes(TestMode.WordBuilding)) cardTypes.push(TestMode.WordBuilding);
    if (keysModeState.includes(TestMode.FindPair)) cardTypes.push(TestMode.FindPair);

    const addedQuestionKana: string[] = [];
    const addedQuestionHira: string[] = [];

    for (let i = 0; i < questionsCount; i++) {
      const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
      
      const alphabet = (type === CardMode.hiraganaToRomaji || type === CardMode.romajiToHiragana) ? KanaAlphabet.Hiragana : KanaAlphabet.Katakana;
      const mode = (type === CardMode.hiraganaToRomaji || type === CardMode.katakanaToRomaji) ? "kana" : "romanji";

      const word = getRandomWords(addedQuestionHira, [hiraWords, kanaWords].flat());

      if (word !== null && word !== undefined) {
        if (type === CardMode.hiraganaToRomaji || type === CardMode.romajiToHiragana) {
          addedQuestionHira.push(word?.romanji);
        } else {
          addedQuestionKana.push(word?.romanji);
        }

        const question = generateWordQuestion(
          word,
          cardTypes,
          alphabet,
          mode,
          kanaWords,
          hiraWords,
          lang,
          kanaLetters as ILetter[],
          hiraLetters as ILetter[],
        );
        
        if (question !== null) {
          questions.push(question);
        }
      }
    }

    return shuffleArray(questions);
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
