import React, { useEffect, useState } from "react";

import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useThemeContext } from "@/hooks/theme-context";
import { TEST_DELAY } from "@/shared/constants/kana";

interface EducationPracticeSelectAnswersProps {
  answers: {
    title: string;
    id: number | string;
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

  const { colors } = useThemeContext();

  const [errors, setErrors] = useState([] as (string | number)[]);
  const [corrected, setCorrected] = useState(null as string | number | null);
  
  useEffect(() => {
    setErrors([]);
    setCorrected(null);
  }, [trueAnswer, answers]);
  
  if (answers.length !== 4) return <Text>Answers to be 4</Text>;

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

  const getStatus = (id: string | number) => {
    if (errors.includes(id)) return "red";
    else if (corrected === id) return "green";
    else return "transparent";
  };

  const widthCard = (screenWidth - (20 * 2)) / 2;



  return (
    <View style={{ flexDirection: "column", gap: 15 }}>
      <View style={{ flexDirection: "row", gap: 15 }}>
        <TouchableOpacity
          style={[
            styles.answersItem,
            { width: widthCard, height: widthCard },
            { borderColor: getStatus(answers[0].id) === "green" ? "#7ABC71" : getStatus(answers[0].id) === "red" ? "#EF625D" : colors.color2 },
            { backgroundColor: getStatus(answers[0].id) === "green" ? "#7ABC71" : getStatus(answers[0].id) === "red" ? "#EF625D" : colors.color2 },
          ]}
          onPress={() => pick(answers[0].id)}
        >
          <Text
            style={[
              styles.answersItemText,
              { color: getStatus(answers[0].id) === "transparent" ? colors.color4 : colors.color5 },
            ]}
          >
            {answers[0].title}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.answersItem,
            { width: widthCard, height: widthCard },
            { borderColor: getStatus(answers[1].id) === "green" ? "#7ABC71" : getStatus(answers[1].id) === "red" ? "#EF625D" : colors.color2 },
            { backgroundColor: getStatus(answers[1].id) === "green" ? "#7ABC71" : getStatus(answers[1].id) === "red" ? "#EF625D" : colors.color2 },
          ]}
          onPress={() => pick(answers[1].id)}
        >
          <Text
            style={[
              styles.answersItemText,
              { color: getStatus(answers[1].id) === "transparent" ? colors.color4 : colors.color5 },
            ]}
          >
            {answers[1].title}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row", gap: 15 }}>
        <TouchableOpacity
          style={[
            styles.answersItem,
            { width: widthCard, height: widthCard },
            { borderColor: getStatus(answers[2].id) === "green" ? "#7ABC71" : getStatus(answers[2].id) === "red" ? "#EF625D" : colors.color2 },
            { backgroundColor: getStatus(answers[2].id) === "green" ? "#7ABC71" : getStatus(answers[2].id) === "red" ? "#EF625D" : colors.color2 },
          ]}
          onPress={() => pick(answers[2].id)}
        >
          <Text
            style={[
              styles.answersItemText,
              { color: getStatus(answers[2].id) === "transparent" ? colors.color4 : colors.color5 },
            ]}
          >
            {answers[2].title}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.answersItem,
            { width: widthCard, height: widthCard },
            { borderColor: getStatus(answers[3].id) === "green" ? "#7ABC71" : getStatus(answers[3].id) === "red" ? "#EF625D" : colors.color2 },
            { backgroundColor: getStatus(answers[3].id) === "green" ? "#7ABC71" : getStatus(answers[3].id) === "red" ? "#EF625D" : colors.color2 },
          ]}
          onPress={() => pick(answers[3].id)}
        >
          <Text
            style={[
              styles.answersItemText,
              { color: getStatus(answers[3].id) === "transparent" ? colors.color4 : colors.color5 },
            ]}
          >
            {answers[3].title}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  answersItem: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
  },
  answersItemText: {
    fontSize: 22,
  },
});


export default EducationPracticeSelectAnswers;
