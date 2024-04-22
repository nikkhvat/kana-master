import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { RegistErrorProps } from "@/pages/education/practice/education-word-game/ui/education-practice";
import { TEST_DELAY } from "@/shared/constants/kana";
import { Word } from "@/shared/data/words";



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

  const [errors, setErrors] = useState([] as (string | number)[]);
  const [corrected, setCorrected] = useState(null as string | number | null);

  useEffect(() => {
    setErrors([]);
    setCorrected(null);
  }, [trueAnswer, answers]);

  const pick = (id: string) => {
    if (corrected !== null) return;

    if (errors.includes(id)) return;

    if (id !== trueAnswer) {
      setErrors((prev) => [...prev, id]);

      setTimeout(() => {
        onError?.({
          type: "choose-word",
          pair: [word?.romanji, word?.kana]
        });
      }, TEST_DELAY);
      return;
    }

    setCorrected(id);

    setTimeout(() => {
      onCompleted?.(errors.length !== 0);
    }, TEST_DELAY);
  };

  const isCorrectAnswer = (id: string): boolean => id === corrected;
  const isInCorrectAnswer = (id: string): boolean => errors.includes(id);
  
  const cardBorderColor = (id: string): string => {
    return isInCorrectAnswer(id) ? 
      colors.second_color1 
      : isCorrectAnswer(id) 
      ? colors.second_color2 : colors.color2;
  };
  
  const cardBackgroundColor = (id: string): string => {
    return isInCorrectAnswer(id) ? 
      colors.second_color1 
      : isCorrectAnswer(id) 
      ? colors.second_color2 : "transparent";
  };

  const cardColor = (id: string): string => {
    return (isInCorrectAnswer(id) || isCorrectAnswer(id)) ? colors.color5 : colors.color4;
  };

  return (
    <View style={styles.container}>
      {!hideTitle && <Text style={[styles.question, { color: colors.color4 }]}>
        {t("common.select")}
        {" "}
        {t("kana.romanji")?.toLowerCase()}
        {" "}
        {t("common.for")}
        {" "}
        {title}
      </Text>}

      <View style={styles.columns}>
        {answers.map((answer) => (
          <TouchableOpacity
            key={answer.key}
            style={[
              styles.item,
              {
                borderColor: cardBorderColor(answer.key),
                backgroundColor: cardBackgroundColor(answer.key),
              },
            ]}
            onPress={() => {
              pick?.(answer.key);
            }}
          >
            <Text style={[styles.text, { color: cardColor(answer.key)}]}>
              {answer.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
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
    marginTop: 35,
    marginBottom: 30,
    width: "100%",
    textAlign: "center",
  },
  columns: {
    height: 50,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
    width: "100%",
  },
  item: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    height: 50,
  },
  text: {
    fontSize: 17,
    fontWeight: "400",
  },
});

export default EducationPracticeChooseValue;
