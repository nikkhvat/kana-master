import React from "react";

import { useTranslation } from "react-i18next";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

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
        <TouchableOpacity style={styles.progressBarClose} onPress={() => close?.()}>
          <Icon
            onPress={() => close?.()}
            name="close"
            size={24}
            color={colors.color3}
          />
        </TouchableOpacity>
        <Text style={[styles.progressBarText, { color: colors.color3 }]}>
          {title ? title : t("practice.question")} {current} / {all}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  progressBarLine: {
    width: "100%",
    height: 4,
  },
  progressBarLineActive: {
    height: 4,
  },
  progressBarBottom: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
  },
  progressBarClose: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -15,
    padding: 10,
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
