
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
  Write = "write",
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
  [KanaSection.BasicHiragana]: 46,
  [KanaSection.BasicKatakana]: 46,

  [KanaSection.DakuonHiragana]: 20,
  [KanaSection.DakuonKatakana]: 20,

  [KanaSection.HandakuonHiragana]: 5,
  [KanaSection.HandakuonKatakana]: 5,

  [KanaSection.YoonHiragana]: 21,
  [KanaSection.YoonKatakana]: 21,
};

export const HIRA_SECTIONS = [KanaSection.BasicHiragana, KanaSection.DakuonHiragana, KanaSection.HandakuonHiragana, KanaSection.YoonHiragana];
export const KATA_SECTIONS = [KanaSection.BasicKatakana, KanaSection.DakuonKatakana, KanaSection.HandakuonKatakana, KanaSection.YoonKatakana];
export const BASIC_SECTIONS = [KanaSection.BasicHiragana, KanaSection.BasicKatakana];
export const DAKUON_SECTIONS = [KanaSection.DakuonHiragana, KanaSection.DakuonKatakana];
export const HANDAKUON_SECTIONS = [KanaSection.HandakuonHiragana, KanaSection.HandakuonKatakana];
export const YOON_SECTIONS = [KanaSection.YoonHiragana, KanaSection.YoonKatakana];

export const TEST_DELAY = 100;

export type Alphabet = "base" | "dakuon" | "handakuon" | "yoon"