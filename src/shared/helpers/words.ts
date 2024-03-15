import { generateRandomLetters, shuffleArray } from "./letters";

import { ILetter } from "@/shared/data/lettersTable";
import { Word } from "@/shared/data/words";

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

export const getAnswersWithRandom = (l: ILetter[][], letter: ILetter) => {
	return shuffleArray(
		[
			letter,
			...generateRandomLetters(l, {
				limit: 3,
				excludeLetter: letter,
			}),
		]
	);
};
