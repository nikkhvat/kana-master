import React from "react";

import { useTranslation } from "react-i18next";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { Theme } from "@/shared/constants/theme";
import SettingItem from "@/entities/profile/setting-item/setting-item";

import { useActionSheet } from '@expo/react-native-action-sheet';


const SettingsTheme: React.FC = () => {
  const { t } = useTranslation();
  
  const { updateTheme, themeLocalized } = useThemeContext();
  
  const { showActionSheetWithOptions } = useActionSheet();
  
  const onPress = () => {
    const options = [
      t('alert.cancel'),
      t('settings.theme.light'),
      t('settings.theme.dark'),
      t('settings.theme.auto')
    ];
    const cancelButtonIndex = 0;

    showActionSheetWithOptions({
      options,
      cancelButtonIndex
    }, (buttonIndex?: number) => {
      if (buttonIndex === 1) {
        updateTheme(Theme.Light);
      } else if (buttonIndex === 2) {
        updateTheme(Theme.Dark);
      } else if (buttonIndex === 3) {
        updateTheme(Theme.Auto);
      }
    });
  }

  return (
    <SettingItem
      text={t("settings.theme.title")}
      subText={themeLocalized}
      isLast
      onClick={onPress}
    />
  );
};

export default SettingsTheme;
