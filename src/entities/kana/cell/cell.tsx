import React, { ReactNode } from "react";

import { Pressable, StyleSheet, Text, View } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { KanaAlphabet } from "@/shared/constants/kana";
import { ILetter } from "@/shared/data/lettersTable";
import getKana from "@/shared/helpers/getKanaKey";
import useGetRomanji from "@/shared/lib/i18n/hooks/useKey";
import { Typography } from "@/shared/typography";
import { StatisticLevel } from "@/pages/kana/kana-table-list-page/model/types";
import PrimaryButton from "@/shared/ui/buttons/Primary/primary-button";
import { useAppSelector } from "@/shared/model/hooks";

import * as Haptics from "expo-haptics";

interface CellProps {
  isLong: boolean;
  widthDefault: number;
  widthLong: number;

  active?: boolean;
  isPlus?: boolean;

  onPress?: (id: string) => void;

  kana: KanaAlphabet.Hiragana | KanaAlphabet.Katakana;

  cell: ILetter | null | undefined;

  isStartOfLine?: string | null | undefined | false | ReactNode;

  indicator?: StatisticLevel;
}

const Cell: React.FC<CellProps> = ({
  onPress,

  isLong,
  widthDefault,
  widthLong,
  kana,
  cell,
  isPlus,
  active,
  isStartOfLine,
  indicator,
}) => {
  const { colors } = useThemeContext();
  const { getRomanji } = useGetRomanji();

  const isEnabledHaptic = useAppSelector(
    (state) => state.profile.isEnabledHaptic,
  );

  const getIndicatorColor = (indicator?: StatisticLevel) => {
    switch (indicator) {
      case StatisticLevel.Green: return colors.BgSuccess
      case StatisticLevel.Yellow: return colors.BgWarning
      case StatisticLevel.Red: return colors.BgDanger
      default:
        return "transparent"
    }
  }

  if (isPlus) {
    return (
      <PrimaryButton
        onClick={() => onPress?.("")}
        isHapticFeedback
        containerStylesFunc={({ pressed }) => [
          styles.cell,
          {
            width: isLong ? widthLong : widthDefault,
            height: widthDefault,
            backgroundColor: active ? pressed ? colors.BgAccentPrimaryPressed : colors.BgAccentPrimary : pressed ? colors.BgPrimaryPressed : "transparent",
            borderColor: colors.BorderDefault,
          },
        ]}
        icon={isStartOfLine as React.ReactElement}
      />
    )
  }

  return (
    <Pressable
      onPress={() => {
        if (cell) {
          if (isEnabledHaptic) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }

          onPress?.(cell.id)
        } else {
          onPress?.("")
        }
      }}
      style={[
        styles.cell,
        {
          width: isLong ? widthLong : widthDefault,
          height: widthDefault,
          backgroundColor: active ? colors.BgAccentSecondary : "transparent",
          borderColor:
            (!cell || active) ? "transparent" : colors.BorderDefault,
        },
      ]}
    >
      <View style={[styles.cellIndicator, { backgroundColor: getIndicatorColor(indicator) }]} ></View>

      {cell && (
        <>
          <Text style={[Typography.regularH4, { color: colors.TextPrimary }]}>
            {getKana(cell, kana)}
          </Text>

          <Text style={[Typography.regularLabel, { color: colors.TextPrimary }]}>
            {getRomanji(cell).toUpperCase()}
          </Text>
        </>
      )}

      {!cell && !isPlus && (
        <Text style={[Typography.regularLabel, { color: colors.TextSecondary }]}>
          {isStartOfLine}
        </Text>
      )}
    </Pressable>
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
});
