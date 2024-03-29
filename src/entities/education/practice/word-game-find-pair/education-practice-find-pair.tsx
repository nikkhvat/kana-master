/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet } from "react-native";

import FindPairItem from "@/entities/education/practice/word-game-find-pair/item/item";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { KanaAlphabet, TEST_DELAY } from "@/shared/constants/kana";
import { QuestionFindPair } from "@/shared/types/questions";
import { RegistErrorProps } from "@/widgets/education/education-word-game/ui/education-practice";

interface EducationPracticeFindPairProps {
  onCompleted?: (hasError: boolean) => void;
  onError?: (data: RegistErrorProps) => void;
  question: QuestionFindPair
}

type Item = {
  title: string;
  id: number | string;
  index: number;
};

const EducationPracticeFindPair: React.FC<EducationPracticeFindPairProps> = ({
  question,
  onCompleted,
  onError,
}) => {

  const { 
    pairs,
    kana,
    answers,
  } = question;
  const { t } = useTranslation();
  const { colors } = useThemeContext();

  const [hasError, setHasError] = useState(false);

  const [selectedPair, setSelectedPair] = useState(null as null | Item);
  const [matchedPairs, setMatchedPairs] = useState([] as any[]);

  const isInclude = (errorsPairs: Array<string | number>, id: string | number) => {
    for (let i = 0; i < errorsPairs.length; i++) {
      const element = errorsPairs[i];
      
      if (element === id) return true;
    }

    return false;
  };
  
  const [errorsPairs, setErrorsPairs] = useState([] as any[]);

  const isCorrectPair = (pair1: Item, pair2: Item) => {

    const cond = answers.some(
      (answer) => {
        const cond1 = answer[0] === pair1.id || answer[1] === pair1.id;
        const cond2 = answer[0] === pair2.id || answer[1] === pair2.id;
        return cond1 && cond2;
      }
    );
    return cond;
  };

  const isMatched = (id: string | number) => {    
    return matchedPairs.some((pair) => pair === id);
  };

  const isAlreadyMatched = (pair: Item) => {

    for (let index = 0; index < matchedPairs.length; index++) {
      const element = matchedPairs[index];
      
      if (element === pair.id) return true;
    }

    return false;
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
        setMatchedPairs((prev) => [...prev, selectedPair.id, pair.id]);
      } else {
        if (!hasError) setHasError(true);
        setErrorsPairs([selectedPair!.id, pair.id]);
        onError?.({
          type: "find-pair-word",
          pair: [selectedPair.title, pair.title]
        });
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
      setTimeout(() => {
        setMatchedPairs(() => []);
        onCompleted?.(hasError);
      }, TEST_DELAY);
    }
  }, [matchedPairs]);

  return (
    <View style={styles.container}>
      <Text style={[styles.question, {color: colors.color4}]}>
        {t("common.match")}
        {" "}
        {kana === KanaAlphabet.Hiragana 
          ? t("kana.hiragana")?.toLowerCase()
          : t("kana.katakana")?.toLowerCase()
          }
        {" "}
        {t("common.with")}
        {" "}
        {t("kana.romanji")?.toLowerCase()}
      </Text>
      <View style={styles.pairs}>
        {pairs.map((pair) => (
          <View key={pair[0].id} style={styles.row}>
            <FindPairItem 
              isError={isInclude(errorsPairs, pair[0].id)}
              isSelect={pair[0].id === selectedPair?.id}
              isCorrect={isMatched(pair[0].id)}
              onPress={() => pick({ ...pair[0], index: 0 })}
            >
              {pair[0].title}
            </FindPairItem>
            <FindPairItem 
              isError={isInclude(errorsPairs, pair[1].id)}
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
