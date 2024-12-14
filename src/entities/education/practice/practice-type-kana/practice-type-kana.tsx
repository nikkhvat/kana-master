import React, { useState } from "react";

import { StyleSheet, Text, TextInput, View } from "react-native";


import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import {
  ILetter,
} from "@/shared/data/lettersTable";
import { Kana, TEST_DELAY } from "@/shared/constants/kana";
import { useTranslation } from "react-i18next";
import { Typography } from "@/shared/typography";
import PrimaryButton from "@/shared/ui/buttons/Primary/primary-button";
import { useTransliterationsContext } from "@/features/settings/settings-transliterations/context/transliteration";

interface PracticeTypeKanaProps {
  symbol: ILetter;
  kana: Kana
  onError?: (id: number | string) => void;
  onCompleted?: (isErrors: boolean, pickedAnswer: ILetter) => void;
}

const PracticeTypeKana: React.FC<PracticeTypeKanaProps> = ({ symbol, kana, onCompleted, onError }) => {
  const { t } = useTranslation();
  const { colors } = useThemeContext();

  const { transliterations } = useTransliterationsContext();

  const key = kana === Kana.Katakana ? "ka" : "hi"

  const [val, setVal] = useState<string | null>();

  const [status, setStatus] = useState<null | "red" | "green">();

  return (
    <>
      <View style={{
        flex: 1,
        width: "100%"
      }} >
        <Text style={[styles.symbol, Typography.boldH1, { color: colors.TextPrimary }]}>
          {symbol?.[key]} ({kana === Kana.Hiragana ? t('kana.hiragana') : t('kana.katakana') })
        </Text>
        
        <TextInput 
          style={{
            backgroundColor: colors.BgPrimary,
            borderColor: status === "green" ? colors.BorderSuccess : status === "red" ? colors.BorderDanger : colors.BorderDefault,
            borderWidth: 1,
            marginBottom: 15,
            marginTop: 15,
            borderRadius: 12,
            color: colors.TextPrimary,
            fontSize: 22,
            lineHeight: 26,
            fontWeight: "600",
            padding: 8,
          }}
          value={val || ""}
          onChangeText={(val) => {
            setVal(val)
          }}
        />
        <PrimaryButton text={t('practice.check')} onClick={() => {
          if (!val) return

          if (val.toLowerCase() === symbol?.transliterations?.[transliterations].toLowerCase()) {
            setStatus("green")
          } else {
            setStatus("red")
          }

          setTimeout(() => {
            if (val.toLowerCase() === symbol?.transliterations?.[transliterations].toLowerCase()) {
              onCompleted?.(true, symbol)
            } else {
              onError?.(symbol.id)
              onCompleted?.(false, symbol)
            }

            setStatus(null)  
            setVal(null); 
          }, TEST_DELAY);
        }} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  symbol: {
    textAlign: "center",
  },
  subText: {
    textAlign: "auto",
    fontSize: 17,
    fontWeight: "600",
  },
});

export default PracticeTypeKana;
