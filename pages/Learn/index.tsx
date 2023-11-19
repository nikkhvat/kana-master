import React, { useState, useCallback, useMemo, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import { styles } from "./styles";
import { getRandomElements, shuffleArray } from "../../utils/array";
import { ILetter } from "../../utils/letters";
import { StackNavigationProp } from "@react-navigation/stack";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Learn">;
type LearnScreenRouteProp = RouteProp<RootStackParamList, "Learn">;

interface LearnScreenProps {
  route: LearnScreenRouteProp
  navigation: HomeScreenNavigationProp
}

function LearnScreen({ route, navigation }: LearnScreenProps) {
  const { letters, kata, mode } = route.params;

  const [index, setIndex] = useState(0);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [testStartTime] = useState<number>(Date.now());
  const [totalTime, setTotalTime] = useState<number>(0);
  const [incorrectLetters, setIncorrectLetters] = useState<ILetter[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState<number>(0);
  const [fastestAnswer, setFastestAnswer] = useState<{
    time: number;
    letter: ILetter | null;
  }>({ time: Infinity, letter: null });
  const [slowestAnswer, setSlowestAnswer] = useState<{
    time: number;
    letter: ILetter | null;
  }>({ time: 0, letter: null });

  const answers = useMemo(
    () => shuffleArray(getRandomElements(letters, index)),
    [letters, index]
  );

  const handleAnswerPress = useCallback(
    (item: ILetter) => {
      const answerTime = Date.now() - startTime;
      setTotalTime((prev) => prev + answerTime);
      setStartTime(Date.now());

      if (letters[index].en === item.en) {
        setIndex((prev) => prev + 1);
        setCorrectAnswers((prev) => prev + 1);

        if (answerTime < fastestAnswer.time) {
          setFastestAnswer({ time: answerTime, letter: letters[index] });
        }

        if (answerTime > slowestAnswer.time) {
          setSlowestAnswer({ time: answerTime, letter: letters[index] });
        }
      } else {
        setIncorrectAnswers((prev) => prev + 1);
        setWarnings((prev) => [
          ...prev,
          `${item.en}:${item.ka}-${letters[index].en}`,
        ]);
        setIncorrectLetters((prev) => [...prev, letters[index]]);
      }
    },
    [letters, index, startTime, totalTime, fastestAnswer, slowestAnswer]
  );

  const isEndOfLetters = index === letters.length;

  const progress = (index / letters.length) * 100;

  useEffect(() => {
    if (isEndOfLetters) {
      const averageTime = totalTime / (correctAnswers + incorrectAnswers);
      const testDuration = Date.now() - testStartTime;

      console.log("=====================");
      console.log("Общее время теста:", testDuration, "мс");
      console.log("Количество правильных ответов:", correctAnswers);
      console.log("Количество неправильных ответов:", incorrectAnswers);
      console.log("Самый быстрый ответ:", fastestAnswer.letter?.en, "время:", fastestAnswer.time);
      console.log("Самый медленный ответ:", slowestAnswer.letter?.en, "время:", slowestAnswer.time);
      console.log("Среднее время ответа:", averageTime.toFixed(2), "мс");
      console.log("Неправильные иероглифы:", incorrectLetters.map((letter) => letter.en).join(", "));

      navigation.navigate("LearnResults", {
        stat: {
          testDuration,
          correctAnswers,
          incorrectAnswers,
          fastestAnswer,
          slowestAnswer,
          averageTime,
          incorrectLetters,
        },
        kata
      });
    }
  }, [
    isEndOfLetters,
    correctAnswers,
    incorrectAnswers,
    totalTime,
    fastestAnswer,
    slowestAnswer,
    incorrectLetters,
    testStartTime,
  ]);

  return (
    <View style={styles.container}>
      {!isEndOfLetters && (
        <>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${progress}%` }]} />
          </View>

          <Text style={styles.title}>
            {mode === 0 ? letters[index][kata] : letters[index].en}
          </Text>
          <View style={styles.buttons_container}>
            {answers.map((item) => (
              <TouchableOpacity
                key={`${item.en}-${item.ka}`}
                style={[
                  styles.button,
                  warnings.includes(
                    `${item.en}:${item.ka}-${letters[index].en}`
                  ) && styles.wrong_btn,
                ]}
                onPress={() => handleAnswerPress(item)}
              >
                <Text style={styles.buttonText}>
                  {mode === 0 ? item.en : item[kata]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
      {isEndOfLetters && <Text style={styles.title}>done.</Text>}
    </View>
  );
}

export default LearnScreen;
