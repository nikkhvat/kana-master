import React, { useCallback, useMemo } from "react";

import { Dimensions } from "react-native";
import styled from "styled-components/native";

import { Alphabet } from "@/constants/kana";
import { ILetter, dakuon, handakuon, baseWithSpaces, yoon } from "@/data/lettersTable";
import { getLettersWithStatuses } from "@/helpers/kana";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { toggleLetter, toggleSome } from "@/store/features/kana/slice";
import { RootState } from "@/store/store";

const Container = styled.View`
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  margin-bottom: 30px;
  gap: 10px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
`;

const RowButtons = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
`;

type CellProp = {
  isEmpty?: boolean;
  isLong: boolean,
  isEditMode: boolean | undefined
  isActive: boolean | undefined
  isPlus: boolean

  itemWidth: number
  itemWidthLong: number

  isInfo: boolean
};

const Cell = styled.TouchableOpacity<CellProp>`
  border-radius: 12px;
  border-width: ${({ isEmpty }) => (isEmpty ? 0 : "1px")};
  border-color: ${({ theme, isEmpty, isInfo }) =>
    (isEmpty || isInfo) ? "transparent" : theme.colors.color2};
  width: ${({ isLong, itemWidth, itemWidthLong }) =>
    isLong ? `${itemWidthLong}px` : `${itemWidth}px`};
  height: ${({ itemWidth }) => `${itemWidth}px`};
  background-color: ${({ theme, isPlus, isActive, isEmpty, isInfo }) =>
    (!isActive || isEmpty || isInfo)
      ? "transparent"
      : isPlus
        ? theme.colors.second_color3
        : theme.colors.second_color4};
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

type SymbolProps = {
  isInfo?: boolean;
  fontSize: number;

  isPlus?: boolean
};

const Symbol = styled.Text<SymbolProps>`
  font-size: ${({ fontSize }) => fontSize + "px"};
  color: ${({ theme, isInfo, isPlus }) =>
    isPlus
      ? theme.colors.color5
      : isInfo
        ? theme.colors.color3
        : theme.colors.color4};
`;

const SubText = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.color4};
`;


interface KanaTableProps {
  kana: "hiragana" | "katakana";
  type: Alphabet;
  isEditMode?: boolean;
  onClick?: (val: [(ILetter | number), number, number, string]) => void
}

const KanaTable: React.FC<KanaTableProps> = ({
  kana,
  type,
  isEditMode,
  onClick = () => {},
}) => {
  const dispatch = useAppDispatch();

  const getData = useCallback((type: Alphabet) => {
    if (type === "base") return baseWithSpaces;
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
        base: baseWithSpaces,
        dakuon: dakuon,
        handakuon: handakuon,
        yoon: yoon,
      };

      const data = dataMap[alphabet] || [];

      const isILetter = (element: number | ILetter): element is ILetter => {
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const letters = useMemo(
    () => getLettersWithStatuses(data, selectedLetters),
    [data, selectedLetters]
  );

  const screenWidth = Dimensions.get("window").width;

  const itemWidth = (screenWidth / 6) - 15;
  const itemWidthLong = (screenWidth / 3) - (itemWidth / 3) - 23;

  return (
    <Container>
      {letters.length > 1 && (
        <RowButtons>
          {letters[0].items.map((cell, cellIndex) => {
            return (
              <Cell
                itemWidthLong={itemWidthLong}
                itemWidth={itemWidth}
                isInfo={isEditMode !== true}
                isPlus={isEditMode === true}
                isActive={cell.active}
                isEditMode={isEditMode}
                isLong={letters[0].items.length === 3}
                key={`plus_${cellIndex}`}
                isEmpty={cell.data === 0}
                onPress={() => onPlus?.("cell", cellIndex, type)}
              >
                <Symbol
                  fontSize={isEditMode !== true ? 13 : 22}
                  isInfo={isEditMode !== true}
                  isPlus={isEditMode === true}
                >
                  {isEditMode && "+"}
                  {!isEditMode && "-"}
                  {!isEditMode &&
                    typeof cell.data !== "number" &&
                    cell.data.en.length === 1 &&
                    cell.data.en[0]}
                  {!isEditMode &&
                    typeof cell.data !== "number" &&
                    cell.data.en.length === 2 &&
                    cell.data.en[1]}
                  {!isEditMode &&
                    typeof cell.data !== "number" &&
                    cell.data.en.length === 3 &&
                    cell.data.en[2]}
                </Symbol>
              </Cell>
            );
          })}
        </RowButtons>
      )}

      {letters.map((row, rowIndex) => (
        <Row key={rowIndex}>
          <Cell
            itemWidthLong={itemWidthLong}
            itemWidth={itemWidth}
            isInfo={isEditMode !== true}
            isPlus={isEditMode === true}
            isActive={row.activeInRow}
            isEditMode={isEditMode}
            isLong={false}
            key={`row-${rowIndex}`}
            onPress={() => onPlus?.("row", rowIndex, type)}
          >
            <Symbol
              fontSize={isEditMode !== true ? 13 : 22}
              isInfo={isEditMode !== true}
              isPlus={isEditMode === true}
            >
              {isEditMode && "+"}
              {!isEditMode && "-"}
              {!isEditMode &&
                typeof row.items[0].data !== "number" &&
                (row.items[0].data.en.length < 3
                  ? row.items[0].data.en[0]
                  : row.items[0].data.en[0] + row.items[0].data.en[1])}
            </Symbol>
          </Cell>
          {row.items.map((cell, cellIndex) => {
            return (
              <Cell
                isInfo={false}
                itemWidthLong={itemWidthLong}
                itemWidth={itemWidth}
                isPlus={false}
                isActive={typeof cell !== "number" && cell.active && isEditMode}
                isEditMode={isEditMode}
                isLong={row.items.length === 3}
                key={`${rowIndex}-${cellIndex}`}
                isEmpty={cell.data === 0}
                onPress={() => {
                  if (typeof cell.data !== "number")
                    if (isEditMode) {
                      onPress?.([cell.data, rowIndex, cellIndex, type]);
                    } else {
                      onClick?.([cell.data, rowIndex, cellIndex, type]);
                    }
                }}
              >
                <Symbol fontSize={17}>
                  {typeof cell.data !== "number" &&
                    cell.data[kana === "hiragana" ? "hi" : "ka"]}
                </Symbol>
                <SubText>
                  {typeof cell.data !== "number" && cell.data.en.toUpperCase()}
                </SubText>
              </Cell>
            );
          })}
        </Row>
      ))}
    </Container>
  );
};

export default KanaTable;