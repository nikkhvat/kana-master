import React, { useMemo } from "react";

import { useTranslation } from "react-i18next";
import { Dimensions, View, TouchableOpacity, Text, StyleSheet } from "react-native";

import { useThemeContext } from "@/hooks/theme-context";
import { Alphabet } from "@/shared/constants/kana";
import { dakuon, handakuon, base, yoon, LettersKeys } from "@/shared/data/lettersTable";
interface EducationKanaTableProps {
  kana: "hiragana" | "katakana";
  type: Alphabet;
  onClick?: (id: LettersKeys) => void;
  last?: boolean;
}

const screenWidth = Dimensions.get("window").width;

const EducationKanaTable: React.FC<EducationKanaTableProps> = ({ kana, type, onClick = () => { }, last }) => {
  const itemWidth = useMemo(() => (screenWidth / 6) - 15, []);
  const itemWidthLong = useMemo(() => (screenWidth / 3) - (itemWidth / 3) - 23, [itemWidth]);

  const letters = useMemo(() => {
    switch (type) {
      case "base":
        return base;
      case "dakuon":
        return dakuon;
      case "handakuon":
        return handakuon;
      default:
        return yoon;
    }
  }, [type]);

  const { colors } = useThemeContext();

  const { i18n: { language } } = useTranslation();

  const lang = language === "ru" ? "ru" : "en";

  return (
    <View style={[styles.container, { borderBottomWidth: last ? 0 : 1, borderBottomColor: colors.color2 }]}>
      {letters && letters.length > 1 && (
        <View style={styles.rowButtons}>
          {letters[0].map((cell, cellIndex) => (
            <TouchableOpacity
              key={`plus_${cellIndex}`}
              style={[
                styles.cell,
                {
                  width: letters[0].length === 3 ? itemWidthLong : itemWidth,
                  height: itemWidth,
                  borderWidth: 0,
                }
              ]}
            >
              <Text style={[styles.symbol, { fontSize: 13, color: colors.color3 }]}>
                {cell?.[lang].length === 2 ? cell?.[lang][1] : cell?.[lang].length === 1 ? cell?.[lang][0] : cell.en[2]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {letters && letters.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.row}>
          <View style={styles.rowButtons}>
            <TouchableOpacity
              key={`${rowIndex}-plus`}
              style={[
                styles.cell,
                {
                  width: itemWidth,
                  height: itemWidth,
                  borderColor: colors.color2,
                  borderWidth: 0,
                }
              ]}
            >
              <Text style={[styles.symbol, { fontSize: 13, color: colors.color3 }]}>
                {"-"}
                {row[0] !== null &&
                  (row[0]?.[lang].length < 3
                    ? row[0]?.[lang][0]
                    : row[0]?.[lang][0] + row[0]?.[lang][1])}
              </Text>
            </TouchableOpacity>
          </View>
          {(row[0].en === "YA" ? [row[0], null, row[1], null, row[2]] :
            row[0].en === "WA" ? [row[0], null, null, null, row[1]] :
              row[0].en === "N" ? [null, null, row[0], null, null] :
                row).map((cell, cellIndex) => (
                  <TouchableOpacity
                    key={`${rowIndex}-${cellIndex}`}
                    onPress={() => cell && onClick(cell.id)}
                    style={[
                      styles.cell,
                      {
                        width: row.length === 3 && row[0].en !== "YA" ? itemWidthLong : itemWidth,
                        height: itemWidth,
                        backgroundColor: "transparent",
                        borderColor: cell === null ? "transparent" : colors.color2,
                      }
                    ]}
                  >
                    <Text style={[styles.symbol, { fontSize: 17, color: colors.color4 }]}>
                      {cell && cell[kana === "hiragana" ? "hi" : "ka"]}
                    </Text>
                    {cell && <Text style={[styles.subText, { color: colors.color4 }]}>{cell?.[lang].toUpperCase()}</Text>}
                  </TouchableOpacity>
                ))}
        </View>
      ))}
    </View>
  );
};

export default EducationKanaTable;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 15,
    marginBottom: 30,
    paddingBottom: 30,
    gap: 9,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 9,
  },
  rowButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 9
  },
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
