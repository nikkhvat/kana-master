export interface InitialState {
  rawStatistics: {
    hiragana: StatisticChapterRaw
    katakana: StatisticChapterRaw
  }
  statistics: {
    hiragana: StatisticChapter
    katakana: StatisticChapter
  }
  isEnabled: boolean
}

export interface StatisticChapterRaw {
  [key: string]: {
    values: number[]
  }
}

export interface StatisticChapter {
  [key: string]: {
    level: StatisticLevel
  }
}

export enum StatisticLevel {
  Green = "green",
  Yellow = "yellow",
  Red = "red",
}

export interface RecalculateAction {
  type: string
  payload: {
    data: {
      chapter: "hiragana" | "katakana"
      id: string
      isCorrect: boolean
    }[]
  }
}
