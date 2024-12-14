import React, { useMemo } from "react";

import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { RegistrationErrorProps } from "@/pages/education/practice/education-quiz-word-game/ui/education-practice";
import { Word } from "@/shared/data/words";
import SelectAnswer from "@/entities/education/select-answer/select-answer";
import { Typography } from "@/shared/typography";
interface EducationPracticeChooseValueProps {
  title: string;
  answers: { text: string; key: string }[];
  trueAnswer: string;
  word: Word;
  hideTitle?: boolean
  onCompleted?: (isError: boolean) => void;
  onError?: (data: RegistrationErrorProps) => void;
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
      {!hideTitle && <Text style={[styles.question, Typography.boldH4, { color: colors.TextPrimary, marginTop: 35 }]}>
        {t("practice.selectCorrectTransliteration")}
      </Text>}
      {!hideTitle && <Text style={[styles.question, Typography.boldH4, { color: colors.TextPrimary, marginBottom: 40 }]}>
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
    marginTop: 10,
    width: "100%",
    textAlign: "center",
  },
});

export default EducationPracticeChooseValue;
