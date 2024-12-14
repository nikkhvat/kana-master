import React, { useState } from "react";

import { useTranslation } from "react-i18next";

import { useThemeContext } from "../settings-theme/theme-context";

import {
  Transliterations,
  useTransliterationsContext,
} from "./context/transliteration";

import SettingItem from "@/entities/profile/setting-item/setting-item";

import { useActionSheet } from '@expo/react-native-action-sheet';

const SettingsTransliterations: React.FC = () => {
  const { themeString } = useThemeContext();

  const { showActionSheetWithOptions } = useActionSheet();

  const { t } = useTranslation();

  const { transliterations, updateTransliterations } =
    useTransliterationsContext();

  const [transliterationsTab, setTransliterationsTab] =
    useState(transliterations);

  const onUpdateTransliterations = (transliteration: Transliterations) => {
    setTransliterationsTab(transliteration);
    updateTransliterations(transliteration);
  };

  const transliterationSystems = [
    t("transliterationSystems.hepburn"),
    t("transliterationSystems.kunreiShiki"),
    t("transliterationSystems.nihonShiki"),
    t("transliterationSystems.russianPhoneticTransliteration"),
  ];

  const onPress = () => {
    const options = [t('alert.cancel'), ...transliterationSystems];
    const cancelButtonIndex = 0;

    showActionSheetWithOptions({
      options,
      cancelButtonIndex,
      userInterfaceStyle: themeString as "dark" | "light"
    }, (buttonIndex?: number) => {
      switch (buttonIndex) {
        case 1:
          onUpdateTransliterations(Transliterations.HEP);
          break;
        case 2:
          onUpdateTransliterations(Transliterations.KUN);
          break;
        case 3:
          onUpdateTransliterations(Transliterations.NIH);
          break;
        case 4:
          onUpdateTransliterations(Transliterations.RUS);
          break;
        default:
          break;
      }
    });
  }

  return (
    <SettingItem
      isLast
      text={t("transliterationSystems.transliterationSystems")}
      subText={transliterationSystems[transliterationsTab]}
      onClick={onPress}
    />
  );
};

export default SettingsTransliterations;
