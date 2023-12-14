import React from "react";

import styled from "styled-components/native";
import { ILetter } from "../../utils/letters";

const Container = styled.View`
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  margin-bottom: 30px;
  gap: 10px;
`

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

type CellProp = {
  isEmpty: boolean;
  isLong: boolean
};

const Cell = styled.TouchableOpacity<CellProp>`
  padding: 8px;
  border-radius: 12px;
  border-width: ${({ isEmpty }) => (isEmpty ? 0 : "1px")};
  border-color: ${({ theme, isEmpty }) =>
    isEmpty ? "transparent" : theme.colors.color2};
  width: ${({ isLong }) => isLong ? "105px" : "60px"};
  height: 60px;
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
  onClick?: Function;
  kana: string; 
  type: string;
}

const KanaTable: React.FC<KanaTableProps> = ({ data, kana, onClick, type }) => {
  return (
    <Container>
      {data.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((cell, cellIndex) => {
            return (
              <Cell
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
                <SubText>{typeof cell !== "number" && cell?.en.toUpperCase()}</SubText>
              </Cell>
            );
          })}
        </Row>
      ))}
    </Container>
  );
};

export default KanaTable;