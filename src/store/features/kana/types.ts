import { KanaSection } from '../../../constants/kana';

export interface InitialState {
  kanaSections: KanaSection[]
  selectedLettersHiragana: number
  selectedLettersKatakana: number
  selectedLetters: number
}
