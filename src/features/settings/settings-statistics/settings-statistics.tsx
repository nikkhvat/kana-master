import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import { StyleSheet, Text } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { toggleStatistics } from "@/pages/kana/kana-list/model/slice";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import Switcher from "@/shared/ui/switcher/switcher";

const SettingsStatistics: React.FC = () => {
  const { colors } = useThemeContext();
  const isEnabledStats = useAppSelector((state) => state.statistics.isEnabled);

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const isEnabled = isEnabledStats ? "en" : "off";

  return (
    <>
      <Text style={[styles.title, { color: colors.color4 }]}>
        {t("displayStatistics.title")}
      </Text>

      <Switcher
        activeTab={isEnabled}
        options={[
          "off",
          "en"
        ]}
        setActiveTab={() => dispatch(toggleStatistics())}
        translate={[
          t("displayStatistics.turnOff"),
          t("displayStatistics.turnOn"),
        ]} />
    </>
  );
};

export default SettingsStatistics;

const styles = StyleSheet.create({
  title: {
    marginTop: 21,
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 15,
  },
});
