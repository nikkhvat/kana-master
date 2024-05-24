import React from "react";

import { useTranslation } from "react-i18next";
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import IconButton from "../../icon-button";


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
      <View style={[styles.progressBarLine, { backgroundColor: colors.color2 }]}>
        <View style={[
          styles.progressBarLineActive, 
          { 
            width: `${(current / all) * 100}%`,
            backgroundColor: colors.color4,
          },
        ]} />
      </View>
      <View style={styles.progressBarBottom}>
        <IconButton onPress={() => close?.()} >
          <Icon name="close" size={24} color={colors.color3} />
        </IconButton>
        <Text style={[styles.progressBarText, { color: colors.color3 }]}>
          {title ? title : t("practice.question")} {current} / {all}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
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
  }
});

export default LinearProgressBar;
