import React, { useState } from "react";

import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";

import { RootState } from "@/app/store";
import KanaSelectedCard, { CardType } from "@/entities/education/practice/education-select-letters/education-select-letters";
import WordGameModeSelect from "@/entities/education/practice/word-game-mode-select/word-game-mode-select";
import StartPracticeButton from "@/entities/education/start-practice-button/start-practice-button";
import { TABLET_PADDING, TABLET_WIDTH } from "@/shared/constants/app";
import { TestMode } from "@/shared/constants/kana";
import { verticalScale } from "@/shared/helpers/metrics";
import { useAppSelector } from "@/shared/model/hooks";
import { RootStackParamList } from "@/shared/types/navigationTypes";

type WordBuildingNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface WordBuildingProps {
  navigation: WordBuildingNavigationProp;
}

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const EducationWordGame: React.FC<WordBuildingProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const [mode, setMode] = useState<TestMode[]>([]);

  const selectedWords = useAppSelector((state: RootState) => state.kana.selectedWords);

  const isHiragana = selectedWords.hiragana.length >= 10;
  const isKatakana = selectedWords.katakana.length >= 10;

  const wordsCount = selectedWords.hiragana.length + selectedWords.katakana.length;

  const toChooseAlphabetScreen = () => navigation.navigate("ChooseAlphabet", {
    screen: "WordBuilding",
  });

  const toPractice = () => navigation.navigate("EducationWordGame", {
    keysModeState: mode,
  });

  return (
    <View style={[styles.container, { width: screenWidth - 40 - (screenWidth > TABLET_WIDTH ? verticalScale(TABLET_PADDING * 2) : 0) }]}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} >
        <KanaSelectedCard 
          imageSource={CardType.WordGame} 
          onEdit={toChooseAlphabetScreen}
        />
        
        <WordGameModeSelect 
          modeAvailable={(selectedWords.hiragana.length + selectedWords.katakana.length) >= 10}
          hiraAvailable={isHiragana} 
          kanaAvailable={isKatakana} 
          setMode={setMode}
        />

        {screenHeight <= 750 && <StartPracticeButton
          conditions={[
            { condition: wordsCount >= 10, text: t("tooltip.wordsSelectMoreThan10") },
            { condition: mode.length > 0, text: t("tooltip.modeSelectAtLeastOne") },
          ]}
          onPress={toPractice} />}
      </ScrollView>
      {screenHeight > 750 && <StartPracticeButton
        absolute
        conditions={[
          { condition: wordsCount >= 10, text: t("tooltip.wordsSelectMoreThan10") },
          { condition: mode.length > 0, text: t("tooltip.modeSelectAtLeastOne") },
        ]}
        onPress={toPractice} />}
    </View>
  );
};

export default EducationWordGame;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  }
});
