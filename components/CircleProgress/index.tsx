import React from "react";
import { View } from "react-native";
import { Svg, Circle } from "react-native-svg";

import styled, { useTheme } from "styled-components/native";
import { Colors } from "../../App";

interface CircleProgressProp {
  progress: number
}

const TitleContainer = styled.View`
  position: absolute;
  top: 38px;
  width: 100px;
`;

const Title = styled.Text`
  width: 100%;
  text-align: center;
  font-size: 17px;
  color: ${({ theme }) => theme.colors.color4};
  font-weight: 700;
`;

const CircleProgress: React.FC<CircleProgressProp> = ({ progress }) => {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const colors = useTheme().colors as Colors;

  return (
    <View>
      <Svg style={{ backgroundColor: colors.color1 }}>
        <Circle
          cx={50}
          cy={50}
          r={radius}
          stroke={colors.color2}
          fill={colors.color1}
          strokeWidth={8}
          origin="50, 50"
        />
        <Circle
          cx={50}
          cy={50}
          r={radius}
          stroke={progress < 51 ? "#EF625D" : "#60BA53"}
          strokeWidth={6}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin="50, 50"
        />
        <TitleContainer>
          <Title>{`${Math.round(progress)}%`}</Title>
        </TitleContainer>
      </Svg>
    </View>
  );
};

export default CircleProgress;
