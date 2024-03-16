import React from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { ILetter } from "@/shared/data/lettersTable";

interface CellProps {
  isLong: boolean
  widthStandart: number
  widthLong: number

  active?: boolean
  isPlus?: boolean

  onPress?: (id: string) => void

  lang: "ru" | "en",
  kana: "hiragana" | "katakana"

  cell: ILetter | null | undefined

  isStartOfLine?: string | null | undefined | false

  indicator?: "green" | "yellow" | "red"
}

const Cell: React.FC<CellProps> = ({
  onPress,
  isLong,
  widthStandart,
  widthLong,
  lang,
  kana,
  cell,
  isPlus,
  active,
  isStartOfLine,
  indicator
}) => {

  const { colors } = useThemeContext();

  const indicatorColor = indicator === "green"
    ? colors.second_color2 : indicator === "yellow"
    ? colors.second_color5 : colors.second_color1;

  return (
    <TouchableOpacity
      onPress={() => (cell) ? onPress?.(cell.id) : onPress?.("")}
      style={[
        styles.cell,
        {
          width: isLong ? widthLong : widthStandart,
          height: widthStandart,
          backgroundColor: (active && !isPlus) ? colors.second_color4 : active ? colors.second_color3 : "transparent",
          borderColor: (((!cell || active) && !isPlus)) ? "transparent" : colors.color2,
        }
      ]}
    >
      {indicator && <View style={[styles.cellIndicator, { backgroundColor: indicatorColor }]} ></View>}
      {(cell !== null && !isStartOfLine) && <>
        <Text style={[styles.symbol, { fontSize: 17, color: colors.color4 }]}>
          {cell && cell[kana === "hiragana" ? "hi" : "ka"]}
        </Text>
        {cell && 
          <Text 
            style={[
              styles.subText, 
              { color: colors.color4 }]} >
            {cell?.[lang].toUpperCase()}
          </Text>}
      </>}

      {(!cell && isStartOfLine && !isPlus) && <Text style={[styles.symbol, { fontSize: 13, color: colors.color3 }]}>
        {isStartOfLine}
      </Text>}

      {isPlus && <Text style={[styles.symbol, { fontSize: 17, color: colors.color4 }]}>
        {isStartOfLine}
      </Text>}
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
    position: "relative"
  },
  cellIndicator: {
    position: "absolute",
    width: 6,
    height: 6,
    top: 5,
    right: 5,
    borderRadius: 10
  },
  symbol: {
    fontWeight: "400",
  },
  subText: {
    fontSize: 13,
  },
});
