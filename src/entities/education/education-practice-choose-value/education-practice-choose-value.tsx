import React, { useEffect, useState } from "react";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { TEST_DELAY } from "@/shared/constants/kana";

interface EducationPracticeChooseValueProps {
  title: string;
  answers: { text: string; key: string }[];
  trueAnswer: string;
  onCompleted?: (isError: boolean) => void;
  onError?: (id: string) => void;
}

const EducationPracticeChooseValue: React.FC<EducationPracticeChooseValueProps> = ({
  title,
  answers = [],
  trueAnswer,
  onCompleted,
  onError,
}) => {
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
        onError?.(id);
      }, TEST_DELAY);
      return;
    }

    setCorrected(id);

    setTimeout(() => {
      onCompleted?.(errors.length === 0);
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
    return (isInCorrectAnswer(id) || isCorrectAnswer(id)) ? colors.color1 : colors.color4;
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.question, { color: colors.color4 }]}>{title}</Text>

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
            <Text style={[styles.text, { color: cardColor(answer.key)}]}>{answer.text}</Text>
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
