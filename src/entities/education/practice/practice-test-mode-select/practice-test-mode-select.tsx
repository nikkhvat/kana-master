import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { DifficultyLevelType } from "@/shared/constants/kana";
import Switcher from "@/shared/ui/switcher/switcher";

import { Typography } from "@/shared/typography";
import SecondaryButton from "@/shared/ui/buttons/Secondary/secondary-button";
import ButtonCard from "../button-card/button-card";

export type CardModeSelectProps = {
  available: boolean;

  timerDeration: "medium" | "fast" | "slow"
  cards: DifficultyLevelType[]

  setCards: React.Dispatch<React.SetStateAction<DifficultyLevelType[]>>;
  setTimerDeration: React.Dispatch<
    React.SetStateAction<"fast" | "medium" | "slow">
  >;
};

const TestModeSelect: React.FC<CardModeSelectProps> = ({
  timerDeration,
  cards,
  available,
  setCards,
  setTimerDeration,
}) => {
  const { colors } = useThemeContext();
  const { t } = useTranslation();

  useEffect(() => {
    setCards([]);
  }, [available, setCards]);

  useEffect(() => {
    setTimerDeration(timerDeration);
  }, [setTimerDeration, timerDeration]);

  const toggle = (key: DifficultyLevelType) => {
    if (cards.includes(key)) {
      setCards((prev) => prev.filter((item) => item !== key));
    } else {
      setCards((prev) => [...prev, key]);
    }
  };

  const toggleTimer = () => {
    if (cards.includes(DifficultyLevelType.TimeTest)) {
      if (timerDeration === "fast") setTimerDeration("medium")
      if (timerDeration === "medium") setTimerDeration("slow")
      if (timerDeration === "slow") {
        setTimerDeration("fast")
        setCards((prev) => prev.filter((item) => item !== DifficultyLevelType.TimeTest));
      }
    } else {
      setCards((prev) => [...prev, DifficultyLevelType.TimeTest]);
    }
  }

  const getTimerSpeed = () => {
    if (timerDeration === "fast") return t("practice.timer.fast")
    else if (timerDeration === "medium") return t("practice.timer.medium")
      
    return t("practice.timer.slow")
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={[Typography.boldH3, { color: colors.TextPrimary }]}>
          {t("practice.additionally")}
        </Text>

        <View style={styles.buttonsContainer}>
          <ButtonCard<DifficultyLevelType>
            isGray
            setValue={toggleTimer}
            currentValue={cards.includes(DifficultyLevelType.TimeTest)
              ? DifficultyLevelType.TimeTest
              : false}
            value={DifficultyLevelType.TimeTest}
            text={cards.includes(DifficultyLevelType.TimeTest)
              ? `${t("practice.timeTest")} ${getTimerSpeed()}`
              : t("practice.timeTest")}
            icon={cards.includes(DifficultyLevelType.TimeTest)
              ? "timer-outline"
              : "timer-off-outline"}
          />

          <ButtonCard<DifficultyLevelType>
            isGray
            setValue={toggle}
            currentValue={cards.includes(DifficultyLevelType.OneAttempt)
              ? DifficultyLevelType.OneAttempt
              : false}
            value={DifficultyLevelType.OneAttempt}
            text={t("practice.oneAttempt")}
            icon={"alert-circle-outline"}
          />
        </View>
      </View>
    </>
  );
};

export default TestModeSelect;

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    marginTop: 16,
  },
  column: {
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
