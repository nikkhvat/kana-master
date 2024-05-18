import React from "react";

import AsyncStorage from "@react-native-async-storage/async-storage"; 
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

import LanguageButton from "@/entities/profile/language-button/language-button";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { LanguageKeys, languageList } from "@/shared/constants/language";
import { useAppDispatch } from "@/shared/model/hooks";
import { init } from "@/pages/education/learning/model/slice";

const SettingsLanguage: React.FC = () => {
  const { colors } = useThemeContext();  
  const dispatch = useAppDispatch()

  const { t, i18n } = useTranslation();

  const setLanguage = async (lang: LanguageKeys) => {
    await AsyncStorage.setItem("lang", lang);
    i18n.changeLanguage(lang);

    dispatch(init(lang))
  };

  return (
    <>
      <Text style={[styles.title, { color: colors.color4 }]}>{t("profile.language")}</Text>

      <View style={styles.sectionButtonsColumn}>
        {languageList.map(lang => (
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
