import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { ActionSheetIOS } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { Theme } from "@/shared/constants/theme";
import SettingItem from "@/entities/profile/setting-item/setting-item";

const SettingsTheme: React.FC = () => {
  const { updateTheme, themeString } = useThemeContext();

  const { t } = useTranslation();
  const [themeTab, setThemeTab] = useState<string>(themeString);

  useEffect(() => {
    setThemeTab(themeString);
  }, [themeString]);

  const onUpdateTheme = (theme: string) => {
    setThemeTab(theme);

    if (theme === "light") return updateTheme(Theme.Light);
    if (theme === "dark") return updateTheme(Theme.Dark);

    updateTheme(Theme.Auto);
  };

  const onPress = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Light", "Dark", "Auto"],
        cancelButtonIndex: 0,
        userInterfaceStyle: themeString as "dark" | "light",
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          onUpdateTheme("light");
        } else if (buttonIndex === 2) {
          onUpdateTheme("dark");
        } else if (buttonIndex === 3) {
          onUpdateTheme("auto");
        }
      },
    );

  return (
    <SettingItem
      text={t("profile.theme")}
      subText={themeTab}
      isLast
      onClick={() => {
        onPress();
      }}
    />
  );
};

export default SettingsTheme;
