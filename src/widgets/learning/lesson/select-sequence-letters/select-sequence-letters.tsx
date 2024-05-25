import React, { useMemo, useState } from "react";

import { useTranslation } from "react-i18next";
import { Dimensions, StyleSheet, Text, View } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { KanaAlphabet, TEST_DELAY } from "@/shared/constants/kana";
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

const SelectSequenceLettersScreen: React.FC<SelectSequenceLettersProps> = ({ sequence, kana, next }) => {
  const { colors } = useThemeContext();
  const { getRomanji } = useGetRomanji();
  const { t } = useTranslation();

  const sequenceTrans = sequence.map(item => item.transliterations[0]).join(", ")

  const shafledArray = useMemo(() => shuffleArray(sequence), [sequenceTrans]);
  const shafledArray2 = useMemo(() => shuffleArray(sequence), [sequenceTrans]);


  const shafledArrayString = shafledArray.map(item => getRomanji(item)).join(", ");
  const shafledArray2String = shafledArray2.map(item => getRomanji(item)).join(", ");

  const btns = useMemo(() => shuffleArray([
    shafledArrayString,
    shafledArray2String
  ]), [sequenceTrans]);

  const [states, setStates] = useState<(null | false | true)[]>();

  const submit = (answer: string) => {
    setStates(prev => btns.map((item, index) => item === answer
      ? shafledArrayString === answer
        ? true : false : (prev?.[index] === false || prev?.[index] === true) ? prev?.[index] : null))
    
    setTimeout(() => {
      setStates([])
      next(shafledArrayString !== answer); 
    }, TEST_DELAY)
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
        {btns.map((item, index) => <Button
          key={item}
          customStyles={{
              width: rowLength > 18 ? "100%" : (screenWidth - 55) / 2,
              height: 50,
              fontSize: 17,
              backgroundColor: states?.[index] === true
                ? colors.second_color2 : states?.[index] === false
                ? colors.second_color1
                : colors.color1
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
