import React, { useMemo } from "react";

import { useTranslation } from "react-i18next";
import { Dimensions, View, StyleSheet } from "react-native";

import Cell from "@/entities/kana/cell/cell";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { Alphabet } from "@/shared/constants/kana";
import { dakuon, handakuon, base, yoon, LettersKeys, ILetter } from "@/shared/data/lettersTable";
import { useAppSelector } from "@/shared/model/hooks";
interface EducationKanaTableProps {
  kana: "hiragana" | "katakana";
  type: Alphabet;
  onClick?: (id: LettersKeys) => void;
  last?: boolean;
}

const screenWidth = Dimensions.get("window").width;
const screenAdaptiveWidth = screenWidth > 500 ? screenWidth * 0.75 : screenWidth;
const itemWidth = (screenAdaptiveWidth / 6) - 14;
const itemWidthLong = (screenAdaptiveWidth / 3) - (itemWidth / 3) - 23;

const EducationKanaTable: React.FC<EducationKanaTableProps> = ({ 
  kana, 
  type, 
  onClick = () => { }, 
  last }) => {

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

  const levels = useAppSelector((state) => state.statistics.statistics[kana]);
  const isEnabledStats = useAppSelector((state) => state.statistics.isEnabled);
  
  const { colors } = useThemeContext();

  const { i18n: { language } } = useTranslation();

  const lang = language === "ru" ? "ru" : "en";

  const getStartOfRow = (letter: ILetter) => {
    return (letter?.[lang].length < 3
      ? letter?.[lang][0]
      : letter?.[lang][0] + letter?.[lang][1]) + "-";
  };
  
  const getEndOfColumn = (letter: ILetter) => {
    return "-" + (letter?.[lang].length === 2 ? 
        letter?.[lang][1] : 
        letter?.[lang].length === 1 ? 
        letter?.[lang][0] : letter.en[2]);
  };

  return (
    <View style={[
      styles.container, 
      { borderBottomWidth: last ? 0 : 1, borderBottomColor: colors.color2 }]}>
      {letters && letters.length > 1 && (
        <View style={styles.rowButtons}>
          {letters[0].map((cell, cellIndex) => (
            <Cell
              key={`${cellIndex}/start_of_column`}
              isLong={letters[0].length === 3}
              widthStandart={itemWidth}
              widthLong={itemWidthLong}
              lang={lang}
              kana={kana}
              cell={null}
              isStartOfLine={getEndOfColumn(cell)}
            />
          ))}
        </View>
      )}
      {letters && letters.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.row}>
          <View style={styles.rowButtons}>
            <Cell
              key={`${rowIndex}/start_of_line`}
              isLong={false}
              widthStandart={itemWidth}
              widthLong={itemWidthLong}
              lang={lang}
              kana={kana}
              cell={null}
              isStartOfLine={getStartOfRow(row[0])}
            />
          </View>
          {(row[0].en === "YA" ? [row[0], null, row[1], null, row[2]] :
            row[0].en === "WA" ? [row[0], null, null, null, row[1]] :
            row[0].en === "N" ? [null, null, row[0], null, null] : row).map((cell, cellIndex) => (
              <Cell 
                key={`${rowIndex}/${cellIndex}`}
                onPress={() => cell && onClick(cell.id)}
                isLong={row.length === 3 && row[0].en !== "YA"}
                widthStandart={itemWidth}
                widthLong={itemWidthLong}
                lang={lang}
                kana={kana}
                cell={cell}
                indicator={(cell && isEnabledStats) ? levels[cell.id]?.level : undefined}
              />
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
    width: "100%",
    alignItems: "center",
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
});
