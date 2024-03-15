import React, { useEffect, useState } from "react";

import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import AnswerCard from "@/entities/education/practice/select-answer/answer-card/answer-card";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { TEST_DELAY } from "@/shared/constants/kana";

interface EducationPracticeSelectAnswersProps {
  answers: {
    title: string;
    id: string;
  }[];
  trueAnswer: string | number;
  onError?: (id: number | string) => void;
  onCompleted?: (isErrors: boolean) => void;
}

const EducationPracticeSelectAnswers: React.FC<EducationPracticeSelectAnswersProps> = ({ 
  answers, 
  trueAnswer, 
  onError, 
  onCompleted 
}) => {
  const screenWidth = Dimensions.get("window").width;

  const [errors, setErrors] = useState([] as (string | number)[]);
  const [corrected, setCorrected] = useState(null as string | number | null);
  
  useEffect(() => {
    setErrors([]);
    setCorrected(null);
  }, [trueAnswer, answers]);
  
  const pick = (id: number | string) => {
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

  const widthCard = (screenWidth - (20 * 2) - 15) / 2;

  return (
    <View style={styles.container}>
      {answers.map(answer => (
        <AnswerCard 
          key={answer.id}
          value={answer.id}
          width={widthCard}
          redMarked={isInCorrectAnswer(answer.id)}
          greenMarked={isCorrectAnswer(answer.id)}
          onClick={pick}
        >
          {answer.title}
        </AnswerCard>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15
  }
});


export default EducationPracticeSelectAnswers;
