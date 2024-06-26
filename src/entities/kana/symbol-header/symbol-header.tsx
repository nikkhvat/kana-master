import React from "react";

import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { KanaAlphabet } from "@/shared/constants/kana";
import { ILetter, dakuonFlatLettersId, handakuonFlatLettersId, yoonFlatLettersId } from "@/shared/data/lettersTable";
import useGetRomanji from "@/shared/lib/i18n/hooks/useKey";


interface SymbolHeaderProps {
  kana: KanaAlphabet,
  letter: ILetter

  hideTitle?: boolean
  bottomTitle?: boolean

  indicatorColor?: string | null
}

const SymbolHeader: React.FC<SymbolHeaderProps> = ({
  kana,
  letter,
  hideTitle,
  bottomTitle,
  indicatorColor
}) => {
  const { colors } = useThemeContext();
  const { t } = useTranslation();

  const { getRomanji } = useGetRomanji();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getTypeById = (id: any) => {
    if (yoonFlatLettersId.includes(id)) return t("kana.yoon");
    if (handakuonFlatLettersId.includes(id)) return t("kana.handakuon");
    if (dakuonFlatLettersId.includes(id)) return t("kana.dakuon");

    return t("kana.basic");
  };

  const title = {
    "hiragana": t("kana.hiragana"),
    "katakana": t("kana.katakana"),
  };
  
  
  return (
    <View style={styles.titleContainer}>
      {indicatorColor && <View style={[{
        backgroundColor: indicatorColor,
        width: 6,
        height: 6,
        borderRadius: 6,
        position: "absolute",
        top: 15,
        right: -5
      }]} />}
      {(!hideTitle && !bottomTitle) && <Text style={[styles.title, { color: colors.color4 }]}>
        {title[kana]}
        {" "}
        ({getTypeById(letter?.id)})
      </Text>}
      <Text style={[styles.subTitle, { color: colors.color4 }]}>
        {getRomanji(letter).toUpperCase()}
      </Text>
      {(!hideTitle && bottomTitle) && <Text style={[styles.title, { color: colors.color4 }]}>
        {title[kana]}
        {" "}
        ({getTypeById(letter?.id)})
      </Text>}
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