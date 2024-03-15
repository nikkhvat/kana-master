import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { DifficultyLevelType } from "@/shared/constants/kana";
import Button from "@/shared/ui/button/button";
import Switcher from "@/shared/ui/switcher/switcher";


export type CardModeSelectProps = {
  available: boolean

  setCards: React.Dispatch<React.SetStateAction<DifficultyLevelType[]>>
  setTimerDeration: React.Dispatch<React.SetStateAction<"fast" | "medium" | "slow">>
};

const TestModeSelect: React.FC<CardModeSelectProps> = ({
  available,
  setCards,
  setTimerDeration
}) => {
  const { colors } = useThemeContext();
  const { t } = useTranslation();

  const [selectedCardMode, setSelectedCardMode] = useState<DifficultyLevelType[]>([]);
  const [timerDeration, setTimer] = useState<"fast" | "medium" | "slow">("medium");

  useEffect(() => {
    setSelectedCardMode([]);
    setCards([]);
  }, [available, setCards]);

  useEffect(() => {
    setTimerDeration(timerDeration);
  }, [setTimerDeration, timerDeration]);

  const cards = [
    [{
      title: t("difficultyLevel.timeTest"),
      key: DifficultyLevelType.TimeTest,
      condition: available,
    }],
    [{
      title: t("difficultyLevel.oneAttempt"),
      key: DifficultyLevelType.OneAttempt,
      condition: available,
    }]
  ];

  const toggle = (key: DifficultyLevelType) => {
    if (selectedCardMode.includes(key)) {
      setSelectedCardMode(prev => prev.filter((item) => item !== key));
      setCards(prev => prev.filter((item) => item !== key));
    } else {
      setSelectedCardMode(prev => [...prev, key]);
      setCards(prev => [...prev, key]);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.color4 }]}>{t("testing.cardMode")}</Text>
        <View style={styles.buttonsContainer}>
          {cards.map((column, columnIndex) => (
            <View key={`column-${columnIndex}`} style={styles.column}>
              {column.map((btn) => (
                <Button
                  key={btn.key}
                  title={btn.title}
                  fontSize={15}
                  type={btn.condition
                    ? selectedCardMode.includes(btn.key)
                      ? "weak"
                      : "inactive"
                    : "disabled"}
                  onClick={() => toggle(btn.key)}
                />
              ))}
            </View>
          ))}
        </View>
      </View>

      {selectedCardMode.includes(DifficultyLevelType.TimeTest) &&
        <Switcher
          activeTab={timerDeration}
          options={[
            "fast",
            "medium",
            "slow",
          ]}
          translate={[
            t("wordGame.timer.fast"),
            t("wordGame.timer.medium"),
            t("wordGame.timer.slow"),
          ]}
          setActiveTab={setTimer as () => void} />}
    </>
  );
};


export default TestModeSelect;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    marginBottom: 15
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    lineHeight: 22,
    letterSpacing: -0.43,
    color: "#000",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15
  },
  column: {
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
  },
  text: {
    fontWeight: "700",
    fontSize: 18
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  }
});
