import { KanaAlphabet, QuestionTypeChooseWord } from "@/shared/constants/kana";
import { Word } from "@/shared/data/words";
import { shuffleArray } from "@/shared/helpers/letters";
import { getRandomWords } from "@/shared/helpers/words";
import { QuestionChoice } from "@/shared/types/questions";

interface GenerateChoiceAnswerProps {
  word: Word,
  kanaWords: Word[],
  hiraWords: Word[],
  
  kana: KanaAlphabet
}

const generateChoiceAnswer = ({ 
  word, 
  kanaWords, 
  hiraWords,
  kana,
}: GenerateChoiceAnswerProps): QuestionChoice => {
  const word1 = getRandomWords(
    [word.romanji],
    kana === KanaAlphabet.Hiragana ? hiraWords : kanaWords
  );
  const word2 = getRandomWords(
    [word.romanji, word1.romanji],
    kana === KanaAlphabet.Hiragana ? hiraWords : kanaWords
  );
  const word3 = getRandomWords(
    [word.romanji, word1.romanji, word2.romanji],
    kana === KanaAlphabet.Hiragana ? hiraWords : kanaWords
  );

  return {
    type: QuestionTypeChooseWord,
    word: word,
    title: `${word.kana} (${word.translate})`,
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