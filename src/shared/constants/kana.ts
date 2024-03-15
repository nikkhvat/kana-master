
export enum CardMode {
  hiraganaToKatakana = "hiragana_to_katakana",
  hiraganaToRomaji = "hiragana_to_romaji",
  romajiToHiragana = "romaji_to_hiragana",
  katakanaToHiragana = "katakana_to_hiragana",
  katakanaToRomaji = "katakana_to_romaji",
  romajiToKatakana = "romaji_to_katakana"
}

export enum TestMode {
  Choice = "choice",
  WordBuilding = "word_building",
  FindPair = "find_pair",
}

export enum DifficultyLevelType {
  TimeTest = "time_test",
  OneAttempt = "one_attempt",
}

export enum PracticeScreenMode {
  Testing = "testing",
  WordGame = "word_game"
}

export enum Kana {
  Hiragana = "Hiragana",
  Katakana = "Katakana",
  English = "English"
}

export enum KanaAlphabet {
  Hiragana = "Hiragana",
  Katakana = "Katakana",
}

export enum KanaSection {
  BasicHiragana = "BasicHiragana",
  BasicKatakana = "BasicKatakana",
  DakuonHiragana = "DakuonHiragana",
  DakuonKatakana = "DakuonKatakana",
  HandakuonHiragana = "HandakuonHiragana",
  HandakuonKatakana = "HandakuonKatakana",
  YoonHiragana = "YoonHiragana",
  YoonKatakana = "YoonKatakana",
}

export enum KanaMode {
  Basic = "Basic",
  Dakuon = "Dakuon",
  Handakuon = "Handakuon",
  Yoon = "Yoon",
}

export const LETTERS_COUNT = {
  [KanaSection.BasicHiragana]: 48,
  [KanaSection.BasicKatakana]: 48,

  [KanaSection.DakuonHiragana]: 20,
  [KanaSection.DakuonKatakana]: 20,

  [KanaSection.HandakuonHiragana]: 5,
  [KanaSection.HandakuonKatakana]: 5,

  [KanaSection.YoonHiragana]: 36,
  [KanaSection.YoonKatakana]: 36,
};

export const TEST_DELAY = 300;

export type Alphabet = "base" | "dakuon" | "handakuon" | "yoon"

export const QuestionTypeChooseLetter = "choose-letter";
export const QuestionTypeChooseWord = "choose-word";
export const QuestionTypeBuildingWord = "building-word";
export const QuestionTypeFindPairWord = "find-pair-word";