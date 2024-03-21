import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { CardMode } from "@/shared/constants/kana";
import Button from "@/shared/ui/button/button";


export type CardModeSelectProps = {
  hiraAvailable: boolean
  kanaAvailable: boolean

  setCards: React.Dispatch<React.SetStateAction<CardMode[]>>
};

const CardModeSelect: React.FC<CardModeSelectProps> = ({ 
  hiraAvailable,
  kanaAvailable,
  setCards,
 }) => {
  const { colors } = useThemeContext();
  const { t } = useTranslation();

  const [selectedCardMode, setSelectedCardMode] = useState<CardMode[]>([]);

  useEffect(() => {
    const initial = [];

    hiraAvailable && initial.push(CardMode.hiraganaToRomaji);
    hiraAvailable && initial.push(CardMode.romajiToHiragana);
    kanaAvailable && initial.push(CardMode.katakanaToRomaji);
    kanaAvailable && initial.push(CardMode.romajiToKatakana);

    setSelectedCardMode(initial);
    setCards(initial);
  }, [hiraAvailable, kanaAvailable, setCards]);

  enum CardType {
    Active,
    Incative,
    Disbled
  }

  const getTextStyle = (type: CardType) => [
    styles.text, 
    { 
      color: type === CardType.Active ? colors.color5 :
        type === CardType.Incative ? colors.color4 : colors.color3
    }
  ];

  const icon = (type: CardType) => <Icon 
    name={"chevron-right"} 
    size={16}
    color={type === CardType.Active ? colors.color5 :
      type === CardType.Incative ? colors.color4 : colors.color3} />;

  const cards =[
    [
      {
        title: (type: CardType) => <View style={styles.line} >
          <Text style={getTextStyle(type)}>あ</Text>
          {icon(type)}
          <Text style={getTextStyle(type)}>A</Text>
        </View>,
        key: CardMode.hiraganaToRomaji,
        condition: hiraAvailable
      },
      {
        title: (type: CardType) => <View style={styles.line} >
          <Text style={getTextStyle(type)}>A</Text>
          {icon(type)}
          <Text style={getTextStyle(type)}>あ</Text>
        </View>,
        key: CardMode.romajiToHiragana,
        condition: hiraAvailable
      },
      {
        title: (type: CardType) => <View style={styles.line} >
          <Text style={getTextStyle(type)}>あ</Text>
          {icon(type)}
          <Text style={getTextStyle(type)}>ア</Text>
        </View>,
        key: CardMode.hiraganaToKatakana,
        condition: hiraAvailable && kanaAvailable
      },
    ],
    [
      {
        title: (type: CardType) => <View style={styles.line} >
          <Text style={getTextStyle(type)}>ア</Text>
          {icon(type)}
          <Text style={getTextStyle(type)}>A</Text>
        </View>,
        key: CardMode.katakanaToRomaji,
        condition: kanaAvailable
      },
      {
        title: (type: CardType) => <View style={styles.line} >
          <Text style={getTextStyle(type)}>A</Text>
          {icon(type)}
          <Text style={getTextStyle(type)}>ア</Text>
        </View>,
        key: CardMode.romajiToKatakana,
        condition: kanaAvailable
      },
      {
        title: (type: CardType) => <View style={styles.line} >
          <Text style={getTextStyle(type)}>ア</Text>
          {icon(type)}
          <Text style={getTextStyle(type)}>あ</Text>
        </View>,
        key: CardMode.katakanaToHiragana,
        condition: hiraAvailable && kanaAvailable
      },
    ],
  ];

  const toggle = (key: CardMode) => {
    if (selectedCardMode.includes(key)) {
      setSelectedCardMode(prev => prev.filter((item) => item !== key));
      setCards(prev => prev.filter((item) => item !== key));
    } else {
      setSelectedCardMode(prev => [...prev, key]);
      setCards(prev => [...prev, key]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.color4 }]}>{t("testing.cardMode")}</Text>
      <View style={styles.buttonsContainer}>
        {cards.map((column, columnIndex) => (
          <View key={`column-${columnIndex}`} style={styles.column}>
            {column.map((btn) => (
              <Button
                key={btn.key}
                title={btn.title(btn.condition ? selectedCardMode.includes(btn.key)
                  ? CardType.Active
                  : CardType.Incative 
                  : CardType.Disbled)}
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


export default CardModeSelect;

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
    fontSize: 15
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  }
});
