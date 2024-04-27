import React from "react";

import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

import EducationPracticeChooseValue from "@/entities/education/practice/word-game-choose-value/word-game-choose-value";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { KanaAlphabet } from "@/shared/constants/kana";
import { LessonSelectSymbol } from "@/shared/constants/lessons";
import getKana from "@/shared/helpers/getKanaKey";
import useGetRomanji from "@/shared/lib/i18n/hooks/useKey";


type SelectLettersScreenProps = LessonSelectSymbol & {
  next: () => void
  kana: KanaAlphabet
}

const SelectLettersScreen: React.FC<SelectLettersScreenProps> = ({ name, symbols, kana, next }) => {

  const { colors } = useThemeContext();
  const { t } = useTranslation();
  const { getRomanji } = useGetRomanji();
  
  return (
    <View style={styles.container} >
      <Text style={[styles.title, {
        color: colors.color4
      }]} >
        {t("common.select")} {}
        {kana === KanaAlphabet.Hiragana ? t("kana.hiragana") : t("kana.katakana")} { }
        {t("common.for")} {}
        {t("kana.romanji")} {}
        «{getRomanji(symbols[1])}»
      </Text>
      <EducationPracticeChooseValue 
        hideTitle
        title={""} 
        answers={symbols.map(item => ({
          text: getKana(item, kana),
          key: item.id
        }))}
        onCompleted={next}
        trueAnswer={symbols[1].id}
        word={{
          kana: "",
          kanji: null,
          romanji: "",
          translate: ""
        }} />
    </View>
  );
};

export default SelectLettersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    width: "100%",
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 30
  },
});
