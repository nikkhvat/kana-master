
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

export const TEST_DELAY = 0