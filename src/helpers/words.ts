import { generateRandomLetters, shuffleArray } from "./letters";

import { Kana } from "@/constants/kana";
import { ILetter } from "@/data/lettersTable";
import { Word } from "@/data/words";

export const getRandomWords = (
	excludedWords: string[],
	allWords: Word[]
): Word => {
	const availableWords = allWords.filter(
		(word) => !excludedWords.includes(word.romanji)
	);

	const randomIndex = Math.floor(Math.random() * availableWords.length);
	return availableWords[randomIndex];
};

export const getAnswers = (l: ILetter[][], letter: ILetter, kana?: Kana) => {
	return shuffleArray(
		[
			letter,
			...generateRandomLetters(l, {
				limit: 3,
				excludeLetter: letter,
			}),
		].map(({ ka, hi, en, id }) => ({
			title: kana === Kana.Hiragana ? hi : kana === Kana.Katakana ? ka : en,
			id: id,
		}))
	);
};
