import React, { useCallback, useMemo } from "react";

import { Dimensions, View, ScrollView, StyleSheet, Text } from "react-native";

import { RootState } from "@/app/store";
import Cell from "@/entities/kana/cell/cell";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import {
  setKanaSelected,
  toggleLetter,
  toggleSome,
} from "@/pages/kana/kana-quick-selection/model/slice";
import { Alphabet, KanaAlphabet, KanaSection, LETTERS_COUNT } from "@/shared/constants/kana";
import {
  ILetter,
  dakuon,
  handakuon,
  base,
  yoon,
} from "@/shared/data/lettersTable";
import { getLettersWithStatuses } from "@/shared/helpers/kana";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";

interface EducationKanaTableProps {
  kana: KanaAlphabet.Hiragana | KanaAlphabet.Katakana;
  type: Alphabet;
  last?: boolean;
}

const screenWidth = Dimensions.get("window").width;
const screenAdaptiveWidth =
  screenWidth > 500 ? screenWidth * 0.68 : screenWidth;
const itemWidth = screenAdaptiveWidth / 6 - 16;
const itemWidthLong = screenAdaptiveWidth / 3 - itemWidth / 3 - 23;

const EducationKanaTableSelected: React.FC<EducationKanaTableProps> = ({
  kana,
  type,
  last,
}) => {
  const dispatch = useAppDispatch();

  const { colors } = useThemeContext();

  const getData = useCallback((type: Alphabet) => {
    if (type === "base") return base;
    else if (type === "dakuon") return dakuon;
    else if (type === "handakuon") return handakuon;
    else if (type === "yoon") return yoon;
  }, []);

  const selected = useAppSelector(
    (state: RootState) => state.kana.selected,
  );

  const selectedLetters = selected[type][kana]

  const data = useMemo(() => getData(type), [getData, type]);

  const onToggleLetter = useCallback(
    (letter: ILetter, alphabet: "base" | "dakuon" | "handakuon" | "yoon") => {
      dispatch(
        toggleLetter({
          letter: letter,
          alphabet,
          kana: kana,
        }),
      );
    },
    [dispatch, kana],
  );

  const onPress = useCallback(
    (
      val: [cell: ILetter, rowIndex: number, cellIndex: number, type: string],
    ) => {
      onToggleLetter(
        val[0],
        val[3] === "basic"
          ? "base"
          : (val[3] as "base" | "dakuon" | "handakuon" | "yoon"),
      );
    },
    [onToggleLetter],
  );

  const onToggleSome = useCallback(
    (
      letters: ILetter[],
      alphabet: "base" | "dakuon" | "handakuon" | "yoon",
    ) => {
      dispatch(
        toggleSome({
          letter: letters,
          alphabet,
          kana: kana,
        }),
      );
    },
    [dispatch, kana],
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
              isILetter(row[index]) ? [row[index]] : [],
            ) as ILetter[]);

      onToggleSome(letters, alphabet);
    },
    [onToggleSome],
  );

  const letters = useMemo(
    () => getLettersWithStatuses(data, selectedLetters),
    [data, selectedLetters],
  );

  const getKanaSelected = () => {
    if (type === "base" && kana === KanaAlphabet.Hiragana) return KanaSection.BasicHiragana
    if (type === "base" && kana === KanaAlphabet.Hiragana) return KanaSection.BasicKatakana
    if (type === "dakuon" && kana === KanaAlphabet.Hiragana) return KanaSection.DakuonHiragana
    if (type === "dakuon" && kana === KanaAlphabet.Hiragana) return KanaSection.DakuonKatakana
    if (type === "handakuon" && kana === KanaAlphabet.Hiragana) return KanaSection.HandakuonHiragana
    if (type === "handakuon" && kana === KanaAlphabet.Hiragana) return KanaSection.HandakuonKatakana
    if (type === "yoon" && kana === KanaAlphabet.Hiragana) return KanaSection.YoonHiragana
    if (type === "yoon" && kana === KanaAlphabet.Hiragana) return KanaSection.YoonKatakana
  }
  
  const isKanaSelected = () => {
    const IS_BASIC_HIRA = selected.base.hiragana.length === LETTERS_COUNT.basic;
    const IS_DAKUON_HIRA = selected.dakuon.hiragana.length === LETTERS_COUNT.dakuon;
    const IS_HANDAKUON_HIRA = selected.handakuon.hiragana.length === LETTERS_COUNT.handakuon;
    const IS_YOON_HIRA = selected.yoon.hiragana.length === LETTERS_COUNT.yoon;

    const IS_BASIC_KATA = selected.base.katakana.length === LETTERS_COUNT.basic;
    const IS_DAKUON_KATA = selected.dakuon.katakana.length === LETTERS_COUNT.dakuon;
    const IS_HANDAKUON_KATA = selected.handakuon.katakana.length === LETTERS_COUNT.handakuon;
    const IS_YOON_KATA = selected.yoon.katakana.length === LETTERS_COUNT.yoon;


    if (type === "base" && kana === KanaAlphabet.Hiragana) return IS_BASIC_HIRA
    if (type === "base" && kana === KanaAlphabet.Hiragana) return IS_BASIC_KATA
    if (type === "dakuon" && kana === KanaAlphabet.Hiragana) return IS_DAKUON_HIRA
    if (type === "dakuon" && kana === KanaAlphabet.Hiragana) return IS_DAKUON_KATA
    if (type === "handakuon" && kana === KanaAlphabet.Hiragana) return IS_HANDAKUON_HIRA
    if (type === "handakuon" && kana === KanaAlphabet.Hiragana) return IS_HANDAKUON_KATA
    if (type === "yoon" && kana === KanaAlphabet.Hiragana) return IS_YOON_HIRA
    if (type === "yoon" && kana === KanaAlphabet.Hiragana) return IS_YOON_KATA
  }

  return (
    <View
      style={[
        styles.container,
        { borderBottomWidth: last ? 0 : 1, borderBottomColor: colors.BorderDefault },
      ]}
    >
      {letters.length > 1 && (
        <View style={styles.rowButtons}>
          <Cell
            key={`selectAll`}
            isLong={false}
            widthDefault={itemWidth}
            widthLong={itemWidthLong}
            active={isKanaSelected()}
            kana={kana}
            cell={null}
            isPlus
            onPress={() => dispatch(setKanaSelected(getKanaSelected()))}
            isStartOfLine={!isKanaSelected() ? 
              <Icon name={"check-all"} size={18} color={colors.IconContrast} /> :
              <Icon name={"close"} size={18} color={colors.IconContrast} />
            }
          />

          {letters[0].items.map((cell, cellIndex) => {
            return (
              <Cell
                key={`${cellIndex}/plus`}
                isLong={type === 'yoon'}
                widthDefault={itemWidth}
                widthLong={itemWidthLong}
                active={cell.column}
                kana={kana}
                cell={null}
                isPlus
                onPress={() => onPlus?.("cell", cellIndex, type)}
                isStartOfLine={!cell.column ?
                  <Icon name={"plus"} size={18} color={colors.IconContrast} /> :
                  <Icon name={"minus"} size={18} color={colors.IconContrast} />
                }
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
                widthDefault={itemWidth}
                widthLong={itemWidthLong}
                kana={kana}
                cell={null}
                isPlus
                onPress={() => onPlus?.("row", rowIndex, type)}
                active={row.activeInRow}
                isStartOfLine={!row.activeInRow ?
                  <Icon name={"plus"} size={18} color={colors.IconContrast} /> :
                  <Icon name={"minus"} size={18} color={colors.IconContrast} />
                }
              />
            </View>

            {((rowIndex === 7 && type === "base") ? [row.items[0], null, row.items[1], null, row.items[2]]
              : (rowIndex === 9 && type === "base") ? [row.items[0], null, null, null, row.items[1]]
                : (rowIndex == 10 && type === "base")  ? [null, null, row.items[0], null, null] 
                  : row.items
            ).map((cell, cellIndex) => {
              return (
                <Cell
                  key={`${rowIndex}/${cellIndex}`}
                  onPress={() =>
                    cell?.data &&
                    onPress?.([cell.data, rowIndex, cellIndex, type])
                  }
                  isLong={type === "yoon"}
                  widthDefault={itemWidth}
                  widthLong={itemWidthLong}
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
    marginTop: 16,
    marginBottom: 30,
    paddingBottom: 30,
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
    gap: 9,
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
