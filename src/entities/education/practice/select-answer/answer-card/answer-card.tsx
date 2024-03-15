import React from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";

interface AnswerCardProps {
  value: string
  children: string

  width: number

  redMarked: boolean
  greenMarked: boolean

  onClick?: (value: string) => void
}

const AnswerCard: React.FC<AnswerCardProps> = ({
  value,
  width,
  redMarked,
  greenMarked,
  children,
  onClick
}) => {

  const { colors } = useThemeContext();

  const cardColor = redMarked ? colors.second_color1 : greenMarked ? colors.second_color2 : colors.color2;
  const textColor = (redMarked || greenMarked) ? colors.color5 : colors.color4;

  
  return (
    <TouchableOpacity
      style={[
        styles.answersItem,
        { width: width, height: width },
        { borderColor: cardColor },
        { backgroundColor: cardColor },
      ]}
      onPress={() => onClick?.(value)}
    >
      <Text
        style={[
          styles.answersItemText,
          { color: textColor },
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default AnswerCard;

const styles = StyleSheet.create({
  answersItem: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
  },
  answersItemText: {
    fontSize: 22,
  },
});

