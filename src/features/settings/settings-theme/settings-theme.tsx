import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import { StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/Feather";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { Theme } from "@/shared/constants/theme";
import Switcher from "@/shared/ui/switcher/switcher";

const SettingsTheme: React.FC = () => {
  const { colors, updateTheme, themeString } = useThemeContext();  

  const { t } = useTranslation();
  const [themeTab, setThemeTab] = useState<string>(themeString);

  const onUpdateTheme = (theme: string) => {
    setThemeTab(theme);

    if (theme === "light") return updateTheme(Theme.Light);
    if (theme === "dark") return updateTheme(Theme.Dark);

    updateTheme(Theme.Auto);
  };

  return (
    <>
      <Text style={[styles.title, { color: colors.color4 }]}>{t("profile.theme")}</Text>

      <Switcher
        activeTab={themeTab}
        options={[
          "light",
          "dark",
          "auto",
        ]}
        setActiveTab={onUpdateTheme}
        translate={[
          <Icon
            key={"sun"}
            name={"sun"}
            size={24}
            color={colors._theme === "dark" ? colors.color4 : colors.color4}
          />,
          <Icon
            key={"moon"}
            name={"moon"}
            size={24}
            color={colors._theme === "light" ? colors.color4 : colors.color4}
          />,
          t("common.auto"),
        ]} />
    </>
  );
};

export default SettingsTheme;

const styles = StyleSheet.create({
  title: {
    marginTop: 30,
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 15,
  },
});
