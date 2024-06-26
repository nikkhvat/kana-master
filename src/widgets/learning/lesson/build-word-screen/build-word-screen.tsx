import React, { useMemo } from "react";

import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { KanaAlphabet } from "@/shared/constants/kana";
import { LessonBuildWord } from "@/shared/constants/lessons";
import getKana from "@/shared/helpers/getKanaKey";
import useGetRomanji from "@/shared/lib/i18n/hooks/useKey";
import Sequence from "@/shared/ui/sequence";
import { shuffleArray } from "@/shared/helpers/letters";


type SelectSequenceLettersProps = LessonBuildWord & {
  next: () => void
  kana: KanaAlphabet
}

const SelectSequenceLettersScreen: React.FC<SelectSequenceLettersProps> = ({ sequence, kana, next }) => {
  const { colors } = useThemeContext();

  const { t } = useTranslation();
  
  const { getRomanji } = useGetRomanji();
  
  const shaffledSequence = useMemo(() => shuffleArray(sequence), [JSON.stringify(sequence)]);
  const sequenceArray = shaffledSequence.map(item => getKana(item, kana));

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
        {shaffledSequence.map(item => getRomanji(item)).join(", ")}
      </Text>

      <Sequence onFinish={next} sequence={sequenceArray} />
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
