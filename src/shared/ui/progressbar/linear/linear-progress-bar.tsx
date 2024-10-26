import React from "react";

import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";

interface ProgressBarProp {
  close?: () => void;
  current: number;
  all: number;
  title?: string
}

const LinearProgressBar: React.FC<ProgressBarProp> = ({ close, current, all, title }) => {
  const { t } = useTranslation();
  const { colors } = useThemeContext();

  return (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBarLine, { backgroundColor: colors.BgLightGray }]}>
        <View style={[
          styles.progressBarLineActive, 
          { 
            width: `${(current / all) * 100}%`,
            backgroundColor: colors.BgContrast,
          },
        ]} />
      </View>
      <View style={styles.progressBarBottom}>
        <TouchableOpacity style={styles.progressBarPressble} onPress={() => close?.()}>
          <Icon name="close" size={24} color={colors.IconPrimary} />
        </TouchableOpacity>
        <Text style={[styles.progressBarText, { color: colors.TextSecondary }]}>
          {title ? title : t("practice.question")} {current + 1} / {all}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    paddingTop: 25,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  progressBarLine: {
    width: "100%",
  },
  progressBarLineActive: {
    height: 4,
  },
  progressBarBottom: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  progressBarClose: {
    zIndex: 999,
    justifyContent: "center",
    alignItems: "center",
  },
  progressBarText: {
    textAlign: "right",
    fontSize: 11,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 22,
    letterSpacing: -0.43,
  },
  progressBarPressble: {
    padding: 10,
    paddingLeft: 0,
  }
});

export default LinearProgressBar;
