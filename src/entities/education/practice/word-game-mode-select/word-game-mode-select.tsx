import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { TestMode } from "@/shared/constants/kana";

import SecondaryButton from "@/shared/ui/buttons/Secondary/secondary-button";
import { Typography } from "@/shared/typography";

export type CardModeSelectProps = {
  isHiraganaAvailable: boolean;
  isKatakanaAvailable: boolean;

  modeAvailable: boolean;

  setMode: React.Dispatch<React.SetStateAction<TestMode[]>>;
};

const WordGameModeSelect: React.FC<CardModeSelectProps> = ({
  isHiraganaAvailable,
  isKatakanaAvailable,

  modeAvailable,

  setMode,
}) => {
  const { colors } = useThemeContext();
  const { t } = useTranslation();

  const [selectedCardMode, setSelectedCardMode] = useState<TestMode[]>([]);

  useEffect(() => {
    const initial = [];

    modeAvailable && initial.push(TestMode.Choice);
    modeAvailable && initial.push(TestMode.FindPair);
    modeAvailable && initial.push(TestMode.WordBuilding);

    setSelectedCardMode(initial);
    setMode(initial);
  }, [isHiraganaAvailable, isKatakanaAvailable, modeAvailable, setMode]);

  const cards = [
    [
      {
        title: t("wordGame.choice"),
        key: TestMode.Choice,
        condition: modeAvailable,
      },
      {
        title: t("wordGame.wordBuilding"),
        key: TestMode.WordBuilding,
        condition: modeAvailable,
      },
    ],
    [
      {
        title: t("wordGame.findThePair"),
        key: TestMode.FindPair,
        condition: modeAvailable,
      },
    ],
  ];

  const toggle = (key: TestMode) => {
    if (selectedCardMode.includes(key)) {
      setSelectedCardMode((prev) => prev.filter((item) => item !== key));
      setMode((prev) => prev.filter((item) => item !== key));
    } else {
      setSelectedCardMode((prev) => [...prev, key]);
      setMode((prev) => [...prev, key]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[Typography.boldH3, { color: colors.TextPrimary }]}>
        {t("wordGame.mode")}
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
  );
};

export default WordGameModeSelect;

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
    gap: 16,
  },
  text: {
    fontWeight: "700",
    fontSize: 18,
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
