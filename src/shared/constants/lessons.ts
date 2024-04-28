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
  msg: string
  screens: InfoLessonScreen[]
};

export const lessonIntro: ManuallyLesson = {
  type: "manually",
  id: "52aa8316-4669-41e6-98d3-2b3e42a943ff",
  title: "Introdution",
  msg: "Надпись интродукшен",
  screens: [
    {
      name: LessonScreen.Info,
      isActiveNext: true,
      title: "Знаешь ли ты ?",
      blocks: [
        { type: "text", text: "В японском языке есть два алфавита: хирагана и катакана, каждый из которых состоит из 46 букв." },
        { type: "text", text: "Хирагана употребляется для написания слов японского происхождения, а катакана - для написания заимствованных слов и иностранных имен." },
        { type: "text", text: "Есть также около 2000 часто используемых иероглифов (кандзи)." },
      ],
    },
    {
      name: LessonScreen.Info,
      isActiveNext: true,
      title: "Хирагана? Катакана? Кандзи?",
      blocks: [
        { type: "text", text: "И хирагана, и катакана обозначают звуки, а кандзи - значения." },
        {
          type: "table", table: [
            ["Романджи", "1", "2", "3", "4", "5"],
            ["Хиригана", "1", "2", "3", "4", "5"],
            ["Катакана", "1", "2", "3", "4", "5"],
          ]
        },
      ],
    },
    {
      name: LessonScreen.Info,
      isActiveNext: true,
      title: "Подсказка!",
      blocks: [
        { type: "text", text: "Давай изучим правила написания японских иероглифов!" },
        {
          type: "rules", rules: [
            "Пиши штрихи слева направо",
            "Пиши штрихи сверху вниз",
            "Пиши по часовой стрелке большинство кривых и окружностей"
          ]
        }
      ]
    },
    {
      name: LessonScreen.Info,
      isActiveNext: true,
      title: "Посмотри порядок штрихов.",
      blocks: [
        { type: "text", text: "Соблюдение правильного порядка штрихов помогает писать аккуратные символы." },
        { type: "letter", id: "a151eeeb-2537-463c-ae23-d484d1bcb835", kana: KanaAlphabet.Hiragana }
      ]
    },
    {
      name: LessonScreen.Info,
      title: "Посмотри порядок штрихов.",
      blocks: [
        { type: "text", text: "Выбери правильное правило письма на японском языке." },
        { type: "select-answer", answers: [
          { title: "справа налево", isTrue: false },
          { title: "снизу вверх", isTrue: false },
          { title: "слева направо", isTrue: true },
        ]}
      ]
    },
    {
      name: LessonScreen.Info,
      title: "Как писать строки?",
      isActiveNext: true,
      blocks: [
        { type: "text", text: "Теперь давай обратим внимание на то, как надо заканчивать штрихи." },
        { type: "text", text: "Для завершения штриха мы резко останавливаемся, делаем крючок или постепенно отводим кисть." },
      ]
    },
    {
      name: LessonScreen.Info,
      isActiveNext: false,
      isActiveFinish: true,
      title: "Завершение штриха.",
      blocks: [
        { type: "text", text: "Первый штрих заканчивается крючком, а второй - резко останавливается." },
        { type: "letter", id: "11017078-148a-4a44-b3f7-21d1df02d981", kana: KanaAlphabet.Hiragana }
      ]
    },
  ],
};

export const lessons: {
  base: (AutoLesson | ManuallyLesson)[],
} = {
  base: [
    lessonIntro,
    { type: "auto", id: "3a060caa-ac2f-42cb-a901-c19848e9d5c5", title: base[0][0], letters: base[0], msg: "lessonsList.firstLessonInSectionTitle" },
    { type: "auto", id: "2fa83f16-0848-49ea-a910-3e09dbd95de8", title: base[1][0], letters: base[1], msg: "lessonsList.continuingLessonsTitle" },
    { type: "auto", id: "17da3959-de2c-40e6-a1aa-8cbe5237f818", title: base[2][0], letters: base[2], msg: "lessonsList.continuingLessonsTitle" },
    { type: "auto", id: "f2b99593-28bb-43dd-9983-ea2668af30ab", title: base[3][0], letters: base[3], msg: "lessonsList.continuingLessonsTitle" },
    { type: "auto", id: "404f7e6c-864e-4ec0-8039-f3b59c6e611d", title: base[4][0], letters: base[4], msg: "lessonsList.continuingLessonsTitle" },
    { type: "auto", id: "dea61dc7-dfe3-41c0-890f-028cbf27bf3d", title: base[5][0], letters: base[5], msg: "lessonsList.continuingLessonsTitle" },
    { type: "auto", id: "75a8dbb6-7cfd-4e69-9ad7-20940884aabc", title: base[6][0], letters: [base[6], base[7]].flat(), msg: "lessonsList.continuingLessonsTitle" },
    { type: "auto", id: "83f0bc1e-f901-4b40-a6c6-501fb4726fb4", title: base[8][0], letters: base[8], msg: "lessonsList.continuingLessonsTitle" },
    { type: "auto", id: "608ce336-8437-47b7-942d-5f4e335ef9ba", title: base[9][0], letters: [base[9], base[10]].flat(), msg: "lessonsList.finalLessonInSectionTitle" },
  ],
};
