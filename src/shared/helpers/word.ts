import { Word } from "@/shared/data/words";


export const findWordsFromArray = (words: Word[], characters: string[]): Word[] => {

  const allCharacters = [
    ...characters,
    "っ",
    // 
    "ー",
    // 
    "ィ", "ェ", "ゥ", "ォ", "ァ",
    // 
    "ッ",
  ]
  

  return words.filter(word => {
    let chengedWord = word.kana.split("")

    for (let i = 0; i < chengedWord.length; i++) {
      if (chengedWord[i + 1] && ["ャ", "ュ", "ョ", "ゃ", "ゅ", "ょ"].includes(chengedWord[i + 1])) {
        chengedWord[i] += chengedWord[i + 1];
        chengedWord.splice(i + 1, 1);
        i--;
      }
    }
    
    for (const char of chengedWord) {
      if (!allCharacters.includes(char)) {
        return false;
      }
    }
    return true;
  });
};
