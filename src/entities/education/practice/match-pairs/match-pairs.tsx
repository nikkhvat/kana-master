import React, { useEffect, useMemo, useState } from "react";

import { StyleSheet, View } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { TEST_DELAY } from "@/shared/constants/kana";
import { isCorrectPair } from "@/shared/helpers/letters";
import { Typography } from "@/shared/typography";
import PrimaryButton from "@/shared/ui/buttons/Primary/primary-button";

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
    borderColor: colors.BorderDefault,
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
      borderColor: colors.BgSuccess,
    },
    complete: {
      backgroundColor: colors.BgSuccess,
    },
    error: {
      backgroundColor: colors.BgDanger,
    },
  };
  
  const textColor = {
    selectedPair: {
      color: colors.TextPrimary,
    },
    complete: {
      color: colors.TextContrastSecondary,
    },
    error: {
      color: colors.TextContrastSecondary,
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
            <PrimaryButton
              containerStylesFunc={() => [
                pairItemColors,
                status[`${index}/${idx === 0 ? "left" : "right"}`]?.status === "selected" && stylesColor.selectedPair,
                status[`${index}/${idx === 0 ? "left" : "right"}`]?.status === "complete" && stylesColor.complete,
                status[`${index}/${idx === 0 ? "left" : "right"}`]?.status === "error" && stylesColor.error,
                {
                  minHeight: 50,
                  height: "auto",
                  padding: 14,
                }
              ]}
              textStyles={{
                ...Typography.regularH4,
                ...{ color: colors.TextPrimary },
                ...(status[`${index}/${idx === 0 ? "left" : "right"}`]?.status === "selected" ? textColor.selectedPair : {}),
                ...(status[`${index}/${idx === 0 ? "left" : "right"}`]?.status === "complete" ? textColor.complete : {}),
                ...(status[`${index}/${idx === 0 ? "left" : "right"}`]?.status === "error" ? textColor.error : {}),
              }}
              isOutline
              isFullWidth
              key={item}
              onClick={() => handlePress(item, index, idx)}
              isDisabled={status[index]?.status === "complete"}
              text={item}
            />
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
  }
});
