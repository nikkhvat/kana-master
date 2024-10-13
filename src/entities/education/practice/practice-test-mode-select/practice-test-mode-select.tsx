import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { DifficultyLevelType } from "@/shared/constants/kana";
import Switcher from "@/shared/ui/switcher/switcher";

import { Typography } from "@/shared/typography";
import SecondaryButton from "@/shared/ui/buttons/Secondary/secondary-button";

export type CardModeSelectProps = {
  available: boolean;

  setCards: React.Dispatch<React.SetStateAction<DifficultyLevelType[]>>;
  setTimerDeration: React.Dispatch<
    React.SetStateAction<"fast" | "medium" | "slow">
  >;
};

const TestModeSelect: React.FC<CardModeSelectProps> = ({
  available,
  setCards,
  setTimerDeration,
}) => {
  const { colors } = useThemeContext();
  const { t } = useTranslation();

  const [selectedCardMode, setSelectedCardMode] = useState<
    DifficultyLevelType[]
  >([]);
  const [timerDeration, setTimer] = useState<"fast" | "medium" | "slow">(
    "medium",
  );

  useEffect(() => {
    setSelectedCardMode([]);
    setCards([]);
  }, [available, setCards]);

  useEffect(() => {
    setTimerDeration(timerDeration);
  }, [setTimerDeration, timerDeration]);

  const cards = [
    [
      {
        title: t("difficultyLevel.timeTest"),
        key: DifficultyLevelType.TimeTest,
        condition: available,
      },
    ],
    [
      {
        title: t("difficultyLevel.oneAttempt"),
        key: DifficultyLevelType.OneAttempt,
        condition: available,
      },
    ],
  ];

  const toggle = (key: DifficultyLevelType) => {
    if (selectedCardMode.includes(key)) {
      setSelectedCardMode((prev) => prev.filter((item) => item !== key));
      setCards((prev) => prev.filter((item) => item !== key));
    } else {
      setSelectedCardMode((prev) => [...prev, key]);
      setCards((prev) => [...prev, key]);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={[Typography.boldH3, { color: colors.TextPrimary }]}>
          {t("testing.testMode")}
        </Text>

        <View style={styles.buttonsContainer}>
          {cards.map((column, columnIndex) => (
            <View key={`column-${columnIndex}`} style={styles.column}>
              {column.map((btn) => (
                <SecondaryButton
                  isHapticFeedback
                  key={btn.key}
                  text={btn.title}
                  isDisabled={!btn.condition}
                  isOutline={!selectedCardMode.includes(btn.key)}
                  onClick={() => toggle(btn.key)}
                />
              ))}
            </View>
          ))}
        </View>
      </View>

      {selectedCardMode.includes(DifficultyLevelType.TimeTest) && (
        <Switcher
          activeTab={timerDeration}
          options={["fast", "medium", "slow"]}
          translate={[
            t("practice.timer.fast"),
            t("practice.timer.medium"),
            t("practice.timer.slow"),
          ]}
          setActiveTab={setTimer as () => void}
        />
      )}
    </>
  );
};

export default TestModeSelect;

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    marginBottom: 16,
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
