import React from "react";

import { View } from "react-native";
import styled from "styled-components/native";

interface EducationPracticeShowSymbolProps {
  symbol: string
  subtext: string
}

const EducationPracticeShowSymbol: React.FC<EducationPracticeShowSymbolProps> = ({symbol, subtext}) => {
  return (
    <View>
      <Symbol>{symbol}</Symbol>
      <SubText>{subtext}</SubText>
    </View>
  );
};

export default EducationPracticeShowSymbol;

const Symbol = styled.Text`
  color: ${({ theme }) => theme.colors.color4};
  text-align: center;
  font-size: 94px;
`;

const SubText = styled.Text`
  color: ${({ theme }) => theme.colors.color3};
  text-align: center;
  font-size: 17px;
  font-weight: 600;
`;

