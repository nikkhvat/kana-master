import { ILetter, base, dakuon, handakuon, yoon } from "../data/lettersTable";

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

export type AnyLesson = LessonSymbol | LessonDraw | LessonMatchSymbols | LessonSelectSymbol | LessonSelectSequenceLetters | LessonBuildWord | LessonFinish

// First screen
export type LessonSymbol = {
  name: LessonScreen.Symbol
  symbol: ILetter
}

// Second screen
export type LessonDraw = {
  name: LessonScreen.Draw
  symbol: ILetter
}

// Third screen
export type LessonMatchSymbols = {
  name: LessonScreen.MatchSymbols
  symbols: ILetter[]
}

// Fourth screen
export type LessonSelectSymbol = {
  name: LessonScreen.SelectSymbol
  symbols: ILetter[]
}

// Fifth screen
export type LessonSelectSequenceLetters = {
  name: LessonScreen.SelectSequenceLetters
  sequence: ILetter[]
}

// Sixth screen
export type LessonBuildWord = {
  name: LessonScreen.BuildWord
  sequence: ILetter[]
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
  ],
  dakuon: [
    { title: dakuon[0][0], letters: dakuon[0], msg: firstMsg },    
    { title: dakuon[1][0], letters: dakuon[1], msg: msg },    
    { title: dakuon[2][0], letters: dakuon[2], msg: msg },    
    { title: dakuon[3][0], letters: dakuon[3], msg: msg },    
    { title: handakuon[0][0], letters: handakuon[0], msg: lastMsg },    
  ],
  yoon: [
    { title: yoon[0][0], letters: yoon[0], msg: firstMsg },    
    { title: yoon[1][0], letters: yoon[1], msg: msg },    
    { title: yoon[2][0], letters: yoon[2], msg: msg },    
    { title: yoon[3][0], letters: yoon[3], msg: msg },    
    { title: yoon[4][0], letters: yoon[4], msg: msg },    
    { title: yoon[5][0], letters: yoon[5], msg: msg },    
    { title: yoon[6][0], letters: yoon[6], msg: msg },    
    { title: yoon[7][0], letters: yoon[7], msg: msg },    
    { title: yoon[8][0], letters: yoon[8], msg: msg },    
    { title: yoon[9][0], letters: yoon[9], msg: msg },    
    { title: yoon[10][0], letters: yoon[10], msg: firstMsg },    
  ]
};
