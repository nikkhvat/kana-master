import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { TestMode } from "@/shared/constants/kana";
import Button from "@/shared/ui/button/button";


export type CardModeSelectProps = {
  hiraAvailable: boolean
  kanaAvailable: boolean

  setMode: React.Dispatch<React.SetStateAction<TestMode[]>>
};

const WordGameModeSelect: React.FC<CardModeSelectProps> = ({ 
  hiraAvailable,
  kanaAvailable,
  setMode,
 }) => {
  const { colors } = useThemeContext();
  const { t } = useTranslation();

  const [selectedCardMode, setSelectedCardMode] = useState<TestMode[]>([]);

  useEffect(() => {
    const initial = [];

    hiraAvailable && initial.push(TestMode.Choice);
    hiraAvailable && initial.push(TestMode.FindPair);
    hiraAvailable && initial.push(TestMode.WordBuilding);

    setSelectedCardMode(initial);
    setMode(initial);
  }, [hiraAvailable, kanaAvailable, setMode]);

  const cards =[
    [
      {
        title: t("wordGame.choice"),
        key: TestMode.Choice,
        condition: hiraAvailable || kanaAvailable,
      },
      {
        title: t("wordGame.wordBuilding"),
        key: TestMode.WordBuilding,
        condition: hiraAvailable || kanaAvailable,
      },
    ],
    [
      {
        title: t("wordGame.findThePair"),
        key: TestMode.FindPair,
        condition: hiraAvailable || kanaAvailable,
      },
    ]
  ];

  const toggle = (key: TestMode) => {
    if (selectedCardMode.includes(key)) {
      setSelectedCardMode(prev => prev.filter((item) => item !== key));
      setMode(prev => prev.filter((item) => item !== key));
    } else {
      setSelectedCardMode(prev => [...prev, key]);
      setMode(prev => [...prev, key]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.color4 }]}>{t("wordGame.mode")}</Text>
      <View style={styles.buttonsContainer}>
        {cards.map((column, columnIndex) => (
          <View key={`column-${columnIndex}`} style={styles.column}>
            {column.map((btn) => (
              <Button
                key={btn.key}
                title={btn.title}
                type={btn.condition 
                    ? selectedCardMode.includes(btn.key) 
                      ? "active" 
                      : "inactive" 
                    : "disabled"}
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
    flex: 1,
    marginTop: 30,
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
