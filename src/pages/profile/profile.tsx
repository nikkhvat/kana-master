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
import PrivacyPolicy from "@/features/settings/privacy-policy/privacy-policy";
import ContactSupport from "@/features/settings/contact-support/contact-support";

const ProfilePage: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { colors } = useThemeContext();

  const isJoinCommunity = false;

  return (
    <View style={[{ paddingTop: insets.top }]}>
      <AdaptiveLayout>
        <PageTitle style={styles.title}>{t("tabs.profile")}</PageTitle>

        <ScrollView contentContainerStyle={styles.scroll}>
          <SettingsSection>
            <SettingsStatistics />
            <SettingsHaptic />
            <SettingsTheme />
          </SettingsSection>

          <SettingsSection>
            <SettingsLanguage />
            <SettingsTransliterations />
          </SettingsSection>

          <SettingsSection>
            <PrivacyPolicy />
            <ContactSupport />
          </SettingsSection>

          {isJoinCommunity && (
            <SettingsSection>
              <JoinCommunity />
            </SettingsSection>
          )}
        </ScrollView>
      </AdaptiveLayout>
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  scroll: {
    paddingBottom: 160,
    gap: 32,
  },
  title: {
    marginLeft: 20,
  },
});
