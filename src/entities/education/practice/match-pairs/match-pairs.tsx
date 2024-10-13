import React, { useEffect, useMemo, useState } from "react";

import { Pressable, StyleSheet, Text, View } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { TEST_DELAY } from "@/shared/constants/kana";
import { isCorrectPair } from "@/shared/helpers/letters";

function toShuffledPairs(pairs: string[][]): string[][] {
  const left = pairs.map((pair) => pair[0]);
  const right = pairs.map((pair) => pair[1]);

  shuffleArray(right);

  const shuffledPairs = left.map((item, index) => [item, right[index]]);

  return shuffledPairs;
}

function shuffleArray<T>(array: T[]): T[] {
  let currentIndex = array.length;
  let temporaryValue: T;
  let randomIndex: number;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

type MatchPairsProps = {
  pairs: string[][];
  onError?: (pair: string[]) => void;
  onComplete?: (hasError: boolean) => void;
};

type SelectedPair = {
  item: string;
  index: number;
  side: "left" | "right";
};

type Status = {
  [key: string]: {
    status: "selected" | "complete" | "error" | "";
    side: "left" | "right";
  };
};

const MatchPairs: React.FC<MatchPairsProps> = ({
  pairs,
  onError,
  onComplete,
}) => {
  const { colors } = useThemeContext();
  const [selectedPair, setSelectedPair] = useState<SelectedPair | null>(null);
  const [hasError, setHasError] = useState(false);
  const [status, setStatus] = useState<Status>({});

  const pairItemColors = {
    borderColor: colors.color2,
  };
  const textColors = {
    color: colors.color4,
  };

  const mixedPairs: string[][] = useMemo(() => toShuffledPairs(pairs), [pairs]);

  const handlePress = (item: string, index: number, idx: number) => {
    const side = idx === 0 ? "left" : "right";

    if (status[`${index}/${side}`]?.status === "complete") return;

    if (selectedPair === null) {
      setSelectedPair({ item, index, side });
      setStatus((prev) => ({
        ...prev,
        [`${index}/${side}`]: { status: "selected", side: side },
      }));
    } else if (
      (selectedPair.side === "left" && side === "left") ||
      (selectedPair.side === "right" && side === "right")
    ) {
      setStatus((prev) => ({
        ...prev,
        [`${selectedPair.index}/${selectedPair.side}`]: {
          status: "",
          side: selectedPair.side,
        },
        [`${index}/${side}`]: { status: "selected", side: side },
      }));
      setSelectedPair({ item, index, side });
    } else {
      const isCorrect = isCorrectPair(selectedPair.item, item, pairs);

      if (isCorrect) {
        setStatus((prev) => ({
          ...prev,
          [`${selectedPair.index}/${selectedPair.side}`]: {
            status: "complete",
            side: selectedPair.side,
          },
        }));
        setStatus((prev) => ({
          ...prev,
          [`${index}/${side}`]: { status: "complete", side },
        }));
      } else {
        setStatus((prev) => ({
          ...prev,
          [`${index}/${side}`]: { status: "error", side },
          [`${selectedPair.index}/${selectedPair.side}`]: {
            status: "error",
            side: selectedPair.side,
          },
        }));

        setTimeout(() => {
          setStatus((prev) => ({
            ...prev,
            [`${index}/${side}`]: { status: "", side },
            [`${selectedPair.index}/${selectedPair.side}`]: {
              status: "",
              side: selectedPair.side,
            },
          }));

          onError?.([selectedPair.item, item]);
          setHasError(() => true);
        }, TEST_DELAY);
      }

      setSelectedPair(null);
    }
  };

  const stylesColor = {
    selectedPair: {
      borderColor: colors.second_color2,
    },
    complete: {
      backgroundColor: colors.second_color2,
    },
    error: {
      backgroundColor: colors.second_color1,
    },
  };

  const allPairsCompleted = Object.values(status).every(
    (pair) => pair.status === "complete",
  );

  useEffect(() => {
    if (
      allPairsCompleted &&
      pairs.flat().length === Object.values(status).length
    ) {
      setTimeout(() => {
        onComplete?.(hasError);

        setSelectedPair(null);
        setHasError(false);
      }, TEST_DELAY);
    }
  }, [allPairsCompleted]);

  return (
    <View style={styles.pairs}>
      {mixedPairs.map((pair, index) => (
        <View key={pair[0] + pair[1]} style={styles.pair}>
          {pair.map((item, idx) => (
            <Pressable
              style={[
                styles.pairItem,
                pairItemColors,
                status[`${index}/${idx === 0 ? "left" : "right"}`]?.status ===
                  "selected" && stylesColor.selectedPair,
                status[`${index}/${idx === 0 ? "left" : "right"}`]?.status ===
                  "complete" && stylesColor.complete,
                status[`${index}/${idx === 0 ? "left" : "right"}`]?.status ===
                  "error" && stylesColor.error,
              ]}
              key={item}
              onPress={() => handlePress(item, index, idx)}
              disabled={status[index]?.status === "complete"}
            >
              <Text
                style={[
                  styles.pairText,
                  textColors,
                  (status[`${index}/${idx === 0 ? "left" : "right"}`]
                    ?.status === "complete" ||
                    status[`${index}/${idx === 0 ? "left" : "right"}`]
                      ?.status === "error") && { color: colors.color5 },
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
};

export default MatchPairs;

const styles = StyleSheet.create({
  pairs: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 16,
  },
  pair: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  pairItem: {
    borderWidth: 1,
    padding: 14,
    flex: 1,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  pairText: {
    fontWeight: "400",
    fontSize: 17,
    textAlign: "center",
  },
});
