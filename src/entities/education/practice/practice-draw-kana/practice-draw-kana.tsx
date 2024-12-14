import React from "react";

import { StyleSheet, Text, View } from "react-native";


import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import {
  ILetter,
} from "@/shared/data/lettersTable";
import Draw from "../../draw/draw";
import { CardMode, KanaAlphabet } from "@/shared/constants/kana";
import { useTranslation } from "react-i18next";
import { Typography } from "@/shared/typography";

interface PracticeDrawKanaProps {
  symbol: ILetter;
  kana: CardMode
  onError?: (id: number | string) => void;
  onCompleted?: (isErrors: boolean, pickedAnswer: ILetter) => void;
}

const PracticeDrawKana: React.FC<PracticeDrawKanaProps> = ({ symbol, kana, onError, onCompleted }) => {
  const { t } = useTranslation();
  const { colors } = useThemeContext();

  return (
    <>
      <View>
        <Text style={[styles.symbol, Typography.boldH1, { color: colors.TextPrimary }]}>
          {symbol?.transliterations?.[0]} ({kana === CardMode.romajiToHiragana ? t('kana.hiragana') : t('kana.katakana') })
        </Text>
      </View>
      <View style={styles.container}>
        <Draw
          onCompleted={onCompleted}
          onError={onError}
          isCheck
          letter={symbol}
          kana={kana === CardMode.romajiToHiragana ? KanaAlphabet.Hiragana : KanaAlphabet.Katakana} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  symbol: {
    textAlign: "center",
  },
  subText: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "600",
  },
});

export default PracticeDrawKana;
