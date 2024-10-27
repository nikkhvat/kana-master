import React from "react";

import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { KanaAlphabet } from "@/shared/constants/kana";
import { LessonSelectSymbol } from "@/shared/constants/lessons";
import getKana from "@/shared/helpers/getKanaKey";
import useGetRomanji from "@/shared/lib/i18n/hooks/useKey";
import SelectAnswer from "@/entities/education/select-answer/select-answer";
import { LearningTitle } from "../ui/title";

type SelectLettersScreenProps = LessonSelectSymbol & {
  next: () => void;
  kana: KanaAlphabet;
};

const SelectLettersScreen: React.FC<SelectLettersScreenProps> = ({
  symbols,
  kana,
  next,
}) => {
  const { t } = useTranslation();
  const { getRomanji } = useGetRomanji();

  const title = t("lesson.selectCorrectTransliteration", {
    syllable: getRomanji(symbols[0]),
  });

  const answers = symbols.map((item) => ({
    title: getKana(item, kana),
    isTrue: item.id === symbols[0].id,
  }));

  return (
    <View
      style={{
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <LearningTitle>{title}</LearningTitle>

      <SelectAnswer onFinish={next} answers={answers} />
    </View>
  );
};

export default SelectLettersScreen;
