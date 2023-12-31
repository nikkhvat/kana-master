import { KanaSection } from "@/constants/kana";
import { ILetter } from "@/data/lettersTable";
import { Word } from "@/data/words";

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
  selectedWords: {
    katakana: Word[],
    hiragana: Word[],
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