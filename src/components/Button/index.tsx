import React from 'react';

import { useTheme } from '@react-navigation/native';
import { TouchableOpacityProps, TextProps } from 'react-native';
import Ionics from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

import { Colors } from '@/constants/app';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  type: 'active' | 'inactive' | 'weak' | 'general';
  onClick?: () => void;
  fontSize?: number;
  image?: string | null;
  customStyles?: Record<string, string | number>
}

interface StyledButtonProps extends TouchableOpacityProps {
  type: 'active' | 'inactive' | 'weak' | 'general';
}

interface StyledTextProps extends TextProps {
  fontSize?: number;
  type: 'active' | 'inactive' | 'weak' | 'general';
}


const StyledButton = styled.TouchableOpacity<StyledButtonProps>`
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  height: 50px;
  border-radius: 12px;
  background-color: ${({ theme, type }) =>
    type === 'active'
      ? theme.colors.second_color3
      : type === 'inactive'
      ? 'transparent'
      : type === 'weak'
      ? theme.colors.second_color4
      : theme.colors.color4};
  border-color: ${({ theme, type }) => (type === 'inactive' ? theme.colors.color2 : 'transparent')};
  border-style: solid;
  border-width: ${({ type }) => (type === 'inactive' ? 1 : 0)}px;
`;

const StyledText = styled.Text<StyledTextProps>`
  font-size: ${({ fontSize }) => (fontSize ? fontSize + 'px' : 13 + 'px')};
  color: ${({ theme, type }) =>
    type === 'active'
      ? theme.colors.color5
      : type === 'inactive'
      ? theme.colors.color4
      : type === 'weak'
      ? theme.colors.color4
      : theme.colors.color1};
  font-weight: 700;
`;

const Button: React.FC<ButtonProps> = ({
  title,
  onClick,
  type,
  fontSize,
  customStyles,
  image = null,
  ...props
}) => {
  const theme = useTheme() as unknown as {colors: Colors};

  return (
    <StyledButton
      onPress={() => onClick?.()}
      type={type}
      style={customStyles}
      theme={theme}
      {...props}
    >
      {image === null ? (
        <StyledText fontSize={fontSize} type={type} theme={theme}>
          {title}
        </StyledText>
      ) : (
        <Ionics name={image} size={24} color={theme.colors.color4} />
      )}
    </StyledButton>
  );
};

export default Button;
