import React from "react";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import { Text, View } from "react-native";
import { styles } from "./styles";

type LearnScreenRouteProp = RouteProp<RootStackParamList, "LearnResults">;

interface LearnResultsScreenProps {
  route: LearnScreenRouteProp;
}

function formatTime(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = ms % 1000;

  let formattedTime = "";

  if (minutes > 0) {
    formattedTime += `${minutes} мин. `;
  }

  if (seconds > 0 || minutes > 0) {
    formattedTime += `${seconds} сек. `;
  }

  if (milliseconds > 0 && minutes === 0) {
    formattedTime += `${milliseconds} мс`;
  }

  return formattedTime.trim();
}

function LearnResultsScreen({ route }: LearnResultsScreenProps) {
  const { stat, kata } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Results ({kata === "ka" ? "Катакана" : "Хиригана"})
      </Text>
      <Text style={styles.item}>
        Общее время теста: {formatTime(stat.testDuration)}
      </Text>
      <Text style={styles.item}>
        Среднее время ответа: {formatTime(stat.averageTime)}
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
        ) время: {formatTime(stat.fastestAnswer.time)}
      </Text>
      <Text style={styles.item}>
        Самый медленный ответ: (
        {`${stat.slowestAnswer.letter?.[kata]} ${stat.slowestAnswer.letter?.en}`}
        ) время: {formatTime(stat.slowestAnswer.time)}
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
