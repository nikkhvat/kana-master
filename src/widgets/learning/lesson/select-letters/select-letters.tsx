import React from "react";

import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { KanaAlphabet } from "@/shared/constants/kana";
import { LessonSelectSymbol } from "@/shared/constants/lessons";
import getKana from "@/shared/helpers/getKanaKey";
import useGetRomanji from "@/shared/lib/i18n/hooks/useKey";
import SelectAnswer from "@/shared/ui/select-answer/select-answer";

type SelectLettersScreenProps = LessonSelectSymbol & {
  next: () => void
  kana: KanaAlphabet
}

const SelectLettersScreen: React.FC<SelectLettersScreenProps> = ({ symbols, kana, next }) => {

  const { colors } = useThemeContext();
  const { t } = useTranslation();
  const { getRomanji } = useGetRomanji();
  
  const answers = symbols.map(item => ({
    title: getKana(item, kana),
    isTrue: item.id === symbols[0].id
  }));
  
  return (
    <View style={styles.container} >
      <Text style={[styles.title, {
        color: colors.color4
      }]} >
        {t("lesson.selectCorrectTransliteration", { syllable: getRomanji(symbols[0]) })}
      </Text>
      
      <SelectAnswer answers={answers} />
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
