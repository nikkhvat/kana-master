import React from "react";

import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

import SequenceBuild from "@/entities/education/practice/sequence-build/sequence-build";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { KanaAlphabet, QuestionTypeBuildingWord, WordBuildingType } from "@/shared/constants/kana";
import { LessonBuildWord } from "@/shared/constants/lessons";
import { shuffleArray } from "@/shared/helpers/letters";


type SelectSequenceLettersProps = LessonBuildWord & {
  next: () => void
  kana: KanaAlphabet
}

const SelectSequenceLettersScreen: React.FC<SelectSequenceLettersProps> = ({ name, sequence, kana, next }) => {

  const { colors } = useThemeContext();

  const shafledArray = shuffleArray(sequence);
  const shafledArray1 = shuffleArray(sequence);

  const { t } = useTranslation();

  return (
    <View style={styles.container} >
      <Text style={[styles.title, {
        color: colors.color4
      }]} >
        {t("common.select")}{" "}
        {kana === KanaAlphabet.Hiragana ? t("kana.hiragana") : t("kana.katakana")}{" "}
        {t("lesson.inTheFollowingOrder")}{": "}
        {"\n"}
        {shafledArray1.map(item => item.ka).join(", ")}
      </Text>

      <SequenceBuild
        hideTitle
        question={{
          type: QuestionTypeBuildingWord,
          title: "",
          buildingWord: shafledArray.map(item => item.en).join(""),
          shaffledLetters: shafledArray.map(item => item.en),
          translate: shafledArray.map(item => item.en).join(""),
          selectKana: WordBuildingType.Kana,
          selectKanaType: kana,
        }}
        onFinish={next} />

      {/* <Text style={{ color: "white" }} >
        {JSON.stringify(shafledArray)}
      </Text> */}
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
  },
  title: {
    width: "100%",
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 60
  },
});
