import React from "react";

import { useTranslation } from "react-i18next";
import { StyleSheet, View, ScrollView, Platform } from "react-native";

import SettingsLanguage from "@/features/settings/settings-language/settings-language";
import SettingsStatistics from "@/features/settings/settings-statistics/settings-statistics";
import SettingsTheme from "@/features/settings/settings-theme/settings-theme";
import SettingsTransliterations from "@/features/settings/settings-transliterations/settings-language";
import JoinCommunity from "@/features/settings/join-community/join-community";
import SettingsSection from "@/entities/profile/setting-section/settings-section";
import SettingsHaptic from "@/features/settings/settings-haptic/settings-haptic";
import PrivacyPolicy from "@/features/settings/privacy-policy/privacy-policy";
import ContactSupport from "@/features/settings/contact-support/contact-support";
import RemoveData from "@/features/settings/remove-data/remove-data";
import SettingItem from "@/entities/profile/setting-item/setting-item";

const SettingsPage: React.FC = () => {
  const { t } = useTranslation();

  const isJoinCommunity = false;

  return (
    <View style={{ flex: 1 }} >
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

        <SettingsSection>
          <RemoveData />
          <SettingItem
            text={t('settings.sourceCode.title')}
            subText={t('settings.sourceCode.githubRepository')}
            link={process.env.GITHUB_REPOSITORY}
          />
          <SettingItem
            isLast
            text={t('settings.version')}
            subText={`${process.env.VERSION} (${Platform.OS})`}
          />
        </SettingsSection>
      </ScrollView>
    </View>
  );
};

export default SettingsPage;

const styles = StyleSheet.create({
  scroll: {
    gap: 32,
    paddingBottom: 16
  },
  title: {
    marginLeft: 20,
  },
});
