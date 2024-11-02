import React from "react";

import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

import { useThemeContext } from "../settings-theme/theme-context";
import SocialLink from "@/entities/profile/social-link/social-link";

const JoinCommunity: React.FC = () => {
  const { colors } = useThemeContext();

  const { t, i18n } = useTranslation();

  const language = i18n.language;

  return (
    <>
      <Text style={[styles.title, { color: colors.TextPrimary }]}>
        {t("settings.joinOurCommunity.title")}
      </Text>

      <View style={styles.sectionButtonsColumn}>
        {language !== "ru" && (
          <SocialLink link="https://t.me/kanamaster_learn_japanese">
            Telegram channel
          </SocialLink>
        )}

        {language === "ru" && (
          <SocialLink link="https://t.me/kanamaster_learn_japanese_rus">
            Телеграм канал
          </SocialLink>
        )}
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
    marginBottom: 16,
  },
  sectionButtonsColumn: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
  },
});
