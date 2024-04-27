import { KanaAlphabet } from "../constants/kana";
import { ILetter } from "../data/lettersTable";

const getKana = (letter: ILetter, kana: KanaAlphabet) => {
  const key = kana === KanaAlphabet.Hiragana ? "hi" : "ka";

  return letter?.[key];
};

export default getKana;