import React from "react";

import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

import SequenceBuild from "@/entities/education/practice/sequence-build/sequence-build";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { KanaAlphabet, QuestionTypeBuildingWord, WordBuildingType } from "@/shared/constants/kana";
import { LessonBuildWord } from "@/shared/constants/lessons";
import getKana from "@/shared/helpers/getKanaKey";
import { shuffleArray } from "@/shared/helpers/letters";
import useGetRomanji from "@/shared/lib/i18n/hooks/useKey";


type SelectSequenceLettersProps = LessonBuildWord & {
  next: () => void
  kana: KanaAlphabet
}

const SelectSequenceLettersScreen: React.FC<SelectSequenceLettersProps> = ({ sequence, kana, next }) => {
  const { colors } = useThemeContext();

  const shafledArray = shuffleArray(sequence);
  const shafledArray1 = shuffleArray(sequence);

  const { t } = useTranslation();
  const { getRomanji } = useGetRomanji();

  const random = Math
    .random()
    .toString();

  return (
    <View style={styles.container} >
      <Text style={[styles.title, {
        color: colors.color4
      }]} >
        {t("lesson.arrangeSyllablesInCorrectOrder")}
      </Text>
      <Text style={[styles.title, {
        color: colors.color4,
        marginBottom: 60
      }]} >
        {shafledArray1.map(item => getKana(item, kana)).join(", ")}
      </Text>

      <SequenceBuild
        hideTitle
        question={{
          type: QuestionTypeBuildingWord,
          title: random,
          buildingWord: shafledArray1.map(item => getRomanji(item)).join(""),
          shaffledLetters: shafledArray.map(item => getRomanji(item)),
          translate: shafledArray.map(item => getRomanji(item)).join(""),
          selectKana: WordBuildingType.Kana,
          selectKanaType: kana,
        }}
        buildingWord={shafledArray1.map(item => getRomanji(item))}
        onFinish={next} />
    </View>
  );
};

export default SelectSequenceLettersScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  rowButtons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
    marginTop: 40
  },
  title: {
    width: "100%",
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20
  },
});
