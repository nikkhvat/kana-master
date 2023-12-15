import { ILetter } from "../../utils/letters";


export const shuffleArray = <T>(array: Array<T>): Array<T> => {
  let arrayCopy = array.slice();

  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
  }

  return arrayCopy;
}

export const areLettersEqual = (letter1: ILetter, letter2: ILetter): boolean => {
  return letter1.en === letter2.en && letter1.id === letter2.id;
}

export const getRandomLetter = (letters: ILetter[][]): ILetter => {
  const flatArray = letters.flat();

  if (flatArray.length === 0) {
    throw new Error("Array is empty");
  }

  const randomIndex = Math.floor(Math.random() * flatArray.length);

  return flatArray[randomIndex];
}

export const generateRandomLetters = (
  kana: ILetter[][], 
  { excludeLetter, limit }: {excludeLetter?: ILetter, limit: number}): ILetter[] => {

  const letters: ILetter[] = [];
  
  while (letters.length < limit) {
    const randomLetter = getRandomLetter(kana)
    
    
    // if (excludeLetter === undefined) {
    //   letters.push(randomLetter);
    // } else if (randomLetter?.en.toUpperCase().trim() !== excludeLetter?.en.toUpperCase().trim()) {
    //   letters.push(randomLetter);
    // }
    if (!letters.some(letter => letter.en.toUpperCase().trim() === randomLetter.en.toUpperCase().trim()) &&
      (!excludeLetter || randomLetter.en.toUpperCase().trim() !== excludeLetter.en.toUpperCase().trim())) {
      letters.push(randomLetter);
    }
  }

  return letters;
}