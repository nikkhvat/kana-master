import { KanaAlphabet } from "@/shared/constants/kana";
import { ILetter } from "@/shared/data/lettersTable";
import { Word } from "@/shared/data/words";

export interface InitialState {
  selectedLettersHiragana: number;
  selectedLettersKatakana: number;
  selectedLetters: number;
  selected: {
    base: { katakana: Array<string>; hiragana: Array<string> };
    dakuon: { katakana: Array<string>; hiragana: Array<string> };
    handakuon: { katakana: Array<string>; hiragana: Array<string> };
    yoon: { katakana: Array<string>; hiragana: Array<string> };
  };
  selectedWords: { katakana: Word[]; hiragana: Word[] };
}

export interface toggleLetterAction {
  type: string;
  payload: {
    letter: ILetter;
    alphabet: "base" | "dakuon" | "handakuon" | "yoon";
    kana: KanaAlphabet.Hiragana | KanaAlphabet.Katakana;
  };
}

export interface toggleLettersAction {
  type: string;
  payload: {
    letter: ILetter[];
    alphabet: "base" | "dakuon" | "handakuon" | "yoon";
    kana: KanaAlphabet.Hiragana | KanaAlphabet.Katakana;
  };
}
