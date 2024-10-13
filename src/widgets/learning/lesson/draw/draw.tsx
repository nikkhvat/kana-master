import React from "react";

import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

import Draw from "@/entities/education/draw/draw";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { KanaAlphabet } from "@/shared/constants/kana";
import { LessonDraw } from "@/shared/constants/lessons";
import getKana from "@/shared/helpers/getKanaKey";
import PrimaryButton from "@/shared/ui/buttons/Primary/primary-button";
import { LearningTitle } from "../ui/title";

type LessonDrawScreenProps = LessonDraw & {
  next: () => void;
  kana: KanaAlphabet;
};

const LessonDrawScreen: React.FC<LessonDrawScreenProps> = ({
  symbol,
  kana,
  next,
}) => {
  const { colors } = useThemeContext();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View>
        <LearningTitle>
          {t("lesson.drawSyllable", { syllable: getKana(symbol, kana) })}
        </LearningTitle>

        <Draw kana={kana} letter={symbol} />
      </View>

      <View style={styles.buttonContainer}>
        <PrimaryButton isFullWidth text={t("common.next")} onClick={next} />
      </View>
    </View>
  );
};

export default LessonDrawScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  buttonContainer: {
    width: "100%",
    height: 50,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
    height: 50,
  },
});
