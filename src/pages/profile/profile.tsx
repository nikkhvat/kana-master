import React from "react";

import { useTranslation } from "react-i18next";
import { StyleSheet, View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AdaptiveLayout from "@/app/layouts/adaptiveLayout";
import SettingsLanguage from "@/features/settings/settings-language/settings-language";
import SettingsStatistics from "@/features/settings/settings-statistics/settings-statistics";
import SettingsTheme from "@/features/settings/settings-theme/settings-theme";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import SettingsTransliterations from "@/features/settings/settings-transliterations/settings-language";
import PageTitle from "@/shared/ui/page-title/page-title";
import JoinCommunity from "@/features/settings/join-community/join-community";
import SettingsSection from "@/entities/profile/setting-sectoin/settings-section";
import SettingsHaptic from "@/features/settings/settings-haptic/settings-haptic";

const ProfilePage: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { colors } = useThemeContext();

  const isJoinCommunity = false;

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, backgroundColor: colors.color1 },
      ]}
    >
      <AdaptiveLayout>
        <PageTitle style={styles.title}>{t("tabs.profile")}</PageTitle>

        <ScrollView contentContainerStyle={styles.scroll}>
          <SettingsSection>
            <SettingsStatistics />
            <SettingsHaptic />
            <SettingsTheme />
          </SettingsSection>

          {/* <SettingsStatistics /> */}
          <SettingsLanguage />
          <SettingsTransliterations />
          {isJoinCommunity && <JoinCommunity />}
        </ScrollView>
      </AdaptiveLayout>
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {},
  scroll: {
    // paddingHorizontal: 20,
    paddingBottom: 160,
  },
  title: {
    marginLeft: 20,
  },
});
