import { KanaAlphabet, QuestionTypeChooseWord } from "@/shared/constants/kana";
import { Word } from "@/shared/data/words";
import { shuffleArray } from "@/shared/helpers/letters";
import { getRandomWords } from "@/shared/helpers/words";
import { Maybe, QuestionChoice } from "@/shared/types/questions";

interface GenerateChoiceAnswerProps {
  word: Word,
  kanaWords: Word[],
  hiraWords: Word[],

  lang: string
  
  kana: KanaAlphabet
}

const generateChoiceAnswer = ({ 
  word, 
  kanaWords, 
  hiraWords,
  kana,
  lang,
}: GenerateChoiceAnswerProps): Maybe<QuestionChoice> => {
  const words = kana === KanaAlphabet.Hiragana ? hiraWords : kanaWords;

  if (words.length === 0) return null;

  const word1 = getRandomWords([word.romanji], words);
  const word2 = getRandomWords([word.romanji, word1.romanji], words);
  const word3 = getRandomWords([word.romanji, word1.romanji, word2.romanji], words);

  return {
    type: QuestionTypeChooseWord,
    word: word,
    title: `${word.kana} (${word[lang as "en"]})`,
    questions: shuffleArray([
      { text: word.romanji, key: word.romanji },
      { text: word1.romanji, key: word1.romanji },
      { text: word2.romanji, key: word2.romanji },
      { text: word3.romanji, key: word3.romanji },
    ]),
    trueKey: word.romanji,
  };
};

export default generateChoiceAnswer;