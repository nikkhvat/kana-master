import React from "react";

import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

import { useThemeContext } from "../settings-theme/theme-context";

import LinkButton from "@/entities/profile/Link-button/Link-button";

const JoinCommunity: React.FC = () => {
  const { colors } = useThemeContext();  

  const { t, i18n } = useTranslation();

  const language = i18n.language;

  return (
    <>
      <Text style={[styles.title, { color: colors.color4 }]}>
        {t("joinOurCommunity.title")}
      </Text>

      <View style={styles.sectionButtonsColumn}>
        {language !== "ru" && 
          <LinkButton 
            link="https://t.me/kanamaster_learn_japanese"
          >
            Telegram channel
        </LinkButton>}

        {language === "ru" && 
          <LinkButton 
            link="https://t.me/kanamaster_learn_japanese_rus"
          >
            Телеграм канал
        </LinkButton>}
      </View>
    </>
  );
};

export default JoinCommunity;

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
