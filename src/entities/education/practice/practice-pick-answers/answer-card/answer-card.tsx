import React from "react";

import { Pressable, StyleSheet, Text, TouchableOpacity } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { ILetter } from "@/shared/data/lettersTable";

interface AnswerCardProps {
  value: ILetter
  children: string

  width: number

  redMarked: boolean
  greenMarked: boolean

  onClick?: (value: ILetter) => void
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

  const cardColor = redMarked ? colors.BgDanger : greenMarked ? colors.BgSuccess : colors.BgPrimary;
  const borderColor = redMarked ? colors.BgDanger : greenMarked ? colors.BgSuccess : colors.BorderDefault;
  const textColor = (redMarked || greenMarked) ? colors.TextContrastSecondary : colors.TextPrimary;

  
  return (
    <Pressable
      style={({ pressed }) => [
        styles.answersItem,
        { width: width, height: width },
        { borderColor: pressed ? colors.BorderDefault : borderColor },
        { backgroundColor: pressed ? colors.BgPrimaryPressed : cardColor } ,
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
    </Pressable>
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

