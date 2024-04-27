import { ILetter, base, dakuon, handakuon, yoon } from "../data/lettersTable";

export enum LessonScreen {
  Symbol,
  Draw,
  MatchSymbols,
  SelectSymbol,
  SelectSequenceLetters,
  BuildWord,
  Finish
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

const firstMsg = "Learn to write the first {count} hiragana letters";
const msg = "Learn to write the next {count} hiragana letters";
const lastMsg = "Learn to write the last {count} hiragana letters";

export const lessons = {
  base: [
    { id: "3a060caa-ac2f-42cb-a901-c19848e9d5c5", title: base[0][0], letters: base[0], msg: firstMsg },
    { id: "2fa83f16-0848-49ea-a910-3e09dbd95de8", title: base[1][0], letters: base[1], msg: msg },
    { id: "17da3959-de2c-40e6-a1aa-8cbe5237f818", title: base[2][0], letters: base[2], msg: msg },
    { id: "f2b99593-28bb-43dd-9983-ea2668af30ab", title: base[3][0], letters: base[3], msg: msg },
    { id: "404f7e6c-864e-4ec0-8039-f3b59c6e611d", title: base[4][0], letters: base[4], msg: msg },
    { id: "dea61dc7-dfe3-41c0-890f-028cbf27bf3d", title: base[5][0], letters: base[5], msg: msg },
    { id: "75a8dbb6-7cfd-4e69-9ad7-20940884aabc", title: base[6][0], letters: [base[6], base[7]].flat(), msg: msg },
    { id: "83f0bc1e-f901-4b40-a6c6-501fb4726fb4", title: base[8][0], letters: base[8], msg: msg },
    { id: "608ce336-8437-47b7-942d-5f4e335ef9ba", title: base[9][0], letters: [base[9], base[10]].flat(), msg: lastMsg },
  ],
  dakuon: [
    { id: "019edc82-150d-4657-921b-9966b02ab243", title: dakuon[0][0], letters: dakuon[0], msg: firstMsg },    
    { id: "eed9d727-4ed9-4847-9814-a41704b10d9b", title: dakuon[1][0], letters: dakuon[1], msg: msg },    
    { id: "b664f984-b17a-4543-9fc6-a3b8e34349cb", title: dakuon[2][0], letters: dakuon[2], msg: msg },    
    { id: "cae560b8-36b1-4c3e-b775-ceab5cbd71df", title: dakuon[3][0], letters: dakuon[3], msg: msg },    
    { id: "95790d95-7f7c-448d-8d13-e87fee13a715", title: handakuon[0][0], letters: handakuon[0], msg: lastMsg },    
  ],
  yoon: [
    { id: "bda8fae8-ad69-414b-bc0d-e7b6947bd196", title: yoon[0][0], letters: [yoon[0], yoon[1]].flat(), msg: firstMsg },    
    { id: "b78114ca-b87d-47d3-af03-f1a05aad2779", title: yoon[2][0], letters: [yoon[2], yoon[3]].flat(), msg: msg },    
    { id: "8b3ff09f-5e72-457d-a3c3-3efb4ecb56ad", title: yoon[4][0], letters: [yoon[4], yoon[5]].flat(), msg: msg },    
    { id: "039da505-a31a-4de8-a0a3-3dec5c4fe951", title: yoon[6][0], letters: [yoon[6], yoon[7]].flat(), msg: msg },    
    { id: "99643e24-7ba5-4862-9aca-a5ec80062b2a", title: yoon[8][0], letters: [yoon[8], yoon[9]].flat(), msg: msg },    
    { id: "710ecccf-5ef5-4538-8060-52b6e6338ec3", title: yoon[10][0], letters: [yoon[10], yoon[11]].flat(), msg: firstMsg },
  ]
};
