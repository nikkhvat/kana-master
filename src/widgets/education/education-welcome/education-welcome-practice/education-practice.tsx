import React, { useState } from "react";

import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";

import { RootState } from "@/app/store";
import CardModeSelect from "@/entities/education/card-mode-select/card-mode-select";
import EducationKanaSelectedCard from "@/entities/education/education-selected-card/education-kana-selected-card";
import StartPracticeButton from "@/entities/education/start-practice-button/start-practice-button";
import TestModeSelect from "@/entities/education/test-mode-select/test-mode-select";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { CardMode, DifficultyLevelType, PracticeScreenMode } from "@/shared/constants/kana";
import { useAppSelector } from "@/shared/model/hooks";
import { RootStackParamList } from "@/shared/types/navigationTypes";

type PracticeNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface PracticeProps {
  navigation: PracticeNavigationProp;
}

const screenWidth = Dimensions.get("window").width;

const EducationPractice: React.FC<PracticeProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { colors } = useThemeContext();
  
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

  const toPractice = () => navigation.navigate("Practice", {
    keysCardModeState: cardsMode,
    keysDifficultyLevelState: testMode,
    keysModeState: [],
    timerDeration: timerDeration,
    mode: PracticeScreenMode.Testing,
  });

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
            { condition: selectedLetters >= 5, text: "* Должно быть выбранно больше 5 символов" },
            { condition: cardsMode.length > 0, text: "* Должен быть выбран хотя бы один тип карточки" },
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