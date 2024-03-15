import React, { createContext, FC, PropsWithChildren, useContext, useState } from "react";

import * as Haptics from "expo-haptics";

import { RootState } from "@/app/store";
import { CardMode, Kana, KanaAlphabet, PracticeScreenMode, QuestionTypeBuildingWord, QuestionTypeChooseLetter, QuestionTypeChooseWord, QuestionTypeFindPairWord, TestMode } from "@/shared/constants/kana";
import { ILetter, LettersKeys, lettersTableById } from "@/shared/data/lettersTable";
import { Word } from "@/shared/data/words";
import { getRandomLetter, shuffleArray } from "@/shared/helpers/letters";
import { getAnswers, getRandomWords } from "@/shared/helpers/words";
import { AnyQuestion, Question } from "@/shared/types/questions";

interface generateQuestionsProps {
  mode: PracticeScreenMode,
  selectedLetters: RootState["kana"]["selected"]
  selectedWords: RootState["kana"]["selectedWords"]
  keysCardModeState: CardMode[]
  keysModeState: TestMode[]
}
interface EducationPracticeContextValue {
  init: (questions: AnyQuestion[]) => void;
  generateQuestions: (options: generateQuestionsProps) => AnyQuestion[];
  submit: (
    trueSelected: boolean,
    callback?: (onFinishPractice: boolean, trueAnswer: boolean) => void
  ) => void;
  questions: AnyQuestion[]
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
  const [questions, setQuestions] = useState<AnyQuestion[]>([]);

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
  const init = (questions: AnyQuestion[]) => {
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

        const shuffle = (mode === "romanji" ? word.romanji : word.kana).split("");

        if (shuffle.length < 5) {
          const lettersToAdd = 5 - shuffle.length;

          if (mode === "romanji") {
            for (let i = 0; i < lettersToAdd; i++) {
              if (kana === KanaAlphabet.Hiragana) {
                const randomLetter = getRandomLetter([hiraLetters]);
                shuffle.push(randomLetter.en);
              } else {
                const randomLetter = getRandomLetter([kanaLetters]);
                shuffle.push(randomLetter.en);
              }
            }
          } else {
            for (let i = 0; i < lettersToAdd; i++) {
              if (kana === KanaAlphabet.Hiragana) {
                const randomLetter = getRandomLetter([hiraLetters]);
                shuffle.push(randomLetter.hi);
              } else {
                const randomLetter = getRandomLetter([kanaLetters]);
                shuffle.push(randomLetter.ka);
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

  function getRandomElementsFromArray(arr: Question[], numElements = 25) {
    const tempArray = [...arr];
    const randomElements = [];

    for (let i = 0; i < numElements && tempArray.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * tempArray.length);
      randomElements.push(tempArray.splice(randomIndex, 1)[0]);
    }

    return randomElements;
  }

  const generateQuestions = ({
    mode,
    selectedLetters,
    selectedWords,
    keysCardModeState,
    keysModeState
  }: generateQuestionsProps): AnyQuestion[] => {

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

    if (mode == PracticeScreenMode.WordGame) {
      const questions: AnyQuestion[] = [];

      const wordsCount: number = kanaWords.length + hiraWords.length;

      const questionsCount: number = wordsCount > 20 ? 20 : wordsCount;

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

        switch (type) {
          case CardMode.hiraganaToRomaji: {
            const word = getRandomWords(addedQuestionHira, hiraWords);

            if (word !== null) {
              addedQuestionHira.push(word?.romanji);
              questions.push(
                generateWordQuestion(
                  word, 
                  cardTypes, 
                  KanaAlphabet.Hiragana, 
                  "kana", 
                  kanaWords, 
                  hiraWords,
                  kanaLetters as ILetter[],
                  hiraLetters as ILetter[]));
            }
            continue;
          }
          case CardMode.romajiToHiragana: {
            const word = getRandomWords(addedQuestionHira, hiraWords);

            if (word !== null) {
              addedQuestionHira.push(word?.romanji);
              questions.push(
                generateWordQuestion(
                  word, 
                  cardTypes, 
                  KanaAlphabet.Hiragana, 
                  "romanji", 
                  kanaWords, 
                  hiraWords,
                  kanaLetters as ILetter[],
                  hiraLetters as ILetter[]
                )
              );
            }
            continue;
          }
          case CardMode.katakanaToRomaji: {
            const word = getRandomWords(addedQuestionKana, kanaWords);

            if (word !== null) {
              addedQuestionKana.push(word?.romanji);
              questions.push(
                generateWordQuestion(
                  word, 
                  cardTypes, 
                  KanaAlphabet.Katakana, 
                  "kana", 
                  kanaWords, 
                  hiraWords,
                  kanaLetters as ILetter[],
                  hiraLetters as ILetter[]
                )
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
                  "romanji",
                  kanaWords,
                  hiraWords,
                  kanaLetters as ILetter[],
                  hiraLetters as ILetter[]
                )
              );
            }
            continue;
          }
        }
      }

      return shuffleArray(questions);
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

          const letter = kanaLetters[i] as ILetter;

          const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];

          switch (type) {
            case CardMode.katakanaToHiragana: {
              questions.push({
                type: QuestionTypeChooseLetter,
                symbol: letter.ka,
                kana: Kana.Katakana,
                answers: getAnswers([kanaLetters] as ILetter[][], letter, Kana.Hiragana),
                trueAnswer: letter.id
              });
              continue;
            }
            case CardMode.katakanaToRomaji: {
              questions.push({
                type: QuestionTypeChooseLetter,
                symbol: letter.ka,
                kana: Kana.Katakana,
                answers: getAnswers([kanaLetters] as ILetter[][], letter, Kana.English),
                trueAnswer: letter.id
              });
              continue;
            }
            case CardMode.romajiToKatakana: {
              questions.push({
                type: QuestionTypeChooseLetter,
                symbol: letter.en,
                kana: Kana.English,
                answers: getAnswers([kanaLetters] as ILetter[][], letter, Kana.Katakana),
                trueAnswer: letter.id
              });
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
          const letter = hiraLetters[i] as ILetter;

          if (letter !== undefined) {
            const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];

            switch (type) {
              case CardMode.hiraganaToKatakana: {
                questions.push({
                  type: QuestionTypeChooseLetter,
                  symbol: letter.hi,
                  kana: Kana.Hiragana,
                  answers: getAnswers([hiraLetters] as ILetter[][], letter, Kana.Katakana),
                  trueAnswer: letter.id
                });
                continue;
              }
              case CardMode.hiraganaToRomaji: {
                questions.push({
                  type: QuestionTypeChooseLetter,
                  symbol: letter.hi,
                  kana: Kana.Hiragana,
                  answers: getAnswers([hiraLetters] as ILetter[][], letter, Kana.English),
                  trueAnswer: letter.id
                });
                continue;
              }
              case CardMode.romajiToHiragana: {
                questions.push({
                  type: QuestionTypeChooseLetter,
                  symbol: letter.en,
                  kana: Kana.English,
                  answers: getAnswers([hiraLetters] as ILetter[][], letter, Kana.Hiragana),
                  trueAnswer: letter.id
                });
                continue;
              }
            }
          }
        }
      }

      if (questions.length > 20) {
        return shuffleArray(getRandomElementsFromArray(questions, 25));
      } else {
        return shuffleArray(questions);
      }
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
