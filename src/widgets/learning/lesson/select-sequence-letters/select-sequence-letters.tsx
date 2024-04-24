import React from "react";

import { useTranslation } from "react-i18next";
import { Dimensions, StyleSheet, Text, View } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { KanaAlphabet } from "@/shared/constants/kana";
import { LessonSelectSequenceLetters } from "@/shared/constants/lessons";
import { shuffleArray } from "@/shared/helpers/letters";
import Button from "@/shared/ui/button/button";

type SelectSequenceLettersProps = LessonSelectSequenceLetters & {
  next: () => void
  kana: KanaAlphabet
}

const screenWidth = Dimensions.get("window").width;

const SelectSequenceLettersScreen: React.FC<SelectSequenceLettersProps> = ({ name, sequence, kana, next }) => {

  const { colors } = useThemeContext();
  
  const { t } = useTranslation();

  const shafledArray = shuffleArray(sequence);
  const shafledArray2 = shuffleArray(sequence);

  const btns = shuffleArray([
    shafledArray.map(item => item.en).join(", "),
    shafledArray2.map(item => item.en).join(", ")
  ]);

  return (
    <View style={styles.container} >
      <Text style={[styles.title, {
        color: colors.color4
      }]} >
        {t("common.select")}{" "}
        {kana === KanaAlphabet.Hiragana ? t("kana.hiragana") : t("kana.katakana")}{" "}
        {t("lesson.inTheFollowingOrder")}{": "}
        {"\n"}
        {shafledArray.map(item => item.ka).join(", ")}
      </Text>

      <View style={styles.rowButtons} >
        {btns.map(item => <Button
          key={item}
          customStyles={{ 
            width: (screenWidth - 55) / 2,
            height: 50
          }}
          type={"inactive"}
          title={item}
          onClick={() => next()}
        />)}
      </View>
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
    marginBottom: 30
  },
});
