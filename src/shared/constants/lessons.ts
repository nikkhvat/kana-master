import { ILetter, base } from "../data/lettersTable";

import { KanaAlphabet } from "./kana";

export enum LessonScreen {
  Symbol,
  Draw,
  MatchSymbols,
  SelectSymbol,
  SelectSequenceLetters,
  BuildWord,
  Finish,

  Info
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

export type TextBlock = { type: "text", text: string };
export type RulesBlock = { type: "rules", rules: string[] };
export type TableBlock = { type: "table", table: string[][] };
export type LetterBlock = { type: "letter", id: string, kana: KanaAlphabet };
export type SelectAnswerBlock = { type: "select-answer", answers: { title: string, isTrue: boolean }[] };

export type AnyBlock = TextBlock | TableBlock | RulesBlock | LetterBlock | SelectAnswerBlock;

export type InfoLessonScreen = {
  name: LessonScreen.Info
  title: string
  isActiveNext?: boolean
  isActiveFinish?: boolean
  blocks: AnyBlock[]
}

export type AutoLesson = {
  type: "auto"
  id: string
  title: ILetter
  letters: ILetter[]
  msg: string

  kana?: KanaAlphabet
};

export type ManuallyLesson = {
  type: "manually"
  id: string
  title: string
  subTitle: string
  infoTitle: string
  infoSubTitle: string
  icon: string
  category: KanaAlphabet[]
  screens: InfoLessonScreen[]
};