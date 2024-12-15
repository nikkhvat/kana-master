import React from "react";

import { useTranslation } from "react-i18next";
import {  StyleSheet, Text, View } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { QuestionMode } from "@/shared/constants/kana";

import { Typography } from "@/shared/typography";
import ButtonCard from "../button-card/button-card";

export type CardModeSelectProps = {
  setMode: React.Dispatch<React.SetStateAction<QuestionMode>>;
  mode: QuestionMode
};

const PracticeQuestionModeSelect: React.FC<CardModeSelectProps> = ({ setMode, mode }) => {
  const { colors } = useThemeContext();
  const { t } = useTranslation();


  return (
    <View style={styles.container}>
      <Text style={[Typography.boldH3, { color: colors.TextPrimary }]}>
        {t("practice.modeTitle")}
      </Text>

      <View style={styles.buttonsContainer}>
        <ButtonCard<QuestionMode>
          setValue={setMode}
          currentValue={mode}
          value={QuestionMode.Choose}
          text={t("practice.mode.cards")}
          icon={"cards-variant"}
        />
        <ButtonCard<QuestionMode>
          setValue={setMode}
          currentValue={mode}
          value={QuestionMode.Brash}
          text={t("practice.mode.drawing")}
          icon={"text-recognition"}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <ButtonCard<QuestionMode>
          setValue={setMode}
          currentValue={mode}
          value={QuestionMode.Type}
          text={t("practice.mode.input")}
          icon={"keyboard-outline"}
        />
        <ButtonCard<QuestionMode>
          setValue={setMode}
          currentValue={mode}
          value={QuestionMode.Word}
          text={t("practice.mode.words")}
          icon={"book-check-outline"}
        />
      </View>
    </View>
  );
};

export default PracticeQuestionModeSelect;

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 16,
    marginTop: 16,
  },
  column: {
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
    gap: 16,
  },
  text: {
    fontWeight: "700",
    fontSize: 15,
    width: 13,
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  button: {
    // borderWidth: 1,
    // borderRadius: 22,
    flex: 1,
    // minHeight: 150,
  }
});
