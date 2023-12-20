import React from "react";

import styled from "styled-components/native";

import { ILetter } from "@/data/letters";

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
  data: (number | ILetter)[][];
  onClick?: (
    data: [cell: ILetter, rowIndex: number, cellIndex: number, type: string]
  ) => void;
  kana: string;
  type: string;
  isEditMode?: boolean;
  onPlus?: (
    type: "row" | "cell",
    index: number,
    alphabet: "basic" | "dakuon" | "handakuon" | "yoon"
  ) => void;
  selectedLetters?: {
    katakana: Array<string>;
    hiragana: Array<string>;
  };
}

const KanaTable: React.FC<KanaTableProps> = ({
  data,
  kana,
  onClick,
  type,
  isEditMode,
  onPlus,
  selectedLetters = {
    katakana: [],
    hiragana: [],
  }
}) => {

  const isActiveRow = (row: (number | ILetter)[]): boolean => {
    let isSelected = true;

    for (let i = 0; i < row.length; i++) {
      const item = row[i];
      if (typeof item !== "number") {
        if (!selectedLetters[kana === "Hiragana" ? "hiragana" : "katakana"].includes(item.en)) {
          isSelected = false;
        }
      }
    }

    return isSelected;
  };

  const isActiveColumn = (column: (number | ILetter)[][], index: number): boolean => {
    let isSelected = true;

    for (let i = 0; i < column.length; i++) {
      const items = column[i];

      const elem = items?.[index];

      if (typeof elem !== "number") {
        if (!selectedLetters[kana === "Hiragana" ? "hiragana" : "katakana"].includes(elem.en)) {
          isSelected = false;
        }
      }
    }

    return isSelected;
  };

  return (
    <Container>
      {isEditMode && data.length > 1 && (
        <RowButtons>
          {data[0].map((cell, cellIndex) => {
            return (
              <Cell
                isPlus={true}
                isActive={isActiveColumn(data, cellIndex)}
                isEditMode={isEditMode}
                isLong={data[0].length === 3}
                key={`plus_${cellIndex}`}
                isEmpty={cell === 0}
                onPress={() =>
                  onPlus?.(
                    "cell",
                    cellIndex,
                    type as "basic" | "dakuon" | "handakuon" | "yoon"
                  )
                }
              >
                <Symbol>+</Symbol>
              </Cell>
            );
          })}
        </RowButtons>
      )}

      {data.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {isEditMode && (
            <Cell
              isPlus={true}
              isActive={isActiveRow(row)}
              isEditMode={isEditMode}
              isLong={false}
              key={`row-${rowIndex}`}
              onPress={() =>
                onPlus?.(
                  "row",
                  rowIndex,
                  type as "basic" | "dakuon" | "handakuon" | "yoon"
                )
              }
            >
              <Symbol>+</Symbol>
            </Cell>
          )}
          {row.map((cell, cellIndex) => {
            return (
              <Cell
                isPlus={false}
                isActive={selectedLetters[
                  kana === "Hiragana" ? "hiragana" : "katakana"
                ].includes(typeof cell !== "number" ? cell.en : "-1")}
                isEditMode={isEditMode}
                isLong={row.length === 3}
                key={`${rowIndex}-${cellIndex}`}
                isEmpty={cell === 0}
                onPress={() => {
                  if (typeof cell !== "number")
                    onClick?.([cell, rowIndex, cellIndex, type]);
                }}
              >
                <Symbol>
                  {typeof cell !== "number" &&
                    cell?.[kana === "Hiragana" ? "hi" : "ka"]}
                </Symbol>
                <SubText>
                  {typeof cell !== "number" && cell?.en.toUpperCase()}
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