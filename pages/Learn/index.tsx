import React, { useEffect, useState, useCallback, useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import { styles } from "./styles";
import { getRandomElements, shuffleArray } from "../../utils/array";
import { ILetter } from "../../utils/letters";

type LearnScreenRouteProp = RouteProp<RootStackParamList, "Learn">;

interface LearnScreenProps {
  route: LearnScreenRouteProp;
}

function LearnScreen({ route }: LearnScreenProps) {
  const { letters, kata } = route.params;
  const [mode, setMode] = useState(0);
  const [index, setIndex] = useState(0);
  const [warnings, setWarnings] = useState<string[]>([]);

  const answers = useMemo(
    () => shuffleArray(getRandomElements(letters, index)),
    [letters, index]
  );

  const handleAnswerPress = useCallback(
    (item: ILetter) => {
      if (letters[index].en === item.en) {
        setIndex((prev) => prev + 1);
      } else {
        setWarnings((prev) => [
          ...prev,
          `${item.en}:${item.ka}-${letters[index].en}`,
        ]);
      }
    },
    [letters, index]
  );

  const isEndOfLetters = index === letters.length;

  return (
    <View style={styles.container}>
      {!isEndOfLetters && (
        <>
          <View style={styles.buttons_container}>
            <TouchableOpacity
              style={[styles.button, mode === 0 && styles.button_mode_active]}
              onPress={() => setMode(0)}
            >
              <Text style={styles.buttonText}>Mode 1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, mode === 1 && styles.button_mode_active]}
              onPress={() => setMode(1)}
            >
              <Text style={styles.buttonText}>Mode 2</Text>
            </TouchableOpacity>
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
