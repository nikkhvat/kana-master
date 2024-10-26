import React from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { StatisticLevel } from "@/pages/kana/kana-list/model/types";
import { KanaAlphabet } from "@/shared/constants/kana";
import { ILetter } from "@/shared/data/lettersTable";
import getKana from "@/shared/helpers/getKanaKey";
import useGetRomanji from "@/shared/lib/i18n/hooks/useKey";
import { Typography } from "@/shared/typography";

interface CellProps {
  isLong: boolean;
  widthStandart: number;
  widthLong: number;

  active?: boolean;
  isPlus?: boolean;

  onPress?: (id: string) => void;

  kana: KanaAlphabet.Hiragana | KanaAlphabet.Katakana;

  cell: ILetter | null | undefined;

  isStartOfLine?: string | null | undefined | false;

  indicator?: StatisticLevel;
}

const Cell: React.FC<CellProps> = ({
  onPress,
  isLong,
  widthStandart,
  widthLong,
  kana,
  cell,
  isPlus,
  active,
  isStartOfLine,
  indicator,
}) => {
  const { colors } = useThemeContext();

  const indicatorColor =
    indicator === StatisticLevel.Green
      ? colors.BgSuccess
      : indicator === StatisticLevel.Yellow
        ? colors.BgWarning
        : colors.BgDanger;

  const { getRomanji } = useGetRomanji();

  return (
    <TouchableOpacity
      onPress={() => (cell ? onPress?.(cell.id) : onPress?.(""))}
      style={[
        styles.cell,
        {
          width: isLong ? widthLong : widthStandart,
          height: widthStandart,
          backgroundColor:
            active && !isPlus
              ? colors.BgAccentSecondary
              : active
                ? colors.BgAccentPrimary
                : "transparent",
          borderColor:
            (!cell || active) && !isPlus ? "transparent" : colors.BorderDefault,
        },
      ]}
    >
      {indicator && (
        <View
          style={[styles.cellIndicator, { backgroundColor: indicatorColor }]}
        ></View>
      )}
      {cell !== null && !isStartOfLine && (
        <>
          {cell && <Text style={[styles.symbol, Typography.regularH4, { color: colors.TextPrimary }]}>
            {getKana(cell, kana)}
          </Text>}
          {cell && (
            <Text style={[Typography.regularLabel, { color: colors.TextPrimary }]}>
              {getRomanji(cell).toUpperCase()}
            </Text>
          )}
        </>
      )}

      {!cell && isStartOfLine && !isPlus && (
        <Text style={[styles.symbol, Typography.regularLabel, { color: colors.TextSecondary }]}>
          {isStartOfLine}
        </Text>
      )}

      {isPlus && (
        <Text style={[styles.symbol, Typography.regularH3, { color: colors.TextPrimary }]}>
          {isStartOfLine}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Cell;

const styles = StyleSheet.create({
  cell: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    position: "relative",
  },
  cellIndicator: {
    position: "absolute",
    width: 6,
    height: 6,
    top: 5,
    right: 5,
    borderRadius: 10,
  },
  symbol: {
    textTransform: "uppercase",
  },
});
