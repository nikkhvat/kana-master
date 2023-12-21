import React, { useCallback, useEffect, useMemo } from "react";

import styled from "styled-components/native";

import { Alphabet } from "@/constants/kana";
import { ILetter, lettersDakuon, lettersHandakuon, lettersWithSpaces, lettersYoon } from "@/data/letters";
import { getLettersWithStatuses } from "@/helpers/kana";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { toggleLetter, toggleSome } from "@/store/features/kana/slice";
import { RootState } from "@/store/store";

const Container = styled.View`
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  margin-bottom: 30px;
  gap: 9px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 9px;
`;

const RowButtons = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 9px;
`;

type CellProp = {
  isEmpty?: boolean;
  isLong: boolean,
  isEditMode: boolean | undefined
  isActive: boolean | undefined
  isPlus: boolean
};

const Cell = styled.TouchableOpacity<CellProp>`
  border-radius: 12px;
  border-width: ${({ isEmpty }) => (isEmpty ? 0 : "1px")};
  border-color: ${({ theme, isEmpty }) =>
    isEmpty ? "transparent" : theme.colors.color2};
  width: ${({ isLong, isEditMode }) =>
    isLong ? (isEditMode ? "89px" : "105px") : isEditMode ? "50px" : "60px"};
  height: ${({ isEditMode }) => (isEditMode ? "50px" : "60px")};
  background-color: ${({ theme, isPlus, isActive, isEmpty }) =>
    !isActive || isEmpty
      ? "transparent"
      : isPlus
        ? theme.colors.second_color3
        : theme.colors.second_color4};
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Symbol = styled.Text`
  font-size: 17px;
  color: ${({ theme }) => theme.colors.color4};
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
  onClick = (val) => {},
}) => {
  const dispatch = useAppDispatch();

  const getData = useCallback((type: Alphabet) => {
    if (type === "base") return lettersWithSpaces;
    else if (type === "dakuon") return lettersDakuon;
    else if (type === "handakuon") return lettersHandakuon;
    else if (type === "yoon") return lettersYoon;
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
        base: lettersWithSpaces,
        dakuon: lettersDakuon,
        handakuon: lettersHandakuon,
        yoon: lettersYoon,
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

  return (
    <Container>
      {isEditMode && letters.length > 1 && (
        <RowButtons>
          {letters[0].items.map((cell, cellIndex) => {
            return (
              <Cell
                isPlus={true}
                isActive={cell.active}
                isEditMode={isEditMode}
                isLong={letters[0].items.length === 3}
                key={`plus_${cellIndex}`}
                isEmpty={cell.data === 0}
                onPress={() => onPlus?.("cell", cellIndex, type)}
              >
                <Symbol>+</Symbol>
              </Cell>
            );
          })}
        </RowButtons>
      )}

      {letters.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {isEditMode && (
            <Cell
              isPlus={true}
              isActive={row.activeInRow}
              isEditMode={isEditMode}
              isLong={false}
              key={`row-${rowIndex}`}
              onPress={() => onPlus?.("row", rowIndex, type)}
            >
              <Symbol>+</Symbol>
            </Cell>
          )}
          {row.items.map((cell, cellIndex) => {
            return (
              <Cell
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
                <Symbol>
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