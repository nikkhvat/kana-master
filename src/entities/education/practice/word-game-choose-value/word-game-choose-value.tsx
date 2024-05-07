import React, { useEffect, useMemo, useState } from "react";

import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { RegistErrorProps } from "@/pages/education/practice/education-word-game/ui/education-practice";
import { TEST_DELAY } from "@/shared/constants/kana";
import { Word } from "@/shared/data/words";
import SelectAnswer from "@/shared/ui/select-answer/select-answer";



interface EducationPracticeChooseValueProps {
  title: string;
  answers: { text: string; key: string }[];
  trueAnswer: string;
  word: Word;
  hideTitle?: boolean
  onCompleted?: (isError: boolean) => void;
  onError?: (data: RegistErrorProps) => void;
}

const EducationPracticeChooseValue: React.FC<EducationPracticeChooseValueProps> = ({
  title,
  answers = [],
  trueAnswer,
  word,
  hideTitle,
  onCompleted,
  onError,
}) => {
  const { t } = useTranslation();
  const { colors } = useThemeContext();

  const answersList = useMemo(() => answers.map(item => ({
    title: item.text,
    isTrue: item.text === trueAnswer
  })), [answers]);

  return (
    <View style={styles.container}>
      {!hideTitle && <Text style={[styles.question, { color: colors.color4, marginTop: 35 }]}>
        {t("practice.selectCorrectTransliteration")}
      </Text>}
      {!hideTitle && <Text style={[styles.question, { color: colors.color4, marginBottom: 40 }]}>
        {title}
      </Text>}

      <SelectAnswer 
        key={answersList.join()}
        answers={answersList}
        onError={() => {
          onError?.({
            type: "choose-word",
            pair: [word?.romanji, word?.kana]
          });
        }}
        onFinish={onCompleted}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
  },
  question: {
    fontSize: 17,
    fontWeight: "600",
    marginTop: 10,
    width: "100%",
    textAlign: "center",
  },
});

export default EducationPracticeChooseValue;
