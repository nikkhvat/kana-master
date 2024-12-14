import { ILetter } from "../data/lettersTable";

import { KanaAlphabet } from "./kana";

export enum LessonScreen {
  Symbol,
  Draw,
  MatchSymbols,
  SelectSymbol,
  SelectSequenceLetters,
  BuildWord,
  Finish,

  Info,
}

export type AnyLesson =
  | LessonSymbol
  | LessonDraw
  | LessonMatchSymbols
  | LessonSelectSymbol
  | LessonSelectSequenceLetters
  | LessonBuildWord
  | LessonFinish;

// First screen
export type LessonSymbol = {
  name: LessonScreen.Symbol;
  symbol: ILetter;
};

// Second screen
export type LessonDraw = {
  name: LessonScreen.Draw;
  symbol: ILetter;
};

// Third screen
export type LessonMatchSymbols = {
  name: LessonScreen.MatchSymbols;
  symbols: ILetter[];
};

// Fourth screen
export type LessonSelectSymbol = {
  name: LessonScreen.SelectSymbol;
  symbols: ILetter[];
};

// Fifth screen
export type LessonSelectSequenceLetters = {
  name: LessonScreen.SelectSequenceLetters;
  sequence: ILetter[];
};

// Sixth screen
export type LessonBuildWord = {
  name: LessonScreen.BuildWord;
  sequence: ILetter[];
};

// Seventh screen
export type LessonFinish = {
  name: LessonScreen.Finish;
};

export type TextBlock = { text: string };
export type RulesBlock = { rules: string[] };
export type TableBlock = { table: string[][] };
export type LetterBlock = { id: string; kana: "hiragana" | "katakana" };
export type MathAnswerBlock = { pairs: string[][] };
export type SequenceBlock = { sequence: string[] };
export type SelectAnswerBlock = {
  answers: { title: string; isTrue: boolean }[];
};

export type AnyBlock =
  | TextBlock
  | TableBlock
  | RulesBlock
  | LetterBlock
  | MathAnswerBlock
  | SequenceBlock
  | SelectAnswerBlock;

export type InfoLessonScreen = {
  title: string;
  blocks: AnyBlock[];
};

export type AutoLesson = { 
  id: string;
  title: ILetter;
  letters: ILetter[];
  msg: string;

  kana?: KanaAlphabet
};

export type ManuallyLesson = {
  id: string;
  title: string;
  subTitle: string;
  infoTitle: string;
  infoSubTitle: string;
  icon: string;
  screens: (InfoLessonScreen | AnyLesson)[];
};
