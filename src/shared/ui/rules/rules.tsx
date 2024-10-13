import React from "react";

import { StyleSheet, Text, View } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";

type RulesProps = {
  rules: string[];
};

const Rules: React.FC<RulesProps> = ({ rules }) => {
  const { colors } = useThemeContext();

  const rulesColors = {
    borderColor: colors.color2,
  };
  const textContainerColors = {
    borderColor: colors.color2,
    color: colors.color4,
  };
  const textColors = {
    borderColor: colors.color2,
    color: colors.color4,
  };

  return (
    <View style={[styles.rules, rulesColors]}>
      {rules.map((rule, idx) => (
        <View
          style={[
            styles.textContainer,
            textContainerColors,
            idx === 0 ? { borderTopWidth: 0 } : {},
          ]}
          key={rule}
        >
          <Text style={[styles.text, textColors]}>
            {idx + 1}. {rule}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default Rules;

const styles = StyleSheet.create({
  rules: {
    width: "100%",
    flexDirection: "column",
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 16,
    marginBottom: 16,
    paddingLeft: 15,
    paddingRight: 15,
  },
  textContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
  },
  text: {
    fontWeight: "400",
    fontSize: 15,
    lineHeight: 22,
  },
});
