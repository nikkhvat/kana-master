import { KanaAlphabet, QuestionTypeChooseWord } from "@/shared/constants/kana";
import { Word } from "@/shared/data/words";
import { shuffleArray } from "@/shared/helpers/letters";
import { getRandomWords } from "@/shared/helpers/words";
import { Maybe, QuestionChoice } from "@/shared/types/questions";

interface GenerateChoiceAnswerProps {
  word: Word,
  katakanaWords: Word[],
  hiraganaWords: Word[],

  lang: "en" | "ru"
  
  kana: KanaAlphabet
}

const generateChoiceAnswer = ({ 
  word, 
  katakanaWords, 
  hiraganaWords,
  kana,
  lang,
}: GenerateChoiceAnswerProps): Maybe<QuestionChoice> => {
  const words = kana === KanaAlphabet.Hiragana ? hiraganaWords : katakanaWords;

  if (words.length === 0) return null;

  const wordSecond = getRandomWords([word.romanji], words);
  const wordThird = getRandomWords([word.romanji, wordSecond.romanji], words);
  const wordFourth = getRandomWords([word.romanji, wordSecond.romanji, wordThird.romanji], words);

  return {
    type: QuestionTypeChooseWord,
    word: word,
    title: `${word.kana} (${word[lang as "en"]})`,
    questions: shuffleArray([
      { text: word.romanji, key: word.romanji },
      { text: wordSecond.romanji, key: wordSecond.romanji },
      { text: wordThird.romanji, key: wordThird.romanji },
      { text: wordFourth.romanji, key: wordFourth.romanji },
    ]),
    trueKey: word.romanji,
  };
};

export default generateChoiceAnswer;