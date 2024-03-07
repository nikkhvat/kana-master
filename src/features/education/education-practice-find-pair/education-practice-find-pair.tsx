/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import FindPairItem from "@/entities/education/practice/find-pair/item/item";
import { useThemeContext } from "@/hooks/theme-context";
import { TEST_DELAY } from "@/shared/constants/kana";

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
        }, TEST_DELAY);
      }
      setSelectedPair(null);
    } else {
      setSelectedPair(pair);
    }
  };

  useEffect(() => {
    if (matchedPairs.length === pairs.length * 2) {
      setMatchedPairs([]);
      onCompleted?.(hasError);
    }
  }, [matchedPairs]);

  return (
    <View style={styles.container}>
      <Text style={[styles.question, {color: colors.color4}]}>{title}</Text>
      <View style={styles.pairs}>
        {pairs.map((pair) => (
          <View key={pair[0].id} style={styles.row}>
            <FindPairItem 
              isError={errorsPairs.includes(pair[0].id)}
              isSelect={pair[0].id === selectedPair?.id}
              isCorrect={isMatched(pair[0].id)}
              onPress={() => pick({ ...pair[0], index: 0 })}
            >
              {pair[0].title}
            </FindPairItem>
            <FindPairItem 
              isError={errorsPairs.includes(pair[1].id)}
              isSelect={pair[1].id === selectedPair?.id}
              isCorrect={isMatched(pair[1].id)}
              onPress={() => pick({ ...pair[1], index: 1 })}
            >
              {pair[1].title}
            </FindPairItem>
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
