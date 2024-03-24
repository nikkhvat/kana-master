import React, { useState } from "react";

import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";

import { RootState } from "@/app/store";
import EducationKanaSelectedCard from "@/entities/education/practice/education-select-letters/education-select-letters";
import CardModeSelect from "@/entities/education/practice/practice-card-mode-select/practice-card-mode-select";
import TestModeSelect from "@/entities/education/practice/practice-test-mode-select/practice-test-mode-select";
import StartPracticeButton from "@/entities/education/start-practice-button/start-practice-button";
import { CardMode, DifficultyLevelType } from "@/shared/constants/kana";
import { useAppSelector } from "@/shared/model/hooks";
import { RootStackParamList } from "@/shared/types/navigationTypes";


type PracticeNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface PracticeProps {
  navigation: PracticeNavigationProp;
}

const screenWidth = Dimensions.get("window").width;

const EducationPractice: React.FC<PracticeProps> = ({ navigation }) => {
  const { t } = useTranslation();
  
  const letters = useAppSelector((state: RootState) => state.kana.selected);

  const [cardsMode, setCardMode] = useState<CardMode[]>([]);
  const [testMode, setTestMode] = useState<DifficultyLevelType[]>([]);

  const [timerDeration, setTimerDeration] = useState<"fast" | "medium" | "slow">("medium");

  const hiraLength = letters.base.hiragana.length +
    letters.dakuon.hiragana.length +
    letters.handakuon.hiragana.length +
    letters.yoon.hiragana.length;
  
  const kataLength = letters.base.katakana.length +
    letters.dakuon.katakana.length +
    letters.handakuon.katakana.length +
    letters.yoon.katakana.length;

  const selectedLetters = hiraLength + kataLength;
    
  const isHira = hiraLength >= 5;
  const isKata = kataLength >= 5;

  const toChooseAlphabet = () => navigation.navigate("ChooseAlphabet", {
    screen: "Practice",
  });

  const toPractice = () => {
    console.log("TO PRACTICE");
    
    navigation.navigate("EducationPractice", {
      keysCardModeState: cardsMode,
      keysDifficultyLevelState: testMode,
      timerDeration: timerDeration,
    });
  };

  return (
    <View style={[styles.container, { width: screenWidth - 40 }]}>
      <ScrollView showsVerticalScrollIndicator={false} >
        <EducationKanaSelectedCard 
          imageSource={"practice"} 
          onEdit={toChooseAlphabet} 
        />

        <CardModeSelect
          hiraAvailable={isHira}
          kanaAvailable={isKata} 
          setCards={setCardMode}
        />

        <TestModeSelect 
          available={isHira || isKata} 
          setCards={setTestMode}
          setTimerDeration={setTimerDeration} 
        />

        <StartPracticeButton 
          conditions={[
            { condition: selectedLetters >= 5, text: t("tooltip.syllablesSelectMoreThan5") },
            { condition: cardsMode.length > 0, text: t("tooltip.cardSelectAtLeastOne") },
          ]} 
          onPress={toPractice} />
      </ScrollView>
    </View>
  );
};

export default EducationPractice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});