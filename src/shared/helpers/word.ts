import { Word } from "@/shared/data/words";


export const findWordsFromArray = (words: Word[], characters: string[]): Word[] => {
  console.log("CALL findWordsFromArray");
  
  return words.filter(word => {
    for (const char of word.kana) {
      if (!characters.includes(char)) {
        return false;
      }
    }
    return true;
  });
};
