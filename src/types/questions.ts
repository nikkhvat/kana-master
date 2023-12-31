import { Kana, QuestionTypeBuildingWord, QuestionTypeChooseLetter, QuestionTypeChooseWord, QuestionTypeFindPairWord } from "@/constants/kana";

export type Question = {
	type: typeof QuestionTypeChooseLetter;
	symbol: string;
	kana: Kana;
	answers: { title: string; id: string; }[];
	trueAnswer: string;
};

export type QuestionChoice = {
	type: typeof QuestionTypeChooseWord;

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