import React from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import { ActionSheetIOS, StyleSheet, Text, View } from "react-native";

import LanguageButton from "@/entities/profile/language-button/language-button";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import {
  LanguageKeys,
  LanguageName,
  ShortLanguage,
  languageList,
} from "@/shared/constants/language";
import { useAppDispatch } from "@/shared/model/hooks";
import { updateLessons } from "@/pages/education/learning/model/slice";
import SettingItem from "@/entities/profile/setting-item/setting-item";

const SettingsLanguage: React.FC = () => {
  const { colors, themeString } = useThemeContext();

  const dispatch = useAppDispatch();

  const { t, i18n } = useTranslation();

  const setLanguage = async (lang: LanguageKeys) => {
    await AsyncStorage.setItem("lang", lang);
    i18n.changeLanguage(lang);

    dispatch(updateLessons({ lang }));
  };

  const onPress = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [
          "Cancel",
          LanguageName.en,
          LanguageName.es,
          LanguageName.fr,
          LanguageName.ru,
          LanguageName.pt,
          LanguageName.de,
          LanguageName.it,
        ],
        cancelButtonIndex: 0,
        userInterfaceStyle: themeString as "dark" | "light",
      },
      (buttonIndex) => {
        console.log("buttonIndex -> ", buttonIndex);

        switch (buttonIndex) {
          case 1:
            setLanguage(ShortLanguage.EN);
            break;
          case 2:
            setLanguage(ShortLanguage.ES);
            break;
          case 3:
            setLanguage(ShortLanguage.FR);
            break;
          case 4:
            setLanguage(ShortLanguage.RU);
            break;
          case 5:
            setLanguage(ShortLanguage.PT);
            break;
          case 6:
            setLanguage(ShortLanguage.DE);
            break;
          case 7:
            setLanguage(ShortLanguage.IT);
            break;
          default:
            break;
        }
      },
    );

  return (
    <SettingItem
      text={t("profile.language")}
      subText={LanguageName[i18n.language as LanguageKeys]}
      onClick={onPress}
    />
  );
};

export default SettingsLanguage;
