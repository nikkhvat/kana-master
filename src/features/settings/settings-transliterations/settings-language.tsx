import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

import { useThemeContext } from "../settings-theme/theme-context";

import { Transliterations, useTransliterationsContext } from "./context/transliteration";

import LanguageButton from "@/entities/profile/language-button/language-button";

const SettingsTransliterations: React.FC = () => {
  const { colors } = useThemeContext();  

  const { t, i18n } = useTranslation();

  const romaji = [
    { key: Transliterations.HEP, short: "HEP", label: t("transliterationSystems.hepburn") },
    { key: Transliterations.KUN, short: "KUN", label: t("transliterationSystems.kunreiShiki") },
    { key: Transliterations.NIH, short: "NIH", label: t("transliterationSystems.nihonShiki") },
  ];
  
  const russian = [
    { key: Transliterations.RUS, short: "RUS", label: t("transliterationSystems.russianPhoneticTransliteration") },
  ];

  const { transliterations, updateTransliterations } = useTransliterationsContext();

  const [transliterationsTab, setTransliterationsTab] = useState(transliterations);

  const onUpdateTransliterations = (transliteration: Transliterations) => {
    setTransliterationsTab(transliteration);
    updateTransliterations(transliteration);
  };

  useEffect(() => {
    if (i18n.language === "ru") {
      onUpdateTransliterations(russian[0].key)
    } else {
      onUpdateTransliterations(romaji[0].key)
    }
  }, [i18n.language])

  return (
    <>
      <Text style={[styles.title, { color: colors.color4 }]}>{t("transliterationSystems.transliterationSystems")}</Text>

      <View style={styles.sectionButtonsColumn}>
        <Text style={[styles.subtitle, { color: colors.color3 }]}>{t("transliterationSystems.romajiLatin")}</Text>
        {romaji.map(item => <LanguageButton
          isLongKey
          key={item.key}
          langKey={item.short}
          onPress={() => onUpdateTransliterations(item.key)}
          active={transliterationsTab === item.key}>
          {item.label}
        </LanguageButton>)}
        <Text style={[styles.subtitle, { color: colors.color3 }]}>{t("transliterationSystems.transliterationInCyrillic")}</Text>
        {russian.map(item => 
          <LanguageButton
            isLongKey
            key={item.key}
            langKey={item.short}
            onPress={() => onUpdateTransliterations(item.key)}
            active={transliterationsTab === item.key}>
            {item.label}
          </LanguageButton>)}
      </View>
    </>
  );
};

export default SettingsTransliterations;

const styles = StyleSheet.create({
  title: {
    marginTop: 30,
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "700",
    textAlign: "left",
    width: "100%"
  },
  sectionButtonsColumn: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
  },
});
