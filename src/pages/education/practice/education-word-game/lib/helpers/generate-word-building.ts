import { KanaAlphabet, QuestionTypeBuildingWord, WordBuildingType } from "@/shared/constants/kana";
import { ILetter } from "@/shared/data/lettersTable";
import { Word } from "@/shared/data/words";
import { getRandomLetter, shuffleArray } from "@/shared/helpers/letters";
import { QuestionWordBuilding } from "@/shared/types/questions";

interface GenerateWordBuildingProps {
  word: Word,
  kanaLetters: ILetter[],
  hiraLetters: ILetter[],
  
  selectKana: WordBuildingType,
  selectKanaType: KanaAlphabet,
}

const generateWordBuilding = ({ 
  word, 
  kanaLetters, 
  hiraLetters,
  selectKana,
  selectKanaType,
}: GenerateWordBuildingProps): QuestionWordBuilding => {
  const originalWord = selectKana === WordBuildingType.Romanji
    ? word?.kana
    : word?.romanji;
  const originalSelect = selectKana === WordBuildingType.Romanji
    ? word?.romanji
    : word?.kana;

  const needToAddLength = 5 - originalWord.length;
  const shaffledLetters = originalSelect.split("");
  
  for (let i = 0; i < needToAddLength; i++) {
    if (selectKana === WordBuildingType.Romanji) {
      const randomLetter = getRandomLetter([
        selectKanaType === KanaAlphabet.Hiragana 
          ? hiraLetters 
          : kanaLetters]);

      if (randomLetter !== null) shaffledLetters.push(randomLetter?.en[0]);
      continue;
    } else {
      const key = selectKanaType === KanaAlphabet.Hiragana ? "hi" : "ka";
      const randomLetter = getRandomLetter(key === "hi" ? [hiraLetters] : [kanaLetters]);
      if (randomLetter !== null) shaffledLetters.push(randomLetter?.[key]);
      continue;
    }
  }

  return {
    type: QuestionTypeBuildingWord,
    title: originalWord,
    buildingWord: originalSelect,
    shaffledLetters: shuffleArray(shaffledLetters),
    translate: word.translate,
    selectKana,
    selectKanaType,
  };
};

export default generateWordBuilding;