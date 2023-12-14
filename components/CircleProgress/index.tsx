import React from "react";
import { View } from "react-native";
import { Svg, Circle } from "react-native-svg";

import styled from "styled-components/native";

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
  color: #fff;
  font-weight: 700;
`;

const CircleProgress: React.FC<CircleProgressProp> = ({ progress }) => {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;

  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <View>
      <Svg>
        <Circle
          cx={50}
          cy={50}
          r={radius}
          stroke="#3A3A3A"
          fill="#1F1F1F"
          strokeWidth={8}
        />
        <Circle
          cx={50}
          cy={50}
          r={radius}
          stroke={progress < 50 ? "#EF625D" : "#60BA53"}
          strokeWidth={5}
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
