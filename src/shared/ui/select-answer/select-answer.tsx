import React, { useEffect, useMemo, useState } from "react";

import { Pressable, StyleSheet, Text, View } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { TEST_DELAY } from "@/shared/constants/kana";
import { shuffleArray } from "@/shared/helpers/letters";

type SelectAnswerProps = {
  answers: { title: string; isTrue: boolean }[];
  onError?: () => void;
  onFinish?: (hasError: boolean) => void;
};

const SelectAnswer: React.FC<SelectAnswerProps> = ({ answers, onError, onFinish }) => {
  const { colors } = useThemeContext();

  const shuffleAnswers = useMemo(() => shuffleArray(answers), [answers]);

  const [errors, setErrors] = useState<string[]>([]);
  const [correct, setCorrect] = useState<string[]>([]);

  const onAnswer = (answer: { title: string; isTrue: boolean }) => {
    if (answer.isTrue) {
      setCorrect((prev) => [...prev, answer.title]);

      setTimeout(() => {
        onFinish?.(Boolean(errors.length));
      }, TEST_DELAY);
    } else {
      setErrors((prev) => [...prev, answer.title]);
      setTimeout(() => {
        onError?.();
      }, TEST_DELAY);
    }
  };

  useEffect(() => {
    return () => {
      setErrors([]);
      setCorrect([]);
    };
  }, [answers]);

  return (
    <View style={styles.answers}>
      {shuffleAnswers.map((answer) => (
        <Pressable
          onPress={() => onAnswer(answer)}
          style={[
            styles.question,
            { borderColor: colors.color2 },
            errors.includes(answer.title) && {
              backgroundColor: colors.second_color1,
            },
            correct.includes(answer.title) && {
              backgroundColor: colors.second_color2,
            },
          ]}
          key={answer.title}
        >
          <Text style={[styles.text, { color: colors.color4 }]}>
            {answer.title}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default SelectAnswer;

const styles = StyleSheet.create({
  answers: {
    width: "100%",
    flexDirection: "column",
    borderRadius: 12,
    marginTop: 15,
    gap: 15,
  },
  question: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 14,
    paddingBottom: 14,
    borderWidth: 1,
    borderRadius: 12,
  },
  text: {
    fontWeight: "400",
    fontSize: 15,
  },
});
