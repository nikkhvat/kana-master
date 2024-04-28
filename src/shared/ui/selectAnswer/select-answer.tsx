import React, { useState } from "react";

import { Pressable, StyleSheet, Text, View } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";

type SelectAnswerProps = {
  answers: { title: string, isTrue: boolean }[]
  next?: () => void
}

const SelectAnswer: React.FC<SelectAnswerProps> = ({ answers, next }) => {
  const { colors } = useThemeContext();

  const [errors, setErrors] = useState<string[]>([]);
  
  const onAnswer = (answer: { title: string, isTrue: boolean }) => {
    if (answer.isTrue) {
      next?.();
    } else {
      setErrors(prev => [...prev, answer.title]);
    }
  };

  return (
    <View style={styles.answers} >
      {answers.map(answer => (
        <Pressable 
          onPress={() => onAnswer(answer)}
          style={[
            styles.question,
            { borderColor: colors.color2 },
            errors.includes(answer.title) ? { backgroundColor: colors.second_color1 } : {}
          ]}
          key={answer.title}
        >
          <Text style={[styles.text, { color: colors.color4 }]} >{answer.title}</Text>
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
    borderRadius: 12
  },
  text: {
    fontWeight: "400",
    fontSize: 15,
  }
});
