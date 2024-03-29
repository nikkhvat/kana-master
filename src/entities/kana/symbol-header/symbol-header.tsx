import React from "react";

import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { KanaAlphabet } from "@/shared/constants/kana";
import { ILetter, dakuonFlatLettersId, handakuonFlatLettersId, yoonFlatLettersId } from "@/shared/data/lettersTable";


interface SymbolHeaderProps {
  kana: KanaAlphabet,
  letter: ILetter
}

const SymbolHeader: React.FC<SymbolHeaderProps> = ({
  kana,
  letter
}) => {
  const { colors } = useThemeContext();
  const { t } = useTranslation();
  const { i18n: { language } } = useTranslation();
  const lang = language === "ru" ? "ru" : "en";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getTypeById = (id: any) => {
    if (yoonFlatLettersId.includes(id)) return t("kana.yoon");
    if (handakuonFlatLettersId.includes(id)) return t("kana.handakuon");
    if (dakuonFlatLettersId.includes(id)) return t("kana.dakuon");

    return t("kana.basic");
  };

  const title = {
    "hiragana": t("kana.hiragana"),
    "katakana": t("kana.hiragana"),
  };
  
  return (
    <View style={styles.titleContainer}>
      <Text style={[styles.title, { color: colors.color4 }]}>
        {title[kana]}
        {" "}
        ({getTypeById(letter?.id)})
      </Text>
      <Text style={[styles.subTitle, { color: colors.color4 }]}>{letter?.[lang].toUpperCase()}</Text>
    </View>
  );
};

export default SymbolHeader;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    textTransform: "capitalize"
  },
  subTitle: {
    fontSize: 34,
    fontWeight: "700",
    marginTop: 15,
  }
});