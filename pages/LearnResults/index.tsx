import React from "react";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import { Text, View, Button, TouchableOpacity, ScrollView } from "react-native";
import { styles } from "./styles";

import { StackNavigationProp } from "@react-navigation/stack";

type LearnResultsNavigationProp = StackNavigationProp<RootStackParamList, "LearnResults">;
type LearnScreenRouteProp = RouteProp<RootStackParamList, "LearnResults">;

interface LearnResultsScreenProps {
  route: LearnScreenRouteProp;
  navigation: LearnResultsNavigationProp;
}

function formatTime(ms: number): string {
  const minutes = +(Math.floor(ms / 60000).toFixed(0));
  const seconds = +(Math.floor((ms % 60000) / 1000).toFixed(0));
  const milliseconds = +(ms % 1000).toFixed();

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

function LearnResultsScreen({ route, navigation }: LearnResultsScreenProps) {
  const { stat, kata } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <Text style={styles.title}>Results</Text>

        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>Азбука:</Text>
          <Text style={styles.itemValue}>
            {kata === "ka" ? "Катакана" : "Хиригана"}
          </Text>
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>Общее время теста:</Text>
          <Text style={styles.itemValue}>{formatTime(stat.testDuration)}</Text>
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>Среднее время ответа:</Text>
          <Text style={styles.itemValue}>{formatTime(stat.averageTime)}</Text>
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>Правильных ответов:</Text>
          <Text style={styles.itemValue}>{stat.correctAnswers}</Text>
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>Неправильных ответов:</Text>
          <Text style={styles.itemValue}>{stat.incorrectAnswers}</Text>
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>Самый быстрый ответ:</Text>
          <Text style={styles.itemValue}>
            {`${stat.fastestAnswer.letter?.[kata]} ${stat.fastestAnswer.letter?.en}`}
            ) ({formatTime(stat.fastestAnswer.time)})
          </Text>
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>Самый медленный ответ:</Text>
          <Text style={styles.itemValue}>
            {`${stat.slowestAnswer.letter?.[kata]} ${stat.slowestAnswer.letter?.en}`}
            ) ({formatTime(stat.slowestAnswer.time)})
          </Text>
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>Неправильные иероглифы:</Text>
          <Text style={styles.itemValue}>
            {Array.from(new Set(stat.incorrectLetters))
              .map((letter) => `${letter.en}(${letter?.[kata]})`)
              .join(", ")}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.startTestBtn]}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Text style={styles.buttonText}>На главный экран</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default LearnResultsScreen;
