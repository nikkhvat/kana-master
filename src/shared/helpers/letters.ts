import { ILetter } from "@/shared/data/lettersTable";

export const shuffleArray = <T>(array: Array<T>): Array<T> => {
  const arrayCopy = array.slice();

  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
  }

  return arrayCopy;
};

export const isCorrectPair = (
  leftPair: string,
  rightPair: string,
  pairs: string[][],
) => {
  const cond = pairs.some((pair) => {
    const condLeft = pair[0] === leftPair || pair[1] === leftPair;
    const condRight = pair[0] === rightPair || pair[1] === rightPair;
    return condLeft && condRight;
  });
  return cond;
};

export const areLettersEqual = (letter1: ILetter, letter2: ILetter) =>
  letter1.id === letter2.id;

export const getRandomLetter = (letters: ILetter[][]): ILetter | null => {
  const flatArray = letters.flat();

  if (flatArray.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * flatArray.length);

  return flatArray[randomIndex];
};

export const generateRandomLetters = (
  kana: ILetter[][],
  { excludeLetter, limit }: { excludeLetter?: ILetter; limit: number },
): ILetter[] => {
  const letters: ILetter[] = [];

  while (letters.length < limit) {
    const randomLetter = getRandomLetter(kana);

    if (randomLetter === null) return letters;

    if (
      !letters.some(
        (letter) =>
          letter.transliterations[0].toUpperCase().trim() ===
          randomLetter.transliterations[0].toUpperCase().trim(),
      ) &&
      (!excludeLetter ||
        randomLetter.transliterations[0].toUpperCase().trim() !==
          excludeLetter.transliterations[0].toUpperCase().trim())
    ) {
      letters.push(randomLetter);
    }
  }

  return letters;
};