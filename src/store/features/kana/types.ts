import { KanaSection } from "@/constants/kana";
import { ILetter } from "@/data/lettersTable";

export interface InitialState {
  selectedLettersHiragana: number
  selectedLettersKatakana: number
  selectedLetters: number,
  selected: {
    base: {
      katakana: Array<string>,
      hiragana: Array<string>,
    }
    dakuon: {
      katakana: Array<string>,
      hiragana: Array<string>,
    }
    handakuon: {
      katakana: Array<string>,
      hiragana: Array<string>,
    }
    yoon: {
      katakana: Array<string>,
      hiragana: Array<string>,
    }
  }
}

export interface toggleLetterAction {
  type: string
  payload: {
    letter: ILetter,
    alphabet: "base" | "dakuon" | "handakuon" | "yoon",
    kana: "katakana" | "hiragana"
  }
}

export interface toggleLettersAction {
  type: string
  payload: {
    letter: ILetter[],
    alphabet: "base" | "dakuon" | "handakuon" | "yoon",
    kana: "katakana" | "hiragana"
  }
}