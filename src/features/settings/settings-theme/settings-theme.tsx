import React from "react";

import { useTranslation } from "react-i18next";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { Theme } from "@/shared/constants/theme";
import SettingItem from "@/entities/profile/setting-item/setting-item";

import { useActionSheet } from '@expo/react-native-action-sheet';


const SettingsTheme: React.FC = () => {
  
  const { t } = useTranslation();
  
  const { updateTheme, themeString } = useThemeContext();
  
  const { showActionSheetWithOptions } = useActionSheet();
  
  const onPress = () => {
    const options = ["Cancel", "Light", "Dark", "Auto"];
    const cancelButtonIndex = 0;

    console.log('show action with options')

    showActionSheetWithOptions({
      options,
      cancelButtonIndex
    }, (buttonIndex?: number) => {
      if (buttonIndex === 1) {
        updateTheme(Theme.Light);
        updateTheme(Theme.Light);
      } else if (buttonIndex === 2) {
        updateTheme(Theme.Dark);
        updateTheme(Theme.Dark);
      } else if (buttonIndex === 3) {
        updateTheme(Theme.Auto);
        updateTheme(Theme.Auto);
      }
    });
  }

  return (
    <SettingItem
      text={t("profile.theme")}
      subText={themeString}
      isLast
      onClick={onPress}
    />
  );
};

export default SettingsTheme;
