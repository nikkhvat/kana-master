import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { Typography } from "@/shared/typography";
import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";

interface LearningTitleProps {
  children: string;
  style?: StyleProp<TextStyle> | undefined;
}

export const LearningTitle: React.FC<LearningTitleProps> = ({
  children,
  style,
}) => {
  const { colors } = useThemeContext();

  return (
    <Text
      style={[
        Typography.boldH4,
        {
          color: colors.TextPrimary,
          marginBottom: 32,
          height: "auto",
          textAlign: "center",
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};
