/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { useThemeContext } from "@/hooks/theme-context";

interface EducationPracticeFindPairProps {
  pairs: {
    title: string;
    id: number | string;
  }[][];
  answers: (string | number)[][];
  onCompleted?: (hasError: boolean) => void;
  onError?: () => void;
  title: string;
}

type Item = {
  title: string;
  id: number | string;
  index: number;
};

const EducationPracticeFindPair: React.FC<EducationPracticeFindPairProps> = ({
  pairs,
  answers,
  onCompleted,
  onError,
  title,
}) => {
  const { colors } = useThemeContext();

  const [hasError, setHasError] = useState(false);

  const [selectedPair, setSelectedPair] = useState(null as null | Item);
  const [matchedPairs, setMatchedPairs] = useState([] as any[]);

  const [errorsPairs, setErrorsPairs] = useState([] as any[]);

  const isCorrectPair = (pair1: Item, pair2: Item) => {
    return answers.some(
      (answer) => answer.includes(pair1.id) && answer.includes(pair2.id)
    );
  };

  const isMatched = (id: string | number) => {
    return matchedPairs.some((pair) => pair.includes(id));
  };

  const isAlreadyMatched = (pair: Item) => {
    return matchedPairs.includes(pair.id);
  };

  const pick = (pair: Item) => {
    if (pair.index === selectedPair?.index) {
      setSelectedPair(pair);
      return;
    }

    if (isAlreadyMatched(pair)) {
      return;
    }

    if (selectedPair && selectedPair.id !== pair.id) {
      if (isCorrectPair(selectedPair, pair)) {
        setMatchedPairs([...matchedPairs, selectedPair.id, pair.id]);
      } else {
        if (!hasError) setHasError(true);
        setErrorsPairs([selectedPair!.id, pair.id]);
        onError?.();
        setTimeout(() => {
          setErrorsPairs(() => []);
        }, 500);
      }
      setSelectedPair(null);
    } else {
      setSelectedPair(pair);
    }
  };

  useEffect(() => {
    if (matchedPairs.length === pairs.length * 2) {
      onCompleted?.(hasError);
    }
  }, [matchedPairs]);

  return (
    <View style={styles.container}>
      <Text style={[styles.question, {color: colors.color4}]}>{title}</Text>
      <View style={styles.pairs}>
        {pairs.map((pair, rowIndex) => (
          <View key={pair[0].id} style={styles.row}>
            {pair.map((item, colIndex) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.item,
                  {
                    borderColor: isCorrectPair(item as Item, pair[1 - colIndex] as Item)
                      ? colors.second_color2
                      : errorsPairs.includes(item.id)
                        ? colors.second_color1
                        : item.id === selectedPair?.id
                          ? colors.second_color2
                          : colors.color3,
                    backgroundColor: isCorrectPair(item as Item, pair[1 - colIndex] as Item)
                      ? colors.second_color2
                      : errorsPairs.includes(item.id)
                        ? colors.second_color1
                        : item.id === selectedPair?.id
                          ? "transparent"
                          : "transparent",
                  },
                ]}
                onPress={() => pick({ ...item, index: colIndex })}
              >
                <Text style={[styles.text, { color: colors.color4 }]}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
  },
  question: {
    fontSize: 17,
    fontWeight: "600",
    marginTop: 35,
    marginBottom: 30,
    width: "100%",
    textAlign: "center",
  },
  pairs: {
    flexDirection: "column",
    gap: 15,
  },
  row: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
    width: "100%",
  },
  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    height: 50,
  },
  text: {
    fontSize: 22,
  },
});

export default EducationPracticeFindPair;
