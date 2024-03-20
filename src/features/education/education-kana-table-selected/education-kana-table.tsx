import React, { useCallback, useMemo } from "react";

import { useTranslation } from "react-i18next";
import { Dimensions, View, ScrollView, StyleSheet } from "react-native";

import { RootState } from "@/app/store";
import Cell from "@/entities/kana/cell/cell";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { toggleLetter, toggleSome } from "@/pages/education/kana-quick-selection/model/slice";
import { Alphabet } from "@/shared/constants/kana";
import { ILetter, dakuon, handakuon, base, yoon } from "@/shared/data/lettersTable";
import { getLettersWithStatuses } from "@/shared/helpers/kana";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";

interface EducationKanaTableProps {
  kana: "hiragana" | "katakana";
  type: Alphabet;
  isEditMode?: boolean;
  last?: boolean
}

const screenWidth = Dimensions.get("window").width;
const screenAdaptiveWidth = screenWidth > 500 ? screenWidth * 0.75 : screenWidth;
const itemWidth = (screenAdaptiveWidth / 6) - 15;
const itemWidthLong = (screenAdaptiveWidth / 3) - (itemWidth / 3) - 23;

const EducationKanaTableSelected: React.FC<EducationKanaTableProps> = ({
  kana,
  type,
  isEditMode,
  last
}) => {
  const dispatch = useAppDispatch();

  const { i18n: { language } } = useTranslation();

  const lang = language === "ru" ? "ru" : "en";

  const { colors } = useThemeContext();

  const getData = useCallback((type: Alphabet) => {
    if (type === "base") return base;
    else if (type === "dakuon") return dakuon;
    else if (type === "handakuon") return handakuon;
    else if (type === "yoon") return yoon;
  }, []);

  const selectedLetters = useAppSelector(
    (state: RootState) => state.kana.selected[type][kana]
  );

  const data = useMemo(() => getData(type), [getData, type]);

  const onToggleLetter = useCallback(
    (letter: ILetter, alphabet: "base" | "dakuon" | "handakuon" | "yoon") => {
      dispatch(
        toggleLetter({
          letter: letter,
          alphabet,
          kana: kana,
        })
      );
    },
    [dispatch, kana]
  );

  const onPress = useCallback(
    (
      val: [cell: ILetter, rowIndex: number, cellIndex: number, type: string]
    ) => {
      onToggleLetter(
        val[0],
        val[3] === "basic"
          ? "base"
          : (val[3] as "base" | "dakuon" | "handakuon" | "yoon")
      );
    },
    [onToggleLetter]
  );

  const onToggleSome = useCallback(
    (
      letters: ILetter[],
      alphabet: "base" | "dakuon" | "handakuon" | "yoon"
    ) => {
      dispatch(
        toggleSome({
          letter: letters,
          alphabet,
          kana: kana,
        })
      );
    },
    [dispatch, kana]
  );

  const onPlus = useCallback(
    (type: "row" | "cell", index: number, alphabet: Alphabet) => {

      const dataMap = {
        base: base,
        dakuon: dakuon,
        handakuon: handakuon,
        yoon: yoon,
      };

      const data = dataMap[alphabet] || [];

      const isILetter = (element: ILetter): element is ILetter => {
        return typeof element === "object";
      };

      const letters: ILetter[] =
        type === "row"
          ? (data[index].filter(isILetter) as ILetter[])
          : (data.flatMap((row) =>
            isILetter(row[index]) ? [row[index]] : []
          ) as ILetter[]);

      onToggleSome(letters, alphabet);
    },
    []
  );

  const letters = useMemo(
    () => getLettersWithStatuses(data, selectedLetters),
    [data, selectedLetters]
  );

  return (
    <View style={[styles.container, { borderBottomWidth: last ? 0 : 1, borderBottomColor: colors.color2 }]}>
      {letters.length > 1 && (
        <View style={styles.rowButtons}>
          {letters[0].items.map((cell, cellIndex) => {
            return (
              <Cell
                key={`${cellIndex}/plus`}
                isLong={letters[0].items.length === 3}
                widthStandart={itemWidth}
                widthLong={itemWidthLong}
                lang={lang}
                kana={kana}
                cell={null}
                isPlus
                onPress={() => onPlus?.("cell", cellIndex, type)}
                isStartOfLine={isEditMode ? "+" : "-"}
              />
            );
          })}
        </View>
      )}


      <ScrollView>
        {letters.map((row, rowIndex) => (
          <View key={`row-${rowIndex}`} style={[styles.row, { marginTop: 10 }]}>
            <View style={styles.rowButtons}>
              <Cell
                key={`${rowIndex}/start_of_line`}
                isLong={false}
                widthStandart={itemWidth}
                widthLong={itemWidthLong}
                lang={lang}
                kana={kana}
                cell={null}
                isPlus
                onPress={() => onPlus?.("row", rowIndex, type)}
                isStartOfLine={isEditMode ? "+" : "-"}
              />
            </View>
            {(
              row.items[0].data.en === "YA" ? [row.items[0], null, row.items[1], null, row.items[2]] :
                row.items[0].data.en === "WA" ? [row.items[0], null, null, null, row.items[1]] :
                  row.items[0].data.en === "N" ? [null, null, row.items[0], null, null]
                    : row.items).map((cell, cellIndex) => {
                      return (
                        <Cell
                          key={`${rowIndex}/${cellIndex}`}
                          onPress={() => cell?.data && onPress?.([cell.data, rowIndex, cellIndex, type])}
                          isLong={row.items.length === 3 && row.items[0].data.en !== "YA"}
                          widthStandart={itemWidth}
                          widthLong={itemWidthLong}
                          lang={lang}
                          kana={kana}
                          cell={cell?.data}
                          active={cell?.active}
                        />
                      );
                    })}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default EducationKanaTableSelected;

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
});
