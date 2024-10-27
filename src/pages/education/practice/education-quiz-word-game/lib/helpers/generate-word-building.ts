import { KanaAlphabet, QuestionTypeBuildingWord } from "@/shared/constants/kana";
import { ILetter } from "@/shared/data/lettersTable";
import { Word } from "@/shared/data/words";
import getKana from "@/shared/helpers/getKanaKey";
import { getRandomLetter } from "@/shared/helpers/letters";
import { QuestionWordBuilding } from "@/shared/types/questions";

interface GenerateWordBuildingProps {
  word: Word,
  kanaLetters: ILetter[],
  hiraLetters: ILetter[],

  lang: string
  
  selectKanaType: KanaAlphabet,
}

const generateWordBuilding = ({ 
  word, 
  kanaLetters, 
  hiraLetters,
  selectKanaType,
  lang
}: GenerateWordBuildingProps): QuestionWordBuilding => {
  const originalWord = word?.romanji;

  const originalSelect = word?.kana;

  const needToAddLength = 5 - originalWord.length;
  const shaffledLetters = originalSelect.split("");
  
  for (let i = 0; i < needToAddLength; i++) {
    const key = selectKanaType === KanaAlphabet.Hiragana ? "hi" : "ka";

    const randomLetter = getRandomLetter(key === "hi" ? [hiraLetters] : [kanaLetters]);

    if (randomLetter !== null) {
      shaffledLetters.push(getKana(randomLetter, selectKanaType));
    }
    continue;
  }

  return {
    type: QuestionTypeBuildingWord,
    originalWord: originalWord,
    buildingWord: originalSelect,
    translate: word[lang as "en"],
    selectKanaType,
  };
};

export default generateWordBuilding;