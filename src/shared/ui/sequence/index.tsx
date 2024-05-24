import React, { useEffect, useMemo, useState } from "react";

import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { TEST_DELAY } from "@/shared/constants/kana";
import { shuffleArray } from "@/shared/helpers/letters";

type SequenceProps = {
  sequence: string[];

  onFinish?: (hasError: boolean) => void;
  onError?: () => void;
};

const Sequence: React.FC<SequenceProps> = ({ sequence, onFinish, onError }) => {
  const { colors } = useThemeContext();

  const shaffledLetters = useMemo(() => shuffleArray(sequence), [JSON.stringify(sequence)]);

  const emptyLetters = useMemo(
    () => sequence.map(() => null),
    [JSON.stringify(sequence)],
  );

  const [selectedLetters, setSelectedLetters] = useState(
    emptyLetters as (null | { letter: string; index: number })[],
  );

  const [trueAnswers, setTrueAnswers] = useState(
    emptyLetters as (null | true | false)[],
  );

  const onClickLetter = (data: { index: number; letter: string }) => {
    let isFirstElem = false;

    setSelectedLetters((prev) =>
      prev.map((item) => {
        if (item === null && !isFirstElem) {
          isFirstElem = true;
          return data;
        }
        return item;
      }),
    );
  };

  const isSelected = (data: { index: number; letter: string }) =>
    selectedLetters.some(
      (element) =>
        element?.index === data.index && element.letter === data.letter,
    );

  function reset() {
    const emptyLetters = sequence.map(() => null);

    setSelectedLetters(emptyLetters);
    setTrueAnswers(emptyLetters);
  }

  useEffect(() => {
    if (selectedLetters.every((letter) => letter !== null)) {
      const answers = sequence.map(
        (letter, index) =>
          letter?.toUpperCase() ===
          selectedLetters[index]?.letter?.toUpperCase(),
      );

      setTrueAnswers(answers);
      const hasError = answers.some((answer) => !answer);

      setTimeout(() => {
        if (hasError) {
          onError?.();
        }
        onFinish?.(hasError);
        reset();
        setTrueAnswers(prev => prev.map(item => null));
      }, TEST_DELAY);
    }
  }, [selectedLetters]);

  useEffect(() => {
    reset();
  }, [JSON.stringify(sequence)]);

  const getBorderLetterContainer = (
    letter: null | { letter: string; index: number },
    idx: number,
  ) => {
    return {
      borderColor:
        letter === null && selectedLetters[idx - 1] !== null
          ? colors.second_color3
          : trueAnswers[idx] === null
            ? colors.color3
            : trueAnswers[idx]
              ? colors.second_color2
              : colors.second_color1,
    };
  };

  const isAndroid = Platform.OS === "android";

  return (
    <View style={styles.content}>
      <Pressable onPress={reset} style={styles.wordContainer}>
        {selectedLetters.map((letter, i) => (
          <View
            key={`selected-letter${i}-${letter}`}
            style={[
              styles.letterContainer,
              getBorderLetterContainer(letter, i),
            ]}
          >
            {letter !== null && (
              letter.letter && <Text style={[styles.letter, { color: colors.color4 }]}>
                {letter.letter}
              </Text>
            )}
          </View>
        ))}
      </Pressable>

      <View style={styles.chooseLettersContainer}>
        {shaffledLetters.map((letter, index) => {
          const data = { index: index, letter: letter };
          const selected = isSelected(data);

          return (
            <TouchableOpacity
              onPress={() => !selected && onClickLetter(data)}
              key={`letter-list-${letter}-${index}`}
              style={[
                styles.chooseLettersBox,
                {
                  borderColor: !selected ? colors.color2 : "transparent",
                },
              ]}
            >
              <Text style={{
                color: !selected ? colors.color4 : "transparent",
                fontSize: 22,
                fontWeight: "400",
                marginTop: isAndroid ? -5 : 0
              }} >{letter}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default Sequence;

const styles = StyleSheet.create({
  content: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
  },
  wordContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  letterContainer: {
    minWidth: 22,
    minHeight: 32,
    borderBottomWidth: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  letter: {
    fontSize: 22,
    textTransform: "uppercase",
  },
  chooseLettersContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 9,
    marginTop: 30,
  },
  chooseLettersBox: {
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 50,
    height: 50,
  },
  chooseLettersText: {
    fontSize: 22,
    textTransform: "uppercase",
  },
});
