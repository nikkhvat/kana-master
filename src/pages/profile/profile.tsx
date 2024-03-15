import React from "react";

import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import SettingsLanguage from "@/features/settings/settings-language/settings-language";
import SettingsStatistics from "@/features/settings/settings-statistics/settings-statistics";
import SettingsTheme from "@/features/settings/settings-theme/settings-theme";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";


const ProfilePage: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { colors } = useThemeContext();  

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.color1 }]}>
      <Text style={[styles.title, { color: colors.color4 }]}>{t("tabs.profile")}</Text>

      <SettingsStatistics />
      <SettingsTheme />
      <SettingsLanguage />
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "red",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
  },
});
