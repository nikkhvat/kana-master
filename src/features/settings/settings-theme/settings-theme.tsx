import React, { useCallback, useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { ActionSheetIOS } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { Theme } from "@/shared/constants/theme";
import SettingItem from "@/entities/profile/setting-item/setting-item";

const SettingsTheme: React.FC = () => {
  const { t } = useTranslation();

  const { updateTheme, themeString } = useThemeContext();

  return (
    <SettingItem
      text={t("profile.theme")}
      subText={themeString}
      isLast
      onClick={() => {
        ActionSheetIOS.showActionSheetWithOptions(
          {
            options: ["Cancel", "Light", "Dark", "Auto"],
            cancelButtonIndex: 0,
          },
          (buttonIndex) => {
            if (buttonIndex === 1) {
              console.log("TOGGLE LIGHT");
              updateTheme(Theme.Light);
              updateTheme(Theme.Light);
            } else if (buttonIndex === 2) {
              console.log("TOGGLE DARK");
              updateTheme(Theme.Dark);
              updateTheme(Theme.Dark);
            } else if (buttonIndex === 3) {
              console.log("TOGGLE ÅUTO");
              updateTheme(Theme.Auto);
              updateTheme(Theme.Auto);
            }
          },
        );
      }}
    />
  );
};

export default SettingsTheme;
