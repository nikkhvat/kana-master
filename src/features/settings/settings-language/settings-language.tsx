import React from "react";

import AsyncStorage from "@react-native-async-storage/async-storage"; 
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

import LanguageButton from "@/entities/profile/language-button/language-button";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";

const SettingsLanguage: React.FC = () => {
  const { colors } = useThemeContext();  

  const { t, i18n } = useTranslation();

  const setLanguage = async (lang: string) => {
    await AsyncStorage.setItem("lang", lang);
    i18n.changeLanguage(lang);
  };

  const langs = [
    { title: "English", key: "en" },
    { title: "Русский", key: "ru" },
  ];


  return (
    <>
      <Text style={[styles.title, { color: colors.color4 }]}>{t("profile.language")}</Text>

      <View style={styles.sectionButtonsColumn}>
        {langs.map(lang => (
          <LanguageButton
            key={lang.key}
            langKey={lang.key}
            onPress={() => setLanguage(lang.key)}
            active={i18n.language === lang.key}>
            {lang.title}
          </LanguageButton>
        ))}
      </View>
    </>
  );
};

export default SettingsLanguage;

const styles = StyleSheet.create({
  title: {
    marginTop: 30,
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 15,
  },
  sectionButtonsColumn: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
  },
});
