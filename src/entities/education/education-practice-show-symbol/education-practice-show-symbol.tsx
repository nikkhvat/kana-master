import React from "react";

import { View, Text, StyleSheet } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";

interface EducationPracticeShowSymbolProps {
  symbol: string;
  subtext: string;
}

const EducationPracticeShowSymbol: React.FC<EducationPracticeShowSymbolProps> = ({ symbol, subtext }) => {

  const { colors } = useThemeContext();

  return (
    <View>
      <Text style={[styles.symbol, { color: colors.color4 }]}>{symbol}</Text>
      <Text style={[styles.subText, { color: colors.color3 }]}>{subtext}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  symbol: {
    textAlign: "center",
    fontSize: 94,
  },
  subText: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "600",
  },
});

export default EducationPracticeShowSymbol;
