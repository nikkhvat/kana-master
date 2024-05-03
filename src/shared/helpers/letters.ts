import { ILetter } from "@/shared/data/lettersTable";

export const shuffleArray = <T>(array: Array<T>): Array<T> => {
  const arrayCopy = array.slice();

  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
  }

  return arrayCopy;
};

export const shufflePairs = <T>(array: Array<T>[]): Array<T>[] => {
  const arrayCopy = array.slice();

  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayCopy[i][1], arrayCopy[j][1]] = [arrayCopy[j][1], arrayCopy[i][1]];
  }

  return arrayCopy;
};

export const isInclude = (
  errorsPairs: Array<string | number>,
  id: string | number,
) => {
  for (let i = 0; i < errorsPairs.length; i++) {
    const element = errorsPairs[i];

    if (element === id) return true;
  }

  return false;
};

export const isCorrectPair = (
  leftPair: string,
  rigthPair: string,
  pairs: string[][],
) => {
  const cond = pairs.some((pair) => {
    const condLeft = pair[0] === leftPair || pair[1] === leftPair;
    const condRight = pair[0] === rigthPair || pair[1] === rigthPair;
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

export const getColumn = (rows: ILetter[][], columnId: number): ILetter[] => {
  const array: ILetter[] = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const item = row[columnId];

    array.push(item);
  }

  return array;
};

export const getRow = (rows: ILetter[][], rowId: number): ILetter[] => {
  const array: ILetter[] = [];

  for (let i = 0; i < rows[rowId].length; i++) {
    const item = rows[rowId][i];

    array.push(item);
  }

  return array;
};

export const selectedLetters = (
  rows: ILetter[][],
  selected: { rows: number[]; cols: number[] },
): ILetter[] => {
  const array: ILetter[] = [];

  for (let i = 0; i < selected.cols.length; i++) {
    const element = selected.cols[i];
    array.push(...getColumn(rows, element));
  }

  for (let i = 0; i < selected.rows.length; i++) {
    const element = selected.rows[i];
    array.push(...getRow(rows, element));
  }

  const uniqueItems = new Map();
  array.forEach((item) => {
    if (!uniqueItems.has(item.id)) {
      uniqueItems.set(item.id, item);
    }
  });

  return Array.from(uniqueItems.values());
};
