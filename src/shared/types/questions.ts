import { ILetter } from "../data/lettersTable";
import { Word } from "../data/words";

import { CardMode, Kana, QuestionTypeBuildingWord, QuestionTypeChooseLetter, QuestionTypeChooseWord, QuestionTypeFindPairWord } from "@/shared/constants/kana";


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

	title: string;
	romanji: string;
	translate: string;
	kana: string;
	shuffle: string[];
};

export type QuestionFindPair = {
	type: typeof QuestionTypeFindPairWord;

	title: string
	pairs: { title: string; id: string; }[][]
	answers: string[][]
};

export type AnyQuestion = Question | QuestionChoice | QuestionWordBuilding | QuestionFindPair
export type AnyWordGameQuestion = QuestionChoice | QuestionWordBuilding | QuestionFindPair