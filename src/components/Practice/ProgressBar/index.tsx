import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled, { useTheme } from 'styled-components/native';

import { Colors } from '@/constants/app';

const ProgressBarContainer = styled.View`
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProgressBarLine = styled.View`
  width: 100%;
  height: 4px;
  background-color: ${({theme}) => theme.colors.color2 };
`;

const ProgressBarLineActive = styled.View<{progress: number}>`
  width: ${({progress}) => progress + '%'};
  height: 4px;
  background-color: ${({theme}) => theme.colors.color4};
`;

const ProgressBarBottom = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 6px;
`;

const ProgressBarClose = styled.TouchableOpacity`
  justify-content: row;
  justify-content: center;
  align-items: center;
  margin-left: -15px;
  padding: 10px;
`;

const ProgressBarText = styled.Text`
  color: ${({theme}) => theme.colors.color3};
  text-align: right;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: -0.43px;
`;

interface ProgressBarProp {
  close?: () => void
  current: number
  all: number
}


const ProgressBar: React.FC<ProgressBarProp> = ({close, current, all}) => {
  const colors = useTheme().colors as Colors;

  return (
    <ProgressBarContainer>
      <ProgressBarLine>
        <ProgressBarLineActive progress={(current / all) * 100} />
      </ProgressBarLine>
      <ProgressBarBottom>
        <ProgressBarClose onPress={() => close?.()}>
          <Icon
            onPress={() => close?.()}
            name="close"
            size={24}
            color={colors.color3}
          />
        </ProgressBarClose>

        <ProgressBarText>
          Question {current} / {all}
        </ProgressBarText>
      </ProgressBarBottom>
    </ProgressBarContainer>
  );
};

export default ProgressBar;