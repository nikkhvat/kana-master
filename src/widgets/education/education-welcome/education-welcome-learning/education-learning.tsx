import React from "react";

import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Dimensions } from "react-native";

import KanaSelectedCard from "@/entities/education/education-selected-card/education-kana-selected-card";
import StartPracticeButton from "@/entities/education/start-practice-button/start-practice-button";
import { useAppSelector } from "@/shared/model/hooks";
import { RootStackParamList } from "@/shared/types/navigationTypes";


type PracticeNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface PracticeProps {
  navigation: PracticeNavigationProp;
}

const screenWidth = Dimensions.get("window").width;

const EducationLearning: React.FC<PracticeProps> = ({ navigation }) => {
  const { t } = useTranslation();
  
  const letters = useAppSelector((state) => state.kana.selected);

  const hiraLength = letters.base.hiragana.length +
    letters.dakuon.hiragana.length +
    letters.handakuon.hiragana.length +
    letters.yoon.hiragana.length;

  const kataLength = letters.base.katakana.length +
    letters.dakuon.katakana.length +
    letters.handakuon.katakana.length +
    letters.yoon.katakana.length;

  const selectedLetters = hiraLength + kataLength;

  const toChooseAlphabet = () => navigation.navigate("ChooseAlphabet", {
    screen: "Learning",
  });

  return (
    <View style={[styles.container, { width: screenWidth - 40 }]}>
      <KanaSelectedCard
        imageSource={"learning"}
        onEdit={toChooseAlphabet}
      />

      <View style={styles.content}>
        <StartPracticeButton
          conditions={[
            { condition: selectedLetters >= 5, text: t("tooltip.syllablesSelectMoreThan5") },
          ]}
          onPress={() => {
            navigation.navigate("LearningPage");
          }} />
      </View>
    </View>
  );
};

export default EducationLearning;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
});
