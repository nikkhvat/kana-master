import React from "react";

import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { RegistrationErrorProps } from "@/pages/education/practice/education-quiz-word-game/lib/context/education-statistic-context";
import { KanaAlphabet } from "@/shared/constants/kana";
import { QuestionWordBuilding } from "@/shared/types/questions";
import Sequence from "@/entities/education/sequence";
import { Typography } from "@/shared/typography";


interface ChooseLettersProps {
  question: QuestionWordBuilding;
  hideTitle?: boolean

  onError?: (data: RegistrationErrorProps) => void;
  onFinish?: (hasError: boolean) => void;
}


const EducationPracticeChooseLetters: React.FC<ChooseLettersProps> = ({
  question,
  onFinish,
  onError,
  hideTitle
}) => {
  const { t } = useTranslation();
  const { colors } = useThemeContext();

  const {
    originalWord,
    buildingWord,
    translate,
    selectKanaType
  } = question;

  return (
    <View style={styles.container}>
      {!hideTitle && <Text style={[styles.question, { color: colors.TextPrimary, marginTop: 35 }]}>
        {selectKanaType === KanaAlphabet.Hiragana 
          ? t("practice.selectHiraganaForWord")
          : t("practice.selectKatakanaForWord")}
      </Text>}
      {!hideTitle && <Text style={[styles.question, { color: colors.TextPrimary, marginBottom: 40 }]}>
        {originalWord} ({translate})
      </Text>}

      <Sequence
        key={originalWord}
        onFinish={onFinish}
        onError={() => onError?.({
          type: "building-word",
          pair: [originalWord, buildingWord]
        })}
        sequence={buildingWord.split("")} 
      />
    </View>

  );
};

export default EducationPracticeChooseLetters;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    ...Typography.boldH4,
  },
  question: {
    marginTop: 10,
    width: "100%",
    textAlign: "center",
    ...Typography.boldH4,
  },
});
