import React from "react";

import { useTranslation } from "react-i18next";
import { View } from "react-native";

import EducationPracticeFindPair from "@/entities/education/practice/word-game-find-pair/education-practice-find-pair";
import { KanaAlphabet } from "@/shared/constants/kana";
import { LessonMatchSymbols } from "@/shared/constants/lessons";
import getKana from "@/shared/helpers/getKanaKey";
import useGetRomanji from "@/shared/lib/i18n/hooks/useKey";
import { LearningTitle } from "../ui/title";

type LessonDrawScreenProps = LessonMatchSymbols & {
  next: () => void;
  kana: KanaAlphabet;
};

const MatchLettersScreen: React.FC<LessonDrawScreenProps> = ({
  symbols,
  kana,
  next,
}) => {
  const { t } = useTranslation();
  const { getRomanji } = useGetRomanji();

  const title =
    kana === KanaAlphabet.Hiragana
      ? t("lesson.matchHiraganaWithTransliteration")
      : t("lesson.matchKatakanaWithTransliteration");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <View>
        <LearningTitle>{title}</LearningTitle>

        <EducationPracticeFindPair
          hideTitle
          onCompleted={next}
          question={{
            type: "find-pair-word",
            pairs: symbols.map((item) => [
              { title: getKana(item, kana), id: getKana(item, kana) },
              { title: getRomanji(item), id: getRomanji(item) },
            ]),
            kana: kana,
            answers: symbols.map((item) => [
              getKana(item, kana),
              getRomanji(item),
            ]),
          }}
        />
      </View>
    </View>
  );
};

export default MatchLettersScreen;
