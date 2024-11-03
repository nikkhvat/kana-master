import SettingItem from "@/entities/profile/setting-item/setting-item";
import React from "react";
import { useTranslation } from "react-i18next";

const ContactSupport: React.FC = () => {
  const { t, i18n: { language } } = useTranslation();

  const url = `${process.env.API_URL}/${language}/contact_support`;

  return (
    <SettingItem
      isLast
      text={t('settings.contactSupport')}
      link={`${process.env.API_URL}/${language}/contact_support`}
    />
  );
};

export default ContactSupport;
