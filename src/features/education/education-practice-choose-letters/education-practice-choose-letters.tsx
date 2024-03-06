import React, { useEffect, useMemo, useState } from "react";

import { View, Text, TouchableOpacity, Pressable, StyleSheet } from "react-native";

import { useThemeContext } from "@/hooks/theme-context";

interface ChooseLettersProps {
  title: string;

  romanji: string;
  shuffle: string[];
  translate: string;

  kana: string;

  onFinish?: (hasError: boolean) => void;
}

const DELAY = 500;

const EducationPracticeChooseLetters: React.FC<ChooseLettersProps> = ({
  title,
  romanji,
  translate,
  kana,
  shuffle,
  onFinish
}) => {
  const { colors } = useThemeContext();

  const letters = useMemo(() => kana.split(""), [kana]);

  const [questionTitle, setTitle] = useState(`${title} ${romanji} (${translate})`);

  const [shuffleLetters, setShuffleLetters] = useState(shuffle);

  useEffect(() => {
    setTimeout(() => {
      setShuffleLetters(shuffle);
      setTitle(`${title} ${romanji} (${translate})`);
    }, DELAY);
  }, [title, shuffle, romanji, translate]);

  const emptyLetters = useMemo(() => letters.map(() => null), [letters]);

  const [selectedLetters, setSelectedLetters] = useState(
    emptyLetters as (null | { letter: string; index: number })[]
  );

  const [trueAnswers, setTrueAnswers] = useState(
    emptyLetters as (null | true | false)[]
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
      })
    );
  };

  const isSelected = (data: { index: number; letter: string }) =>
    selectedLetters.some(
      (element) =>
        element?.index === data.index && element.letter === data.letter
    );

  const reset = () => {
    setSelectedLetters(emptyLetters);
    setTrueAnswers(emptyLetters);
  };

  useEffect(() => {
    if (selectedLetters.every((letter) => letter !== null)) {
      const answers = letters.map(
        (letter, index) => letter === selectedLetters[index]?.letter
      );

      setTrueAnswers(answers);

      const hasError = answers.some((answer) => !answer);

      onFinish?.(hasError);

      setTimeout(reset, DELAY);
    }
  }, [selectedLetters]);

  useEffect(() => {
    setTimeout(reset, DELAY);
  }, [kana]);

  return (
    <View style={styles.container}>
      <Text style={[styles.question, { color: colors.color4 }]}>{questionTitle}</Text>

      <View style={styles.content}>
        <Pressable onPress={reset} style={styles.wordContainer}>
          {selectedLetters.map((letter, i) => (
            <View
              key={`selected-letter${i}-${letter?.letter}`}
              style={[
                styles.letterContainer,
                {
                  borderColor: letter === null && selectedLetters[i - 1] !== null
                    ? colors.second_color3
                    : trueAnswers[i] === null
                      ? colors.color3
                      : trueAnswers[i]
                        ? colors.second_color2
                        : colors.second_color1,
                },
              ]}
            >
              {letter !== null && <Text style={[styles.letter, { color: colors.color4 }]}>{letter?.letter}</Text>}
            </View>
          ))}
        </Pressable>

        <View style={styles.chooseLettersContainer}>
          {shuffleLetters.map((letter, index) => {
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
                <Text
                  style={[
                    styles.chooseLettersText,
                    {
                      color: !selected ? colors.color4 : "transparent"
                    },
                  ]}
                >
                  {letter}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>

  );
};

export default EducationPracticeChooseLetters;


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
    width: 22,
    height: 26,
    borderBottomWidth: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  letter: {
    fontSize: 22,
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
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  chooseLettersText: {
    fontSize: 22,
  },
});
