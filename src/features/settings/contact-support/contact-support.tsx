import SettingItem from "@/entities/profile/setting-item/setting-item";
import React from "react";

const ContactSupport: React.FC = () => {
  return (
    <SettingItem
      isLast
      text={"Contact Support"}
      link="https://kana-master.khvat.pro/en/contact_support"
    />
  );
};

export default ContactSupport;
