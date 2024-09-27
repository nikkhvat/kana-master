import React, { useState } from "react";

import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";

import { RootState } from "@/app/store";
import EducationKanaSelectedCard, {
  CardType,
} from "@/entities/education/practice/education-select-letters/education-select-letters";
import CardModeSelect from "@/entities/education/practice/practice-card-mode-select/practice-card-mode-select";
import TestModeSelect from "@/entities/education/practice/practice-test-mode-select/practice-test-mode-select";
import StartPracticeButton from "@/entities/education/start-practice-button/start-practice-button";
import { TABLET_PADDING, TABLET_WIDTH } from "@/shared/constants/app";
import { CardMode, DifficultyLevelType } from "@/shared/constants/kana";
import { verticalScale } from "@/shared/helpers/metrics";
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

  const [timerDeration, setTimerDeration] = useState<
    "fast" | "medium" | "slow"
  >("medium");

  const hiraganaLength =
    letters.base.hiragana.length +
    letters.dakuon.hiragana.length +
    letters.handakuon.hiragana.length +
    letters.yoon.hiragana.length;

  const katakanaLength =
    letters.base.katakana.length +
    letters.dakuon.katakana.length +
    letters.handakuon.katakana.length +
    letters.yoon.katakana.length;

  const selectedLetters = hiraganaLength + katakanaLength;

  const isHiragana = hiraganaLength >= 5;
  const isKatakana = katakanaLength >= 5;

  const toChooseAlphabet = () =>
    navigation.navigate("KanaSelect", { title: "" });

  const toPractice = () => {
    navigation.navigate("EducationPractice", {
      keysCardModeState: cardsMode,
      keysDifficultyLevelState: testMode,
      timerDeration: timerDeration,
    });
  };

  return (
    <View
      style={[
        styles.container,
        {
          width:
            screenWidth -
            40 -
            (screenWidth > TABLET_WIDTH
              ? verticalScale(TABLET_PADDING * 2)
              : 0),
        },
      ]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <EducationKanaSelectedCard
          imageSource={CardType.Practice}
          onEdit={toChooseAlphabet}
        />

        <CardModeSelect
          hiraAvailable={isHiragana}
          kanaAvailable={isKatakana}
          setCards={setCardMode}
        />

        <TestModeSelect
          available={isHiragana || isKatakana}
          setCards={setTestMode}
          setTimerDeration={setTimerDeration}
        />

        <StartPracticeButton
          conditions={[
            {
              condition: selectedLetters >= 5,
              text: t("tooltip.syllablesSelectMoreThan5"),
            },
            {
              condition: cardsMode.length > 0,
              text: t("tooltip.cardSelectAtLeastOne"),
            },
          ]}
          onPress={toPractice}
        />
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
