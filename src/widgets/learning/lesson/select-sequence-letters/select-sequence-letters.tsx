import React from "react";

import { useTranslation } from "react-i18next";
import { Dimensions, StyleSheet, Text, View } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { KanaAlphabet } from "@/shared/constants/kana";
import { LessonSelectSequenceLetters } from "@/shared/constants/lessons";
import getKana from "@/shared/helpers/getKanaKey";
import { shuffleArray } from "@/shared/helpers/letters";
import useGetRomanji from "@/shared/lib/i18n/hooks/useKey";
import Button from "@/shared/ui/button/button";

type SelectSequenceLettersProps = LessonSelectSequenceLetters & {
  next: (hasError: boolean) => void
  kana: KanaAlphabet
}

const screenWidth = Dimensions.get("window").width;

const SelectSequenceLettersScreen: React.FC<SelectSequenceLettersProps> = ({ name, sequence, kana, next }) => {

  const { colors } = useThemeContext();
  
  const { t } = useTranslation();

  const shafledArray = shuffleArray(sequence);
  const shafledArray2 = shuffleArray(sequence);

  const { getRomanji } = useGetRomanji();

  const shafledArrayString =  shafledArray.map(item => getRomanji(item)).join(", ");
  const shafledArray2String =  shafledArray2.map(item => getRomanji(item)).join(", ");


  const btns = shuffleArray([
    shafledArrayString,
    shafledArray2String
  ]);

  const submit = (answer: string) => {
    next(shafledArrayString !== answer); 
  };

  const rowLength = shafledArrayString.length;

  return (
    <View style={styles.container} >
      <Text style={[styles.title, { color: colors.color4 }]} >
        {t("lesson.chooseCorrectTransliterationSequence")}
      </Text>
      <Text style={[styles.title, { color: colors.color4 }]} >
        {shafledArray.map(item => getKana(item, kana)).join(", ")}
      </Text>

      <View style={[styles.rowButtons, { 
        flexDirection: rowLength > 18 ? "column" : "row"
        }]} >
        {btns.map(item => <Button
          key={item}
          customStyles={{ 
            width: rowLength > 18 ? "100%" : (screenWidth - 55) / 2,
            height: 50,
            fontSize: 17,
          }}
          type={"inactive"}
          title={item}
          onClick={() => submit(item)}
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
    rowGap: 0,
  },
  title: {
    width: "100%",
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 30,
  },
});
