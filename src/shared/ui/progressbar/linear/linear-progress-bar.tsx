import React from "react";

import { useTranslation } from "react-i18next";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { useHaptic } from "@/shared/helpers/haptic";

interface ProgressBarProp {
  close?: () => void;
  requireConfirmation?: boolean,
  confirmationTitle?: string,
  confirmationSubtitle?: string,
  current: number;
  all: number;
  title?: string
}

const LinearProgressBar: React.FC<ProgressBarProp> = ({
  close,
  requireConfirmation = true,
  confirmationTitle,
  confirmationSubtitle,
  current,
  all,
  title
}) => {
  const { t } = useTranslation();
  const { colors } = useThemeContext();
  const { triggerHaptic } = useHaptic()

  const localizedConfirmationTitle = confirmationTitle ? confirmationTitle : t('alert.exitConformation.title');
  const localizedConfirmationSubtitle = confirmationSubtitle ? confirmationSubtitle : t('alert.exitConformation.subtitle');

  const confirmationCloseAlert = () =>
    Alert.alert(localizedConfirmationTitle, localizedConfirmationSubtitle, [
      { text: t('alert.cancel'), style: 'cancel' },
      { text: t('alert.ok'), onPress: () => {
        triggerHaptic();
        close?.();
      } },
    ]);

  return (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBarLine, { backgroundColor: colors.BgLightGray }]}>
        <View style={[
          styles.progressBarLineActive, 
          { 
            width: current + 1 >= all ? '100%' : `${((current + 1) / all) * 100}%`,
            backgroundColor: colors.BgContrast,
          },
        ]} />
      </View>
      <View style={styles.progressBarBottom}>
        <TouchableOpacity style={styles.progressBarPressble} onPress={() => {
          if (requireConfirmation) {
            confirmationCloseAlert();
          } else {
            close?.()
          }
        }}>
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
