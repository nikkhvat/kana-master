import SettingItem from "@/entities/profile/setting-item/setting-item";
import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <SettingItem
      text={"Privacy Policy"}
      link="https://kana-master.khvat.pro/en/privacy_policy"
    />
  );
};

export default PrivacyPolicy;
