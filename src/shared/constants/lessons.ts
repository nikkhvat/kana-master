import { ILetter, base } from "../data/lettersTable";
import { Word } from "../data/words";

import { KanaAlphabet } from "./kana";

export enum LessonScreen {
  Symbol,
  Draw,
  MatchSymbols,
  SelectSymbol,
  SelectSequenceLetters,
  BuildWord,
  Finish
}

// First screen
export type LessonSymbol = {
  name: LessonScreen.Symbol
  symbol: ILetter
  kana: KanaAlphabet
}

// Second screen
export type LessonDraw = {
  name: LessonScreen.Draw
  symbol: ILetter
  kana: KanaAlphabet
}

// Third screen
export type LessonMatchSymbols = {
  name: LessonScreen.MatchSymbols
  symbols: ILetter[]
  kana: KanaAlphabet
}

// Fourth screen
export type LessonSelectSymbol = {
  name: LessonScreen.SelectSymbol
  symbols: ILetter
  kana: KanaAlphabet
}

// Fifth screen
export type LessonSelectSequenceLetters = {
  name: LessonScreen.SelectSequenceLetters
  sequence: ILetter[]
  kana: KanaAlphabet
}

// Sixth screen
export type LessonBuildWord = {
  name: LessonScreen.BuildWord
  word: Word
  kana: KanaAlphabet
}

// Seventh screen
export type LessonFinish = {
  name: LessonScreen.Finish
}

const firstMsg = "Научитесь писать первые {count} букв хириганы";
const msg = "Научитесь писать следующие {count} букв хириганы";
const lastMsg = "Научитесь писать последние {count} букв хириганы";

export const lessons = {
  base: [
    { title: base[0][0], letters: base[0], msg: firstMsg },
    { title: base[1][0], letters: base[1], msg: msg },
    { title: base[2][0], letters: base[2], msg: msg },
    { title: base[3][0], letters: base[3], msg: msg },
    { title: base[4][0], letters: base[4], msg: msg },
    { title: base[5][0], letters: base[5], msg: msg },
    { title: base[6][0], letters: [base[6], base[7]].flat(), msg: msg },
    { title: base[8][0], letters: base[8], msg: msg },
    { title: base[9][0], letters: [base[9], base[10]].flat(), msg: lastMsg },
  ]
};
