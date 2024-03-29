import React from "react";

import { useTranslation } from "react-i18next";
import { Dimensions, StyleSheet, View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import SettingsLanguage from "@/features/settings/settings-language/settings-language";
import SettingsStatistics from "@/features/settings/settings-statistics/settings-statistics";
import SettingsTheme from "@/features/settings/settings-theme/settings-theme";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import PageTitle from "@/shared/ui/page-title/page-title";

const screenWidth = Dimensions.get("window").width;

const ProfilePage: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { colors } = useThemeContext();  

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.color1 }]}>
      <PageTitle style={styles.title} >{t("tabs.profile")}</PageTitle>

      <ScrollView contentContainerStyle={styles.scroll} >
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
    marginHorizontal: screenWidth > 500 ? "12.5%" : 0,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  title: {
    marginLeft: 20
  },
});
