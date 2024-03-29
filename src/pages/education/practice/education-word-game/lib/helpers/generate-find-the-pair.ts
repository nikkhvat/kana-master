import { KanaAlphabet, QuestionTypeFindPairWord } from "@/shared/constants/kana";
import { Word } from "@/shared/data/words";
import { getRandomWords } from "@/shared/helpers/words";
import { Maybe, QuestionFindPair } from "@/shared/types/questions";

interface GenerateFindThePairProps {
  word: Word,
  kanaWords: Word[],
  hiraWords: Word[],
  
  kana: KanaAlphabet
}

const generateFindThePair = ({ 
  word, 
  kanaWords, 
  hiraWords,
  kana,
}: GenerateFindThePairProps): Maybe<QuestionFindPair> => {
  const words = kana === KanaAlphabet.Hiragana ? hiraWords : kanaWords;

  if (words.length === 0) return null;

  const word1 = getRandomWords([word.romanji], words);
  const word2 = getRandomWords([word.romanji, word1.romanji], words);
  const word3 = getRandomWords([word.romanji, word1.romanji, word2.romanji], words);

  const kanaElements = [
    word?.kana,
    word1?.kana,
    word2?.kana,
    word3?.kana,
  ];
  const romanjiElements = [
    word?.romanji,
    word1?.romanji,
    word2?.romanji,
    word3?.romanji,
  ];

  kanaElements.sort(() => Math.random() - 0.5);
  romanjiElements.sort(() => Math.random() - 0.5);

  const shuffledPairs = kanaElements.map((kana, index) => {
    return [
      { title: kana, id: kana },
      { title: romanjiElements[index], id: romanjiElements[index] },
    ];
  });

  return {
    type: QuestionTypeFindPairWord,
    kana: kana,
    pairs: shuffledPairs,
    answers: [
      [word?.kana, word?.romanji],
      [word1?.kana, word1?.romanji],
      [word2?.kana, word2?.romanji],
      [word3?.kana, word3?.romanji],
    ],
  };
};

export default generateFindThePair;