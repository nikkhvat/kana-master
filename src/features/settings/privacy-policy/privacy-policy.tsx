import SettingItem from "@/entities/profile/setting-item/setting-item";
import React from "react";
import { useTranslation } from "react-i18next";

const PrivacyPolicy: React.FC = () => {
  const { t, i18n: { language } } = useTranslation();


  return (
    <SettingItem
      text={t('settings.privacyPolicy')}
      link={`${process.env.API_URL}/${language}/privacy_policy`}
    />
  );
};

export default PrivacyPolicy;
