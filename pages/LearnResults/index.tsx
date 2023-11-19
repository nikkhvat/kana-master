import React from "react";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import { Text, View } from "react-native";
import { styles } from "./styles";
type LearnScreenRouteProp = RouteProp<RootStackParamList, "LearnResults">;

interface LearnResultsScreenProps {
  route: LearnScreenRouteProp;
}

function LearnResultsScreen({ route }: LearnResultsScreenProps) {
  const { stat, kata } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Results</Text>
      <Text style={styles.item}>
        Общее время теста: {(stat.testDuration / 1000).toFixed(2)} секунд
      </Text>
      <Text style={styles.item}>
        Среднее время ответа: {stat.averageTime.toFixed(2)} мс
      </Text>
      <Text style={styles.item}>
        Количество правильных ответов: {stat.correctAnswers}
      </Text>
      <Text style={styles.item}>
        Количество неправильных ответов: {stat.incorrectAnswers}
      </Text>
      <Text style={styles.item}>
        Самый быстрый ответ: (
        {`${stat.fastestAnswer.letter?.[kata]} ${stat.fastestAnswer.letter?.en}`}
        ) время: {stat.fastestAnswer.time} мс
      </Text>
      <Text style={styles.item}>
        Самый медленный ответ: (
        {`${stat.slowestAnswer.letter?.[kata]} ${stat.slowestAnswer.letter?.en}`}
        ) время: {stat.slowestAnswer.time} мс
      </Text>
      <Text style={styles.item}>Неправильные иероглифы:</Text>
      <Text style={styles.item_letters}>
        {Array.from(new Set(stat.incorrectLetters))
          .map((letter) => `${letter.en}(${letter?.[kata]})`)
          .join(", ")}
      </Text>
    </View>
  );
}

export default LearnResultsScreen;