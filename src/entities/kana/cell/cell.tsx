import React from "react";

import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { useThemeContext } from "@/hooks/theme-context";
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
  isStartOfLine
}) => {

  const { colors } = useThemeContext();

  return (
    <TouchableOpacity
      onPress={() => cell && onPress?.(cell.id)}
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
  },
  symbol: {
    fontWeight: "400",
  },
  subText: {
    fontSize: 13,
  },
});
