import React, { useMemo } from "react";

import { Dimensions } from "react-native";
import styled from "styled-components/native";

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

  return (
    <Container last={last}>
      {letters && letters.length > 1 && (
        <RowButtons>
          {letters[0].map((cell, cellIndex) => (
            <Cell
              key={`plus_${cellIndex}`}
              itemWidthLong={itemWidthLong}
              itemWidth={itemWidth}
              isInfo={true}
              isPlus={false}
              isActive={false}
              isEditMode={false}
              isLong={letters[0].length === 3}
              isEmpty={false}
            >
              <Symbol fontSize={13} isInfo={true} isPlus={false}>
                {"-"}
                {cell.en}
              </Symbol>
            </Cell>
          ))}
        </RowButtons>
      )}
      {letters && letters.map((row, rowIndex) => (
        <Row key={`row-${rowIndex}`}>
          <Cell
            itemWidthLong={itemWidthLong}
            itemWidth={itemWidth}
            isInfo={true}
            isPlus={false}
            isActive={false}
            isEditMode={false}
            isLong={false}
            key={`row-${rowIndex}`}
          >
            <Symbol
              fontSize={13}
              isInfo={true}
              isPlus={false}
            >
              {"-"}
              {row[0] !== null &&
                (row[0].en.length < 3
                  ? row[0].en[0]
                  : row[0].en[0] + row[0].en[1])}
            </Symbol>
          </Cell>
          {(row[0].en === "YA" ? [row[0], null, row[1], null, row[2]] :
            row[0].en === "WA" ? [row[0], null, null, null, row[1]] :
              row[0].en === "N" ? [null, null, row[0], null, null]
                : row).map((cell, cellIndex) => (
            <Cell
              key={`${rowIndex}-${cellIndex}`}
              isInfo={false}
              itemWidthLong={itemWidthLong}
              itemWidth={itemWidth}
              isPlus={false}
              isActive={false}
              isEditMode={false}
              isLong={row.length === 3 && row[0].en !== "YA"}
              isEmpty={cell === null}
              onPress={() => cell && onClick(cell.id)}
            >
              <Symbol fontSize={17}>
                {cell && cell[kana === "hiragana" ? "hi" : "ka"]}
              </Symbol>
              <SubText>
                {cell && cell.en.toUpperCase()}
              </SubText>
            </Cell>
          ))}
        </Row>
      ))}
    </Container>
  );
};

export default EducationKanaTable;



const Container = styled.View<{ last?: boolean }>`
  padding-left: 20px;
  padding-right: 20px;
  gap: 10px;
  margin-bottom: 20px;
  border-bottom-width: ${({ last }) => last ? "0px" : "1px"};
  padding-top: 10px;
  padding-bottom: 30px;
  border-bottom-color: ${({ theme }) => theme.colors.color2};
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
  background-color: ${({ theme, isActive, isEmpty, isInfo }) =>
    (!isActive || isEmpty || isInfo)
      ? "transparent"
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
  color: ${({ theme, isInfo }) =>
    isInfo
      ? theme.colors.color3
      : theme.colors.color4};
`;

const SubText = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.color4};
`;