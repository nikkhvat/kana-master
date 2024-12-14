import { KanaAlphabet, QuestionTypeFindPairWord } from "@/shared/constants/kana";
import { Word } from "@/shared/data/words";
import { getRandomWords } from "@/shared/helpers/words";
import { Maybe, QuestionFindPair } from "@/shared/types/questions";

interface GenerateFindThePairProps {
  word: Word,
  katakanaWords: Word[],
  hiraganaWords: Word[],

  lang: string
  
  kana: KanaAlphabet
}

const generateFindThePair = ({ 
  word, 
  katakanaWords, 
  hiraganaWords,
  kana,
  lang,
}: GenerateFindThePairProps): Maybe<QuestionFindPair> => {
  const words = kana === KanaAlphabet.Hiragana ? hiraganaWords : katakanaWords;

  if (words.length === 0) return null;

  const word1 = getRandomWords([word.romanji], words);
  const word2 = getRandomWords([word.romanji, word1.romanji], words);

  const kanaElements = [
    word?.kana,
    word1?.kana,
    word2?.kana,
  ];
  const romanjiElements = [
    `${word?.romanji} (${word[lang as "en"]})`,
    `${word1?.romanji} (${word1[lang as "en"]})`,
    `${word2?.romanji} (${word2[lang as "en"]})`,
  ];

  return {
    type: QuestionTypeFindPairWord,
    kana: kana,
    pairs: kanaElements.map((kana, index) => {
      return [
        { title: kana, id: kana },
        { title: romanjiElements[index], id: romanjiElements[index] },
      ];
    }),
    answers: [
      [word?.kana, word?.romanji],
      [word1?.kana, word1?.romanji],
      [word2?.kana, word2?.romanji],
    ],
  };
};

export default generateFindThePair;