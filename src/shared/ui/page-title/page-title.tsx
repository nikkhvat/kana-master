import React from "react";

import { StyleProp, StyleSheet, TextStyle } from "react-native";
import { Text } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";

interface PageTitleProps {
  children: React.ReactNode
  style?: StyleProp<TextStyle>
}

const PageTitle: React.FC<PageTitleProps> = ({
  children,
  style = {}
}) => {
  const { colors } = useThemeContext();
  
  return (
    <Text style={[styles.title, { color: colors.color4 }, style]}>
      {children}
    </Text>
  );
};

export default PageTitle;

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 44,
    marginTop: 10,
    marginBottom: 10,
  }
});