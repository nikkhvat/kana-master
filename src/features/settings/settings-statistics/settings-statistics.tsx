import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import { StyleSheet, Text } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import Switcher from "@/shared/ui/switcher/switcher";

const SettingsStatistics: React.FC = () => {
  const { colors } = useThemeContext();

  const { t } = useTranslation();

  const [enableStatistics, setEnableStatistics] = useState("on");

  const onUpdate = (val: string) => {
    setEnableStatistics(val);
  };

  return (
    <>
      <Text style={[styles.title, { color: colors.color4 }]}>
        {t("displayStatistics.title")}
      </Text>

      <Switcher
        activeTab={enableStatistics}
        options={[
          "on",
          "off",
        ]}
        setActiveTab={onUpdate}
        translate={[
          t("displayStatistics.turnOn"),
          t("displayStatistics.turnOff"),
        ]} />
    </>
  );
};

export default SettingsStatistics;

const styles = StyleSheet.create({
  title: {
    marginTop: 30,
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 15,
  },
});
