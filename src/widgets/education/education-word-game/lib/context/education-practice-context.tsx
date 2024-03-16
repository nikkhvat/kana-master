import React, { createContext, FC, PropsWithChildren, useContext, useState } from "react";

import * as Haptics from "expo-haptics";

import { RootState } from "@/app/store";
import { CardMode, KanaAlphabet, QuestionTypeBuildingWord, QuestionTypeChooseWord, QuestionTypeFindPairWord, TestMode } from "@/shared/constants/kana";
import { ILetter, LettersKeys, lettersTableById } from "@/shared/data/lettersTable";
import { Word } from "@/shared/data/words";
import { getRandomLetter, shuffleArray } from "@/shared/helpers/letters";
import { getRandomWords } from "@/shared/helpers/words";
import { AnyWordGameQuestion } from "@/shared/types/questions";

interface generateQuestionsProps {
  selectedLetters: RootState["kana"]["selected"]
  selectedWords: RootState["kana"]["selectedWords"]
  keysModeState: TestMode[]
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
    kanaLetters: ILetter[],
    hiraLetters: ILetter[],
  ): AnyWordGameQuestion => {
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
          word: word,
          title: `Выбери раманджи для ${word.kana} (${word.translate})`,
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

        const shuffle = (mode === "romanji" ? word.romanji : word.kana).split("");

        if (shuffle.length < 5) {
          const lettersToAdd = 5 - shuffle.length;

          if (mode === "romanji") {
            for (let i = 0; i < lettersToAdd; i++) {
              if (kana === KanaAlphabet.Hiragana) {
                const randomLetter = getRandomLetter([hiraLetters]);

                if (randomLetter !== null) shuffle.push(randomLetter.en);
              } else {
                const randomLetter = getRandomLetter([kanaLetters]);
                if (randomLetter !== null) shuffle.push(randomLetter.en);
              }
            }
          } else {
            for (let i = 0; i < lettersToAdd; i++) {
              if (kana === KanaAlphabet.Hiragana) {
                const randomLetter = getRandomLetter([hiraLetters]);
                if (randomLetter !== null) shuffle.push(randomLetter.hi);
              } else {
                const randomLetter = getRandomLetter([kanaLetters]);
                if (randomLetter !== null) shuffle.push(randomLetter.ka);
              }
            }
          }
        }

        return {
          type: QuestionTypeBuildingWord,
          title: `Выбери ${mode === "romanji"
            ? "романджи"
            : kana === KanaAlphabet.Hiragana
              ? "хиригану"
              : "катакану"
            }`,
          romanji: mode === "romanji" ? word.kana : word.romanji,
          shuffle: shuffleArray(shuffle.map(item => item.toLowerCase())),
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

  const generateQuestions = ({
    selectedLetters,
    selectedWords,
    keysModeState,
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

    if (kanaWords.length > 10) {
      questionTypes.push(CardMode.katakanaToRomaji);
      questionTypes.push(CardMode.romajiToKatakana);
    }

    if (hiraWords.length > 10) {
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

      const wordList = (type === CardMode.hiraganaToRomaji || type === CardMode.romajiToHiragana) ? hiraWords : kanaWords;
      const alphabet = (type === CardMode.hiraganaToRomaji || type === CardMode.romajiToHiragana) ? KanaAlphabet.Hiragana : KanaAlphabet.Katakana;
      const mode = (type === CardMode.hiraganaToRomaji || type === CardMode.katakanaToRomaji) ? "kana" : "romanji";

      
      const word = getRandomWords(addedQuestionHira, wordList);
      if (word !== null) {

        if (type === CardMode.hiraganaToRomaji || type === CardMode.romajiToHiragana) {
          addedQuestionHira.push(word?.romanji);
        } else {
          addedQuestionKana.push(word?.romanji);
        }

        questions.push(
          generateWordQuestion(
            word,
            cardTypes,
            alphabet,
            mode,
            kanaWords,
            hiraWords,
            kanaLetters as ILetter[],
            hiraLetters as ILetter[])
          );
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
