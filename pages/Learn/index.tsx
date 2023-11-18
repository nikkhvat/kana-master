import React, { useState, useCallback, useMemo } from "react";
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
  const { letters, kata, mode } = route.params;

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
