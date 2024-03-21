import React from "react";

import { useTranslation } from "react-i18next";
import { Dimensions, StyleSheet, Text, View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import SettingsLanguage from "@/features/settings/settings-language/settings-language";
import SettingsStatistics from "@/features/settings/settings-statistics/settings-statistics";
import SettingsTheme from "@/features/settings/settings-theme/settings-theme";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";

const screenWidth = Dimensions.get("window").width;

const ProfilePage: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { colors } = useThemeContext();  

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.color1 }]}>
      <Text style={[styles.title, { color: colors.color4 }]}>{t("tabs.profile")}</Text>

      <ScrollView style={{ paddingHorizontal: 20, marginBottom: 15 }} >
        <SettingsStatistics />
        <SettingsTheme />
        <SettingsLanguage />
      </ScrollView>
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: screenWidth > 500 ? "12.5%" : 0
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 20
  },
});
