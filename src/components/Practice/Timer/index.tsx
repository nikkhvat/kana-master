import React from "react";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styled, { useTheme } from "styled-components/native";


import { Colors } from "@/constants/app";

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
`;

const TimerContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.color2};
  height: 10px;
  border-radius: 33px;
`;

type TimerStrokeProp = {
  width: number
}


const TimerStroke = styled.View<TimerStrokeProp>`
  background-color: ${({ theme }) => theme.colors.second_color2};
  width: ${({ width }) => width + "%"};
  height: 10px;
  border-radius: 33px;
`;

const TimerTextContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const TimerTime = styled.Text`
  color: ${({ theme }) => theme.colors.color4};
  font-size: 17px;
  font-weight: 600;
`;

const Timer = () => {
  const colors = useTheme().colors as Colors;

  return (
    <Container>
      <TimerContainer>
        <TimerStroke width={75} />
      </TimerContainer>
      <TimerTextContainer>
        <Icon name={"timer-outline"} size={24} color={colors.color4} />
        <TimerTime>00:04</TimerTime>
      </TimerTextContainer>
    </Container>
  );
};

export default Timer;