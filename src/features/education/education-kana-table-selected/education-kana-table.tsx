import React, { useCallback, useMemo } from "react";

import { Dimensions, View, Text, TouchableOpacity, ScrollView } from "react-native";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useThemeContext } from "@/hooks/theme-context";
import { Alphabet } from "@/shared/constants/kana";
import { ILetter, dakuon, handakuon, base, yoon, LettersKeys } from "@/shared/data/lettersTable";
import { getLettersWithStatuses } from "@/shared/helpers/kana";
import { toggleLetter, toggleSome } from "@/store/features/kana/slice";
import { RootState } from "@/store/store";

interface EducationKanaTableProps {
  kana: "hiragana" | "katakana";
  type: Alphabet;
  isEditMode?: boolean;
  onClick?: (id: LettersKeys) => void
  last?: boolean
}

const EducationKanaTableSelected: React.FC<EducationKanaTableProps> = ({
  kana,
  type,
  isEditMode,
  onClick = () => {},
  last
}) => {
  const dispatch = useAppDispatch();

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
    [onToggleSome]
  );

  const letters = useMemo(
    () => getLettersWithStatuses(data, selectedLetters),
    [data, selectedLetters]
  );

  const screenWidth = Dimensions.get("window").width;

  const itemWidth = (screenWidth / 6) - 15;
  const itemWidthLong = (screenWidth / 3) - (itemWidth / 3) - 23;

  const isInfo = isEditMode !== true;
  const isPlus = isEditMode === true;

  return (
    <View style={{ paddingLeft: 20, paddingRight: 20, marginBottom: 20, borderBottomWidth: last ? 0 : 1, borderBottomColor: colors.color2, paddingTop: 10, paddingBottom: 30 }}>
      {letters.length > 1 && (
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end", gap: 10 }}>
          {letters[0].items.map((cell, cellIndex) => {
            return (
              <TouchableOpacity
                key={`plus_${cellIndex}`}
                style={{
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: "transparent",
                  width: cellIndex === 0 ? itemWidthLong : itemWidth,
                  height: itemWidth,
                  backgroundColor: "transparent",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => onPlus?.("cell", cellIndex, type)}
              >
                <Text
                  style={{
                    fontSize: isEditMode !== true ? 13 : 22,
                    color: isEditMode ? colors.color5 : isInfo ? colors.color3 : colors.color4,
                  }}
                >
                  {isEditMode && "+"}
                  {!isEditMode && "-"}
                  {!isEditMode && cell.data.en.length === 1 && cell.data.en[0]}
                  {!isEditMode && cell.data.en.length === 2 && cell.data.en[1]}
                  {!isEditMode && cell.data.en.length === 3 && cell.data.en[2]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      <ScrollView>
        {letters.map((row, rowIndex) => (
          <View key={rowIndex} style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end", gap: 10 }}>
            <TouchableOpacity
              style={{
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "transparent",
                width: itemWidth,
                height: itemWidth,
                backgroundColor: "transparent",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => onPlus?.("row", rowIndex, type)}
            >
              <Text
                style={{
                  fontSize: isEditMode !== true ? 13 : 22,
                  color: isEditMode ? colors.color5 : isInfo ? colors.color3 : colors.color4,
                }}
              >
                {isEditMode && "+"}
                {!isEditMode && "-"}
                {!isEditMode &&
                  row.items[0] !== null &&
                  (row.items[0].data.en.length < 3
                    ? row.items[0].data.en[0]
                    : row.items[0].data.en[0] + row.items[0].data.en[1])}
              </Text>
            </TouchableOpacity>
            {(
              row.items[0].data.en === "YA" ? [row.items[0], null, row.items[1], null, row.items[2]] :
                row.items[0].data.en === "WA" ? [row.items[0], null, null, null, row.items[1]] :
                  row.items[0].data.en === "N" ? [null, null, row.items[0], null, null]
                    : row.items).map((cell, cellIndex) => {
                      return (
                        <TouchableOpacity
                          key={`${rowIndex}-${cellIndex}`}
                          style={{
                            borderRadius: 12,
                            borderWidth: cell === null ? 0 : 1,
                            borderColor: cell === null ? "transparent" : colors.color2,
                            width: cell === null ? itemWidth : row.items.length === 3 && row.items[0].data.en !== "YA" ? itemWidthLong : itemWidth,
                            height: itemWidth,
                            backgroundColor: !cell || !cell.active || isInfo
                              ? "transparent"
                              : isPlus
                                ? colors.second_color3
                                : colors.second_color4,
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          onPress={() => {
                            if (cell !== null) {
                              if (isEditMode) onPress?.([cell.data, rowIndex, cellIndex, type]);
                              else onClick?.(cell.data.id);
                            }
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 17,
                              color: !cell || !cell.active || isEditMode ? colors.color4 : colors.color5,
                            }}
                          >
                            {cell !== null && cell.data[kana === "hiragana" ? "hi" : "ka"]}
                          </Text>
                          <Text
                            style={{
                              fontSize: 13,
                              color: colors.color4,
                            }}
                          >
                            {cell !== null && cell.data.en.toUpperCase()}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default EducationKanaTableSelected;