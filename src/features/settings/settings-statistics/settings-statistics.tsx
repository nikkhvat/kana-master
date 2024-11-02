import React from "react";

import { useTranslation } from "react-i18next";
import { toggleStatistics } from "@/pages/kana/kana-table-list-page/model/slice";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import SettingItem from "@/entities/profile/setting-item/setting-item";

const SettingsStatistics: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const isEnabledStats = useAppSelector((state) => state.statistics.isEnabled);

  return (
    <SettingItem
      text={t("settings.displayStatistics")}
      isEnable={isEnabledStats}
      onValueChange={() => dispatch(toggleStatistics())}
    />
  );
};

export default SettingsStatistics;
