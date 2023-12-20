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
  onPlus?: (rowIndex: number, cellIndex?: number) => void;
  fullSelected?: boolean
}

const KanaTable: React.FC<KanaTableProps> = ({
  data,
  kana,
  onClick,
  type,
  isEditMode,
  onPlus,
  fullSelected
}) => {
  return (
    <Container>
      {isEditMode && data.length > 1 && (
        <RowButtons>
          {data[0].map((cell, cellIndex) => {
            return (
              <Cell
                isPlus={true}
                isActive={fullSelected}
                isEditMode={isEditMode}
                isLong={data[0].length === 3}
                key={`plus_${cellIndex}`}
                isEmpty={cell === 0}
                onPress={() => onPlus?.(-1, cellIndex)}
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
              isActive={fullSelected}
              isEditMode={isEditMode}
              isLong={false}
              key={`row-${rowIndex}`}
              onPress={() => {
                onPlus?.(rowIndex);
              }}
            >
              <Symbol>+</Symbol>
            </Cell>
          )}
          {row.map((cell, cellIndex) => {
            return (
              <Cell
                isPlus={false}
                isActive={fullSelected}
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