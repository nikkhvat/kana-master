import React, { useState } from "react";

import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";

import { RootState } from "@/app/store";
import KanaSelectedCard from "@/entities/education/education-selected-card/education-kana-selected-card";
import StartPracticeButton from "@/entities/education/start-practice-button/start-practice-button";
import WordGameModeSelect from "@/entities/education/word-game-mode-select/word-game-mode-select";
import { PracticeScreenMode, TestMode } from "@/shared/constants/kana";
import { useAppSelector } from "@/shared/model/hooks";
import { RootStackParamList } from "@/shared/types/navigationTypes";
import Button from "@/shared/ui/button/button";


type WordBuildingNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface WordBuildingProps {
  navigation: WordBuildingNavigationProp;
}

const screenWidth = Dimensions.get("window").width;

const EducationWordGame: React.FC<WordBuildingProps> = ({ navigation }) => {
  const { t } = useTranslation();
  
  const [mode, setMode] = useState<TestMode[]>([]);

  const selectedWords = useAppSelector((state: RootState) => state.kana.selectedWords);

  const isHira = selectedWords.hiragana.length > 10;
  const isKata = selectedWords.katakana.length > 10;

  const wordsCount = selectedWords.hiragana.length + selectedWords.katakana.length;

  const toChooseAlphabetScreen = () => navigation.navigate("ChooseAlphabet", {
    screen: "WordBuilding",
  });

  const toPractice = () => navigation.navigate("Practice", {
    keysCardModeState: [],
    keysModeState: mode,
    keysDifficultyLevelState: [],
    mode: PracticeScreenMode.WordGame,
  });

  return (
    <View style={[styles.container, { width: screenWidth - 40 }]}>
      <ScrollView showsVerticalScrollIndicator={false} >
        <KanaSelectedCard 
          imageSource={"wordgame"} 
          onEdit={toChooseAlphabetScreen}
        />
        
        <WordGameModeSelect 
          hiraAvailable={isHira} 
          kanaAvailable={isKata} 
          setMode={setMode}
        />

        <StartPracticeButton
          conditions={[
            { condition: wordsCount > 10, text: "* Должно быть доступно больше 10 слов" },
            { condition: mode.length > 0, text: "* Должен быть выбран хотя бы один" },
          ]}
          onPress={toPractice} />
      </ScrollView>
    </View>
  );
};

export default EducationWordGame;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
