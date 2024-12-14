import { ILetter } from "../data/lettersTable";
import { Word } from "../data/words";

import { CardMode, Kana, KanaAlphabet, QuestionTypeBuildingWord, QuestionTypeChooseLetter, QuestionTypeChooseWord, QuestionTypeFindPairWord } from "@/shared/constants/kana";

export type Maybe<T> = T | null;

export type Question = {
	type: typeof QuestionTypeChooseLetter;
	mode: CardMode;
	symbol: ILetter;
	kana: Kana;
	answers: ILetter[]
	trueAnswer: string;
};

export type QuestionChoice = {
	type: typeof QuestionTypeChooseWord;

	word: Word;
	title: string;
	questions: { text: string; key: string }[];
	trueKey: string;
};

export type QuestionWordBuilding = {
	type: typeof QuestionTypeBuildingWord;

	originalWord: string,
	buildingWord: string,
	translate: string,
	selectKanaType: KanaAlphabet,
};

export type QuestionFindPair = {
	type: typeof QuestionTypeFindPairWord;

	pairs: { title: string; id: string; }[][]
	kana: KanaAlphabet
	answers: string[][]
};

export type AnyQuestion = Question | QuestionChoice | QuestionWordBuilding | QuestionFindPair
export type AnyWordGameQuestion = QuestionChoice | QuestionWordBuilding | QuestionFindPair