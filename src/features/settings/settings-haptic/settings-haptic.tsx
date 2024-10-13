import React from "react";

import { useTranslation } from "react-i18next";
import { toggleStatistics } from "@/pages/kana/kana-list/model/slice";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import SettingItem from "@/entities/profile/setting-item/setting-item";
import { toggleHaptic } from "@/pages/profile/model/slice";

const SettingsStatistics: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const isEnabledHaptic = useAppSelector(
    (state) => state.profile.isEnabledHaptic,
  );

  console.log("isEnabledHaptic", isEnabledHaptic);

  return (
    <SettingItem
      text={"Haptic feedback"}
      isEnable={isEnabledHaptic}
      onValueChange={() => dispatch(toggleHaptic())}
    />
  );
};

export default SettingsStatistics;
