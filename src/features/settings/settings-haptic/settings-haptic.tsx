import React, { useEffect } from "react";

import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import SettingItem from "@/entities/profile/setting-item/setting-item";
import { toggleHaptic } from "@/pages/settings/model/slice";

const SettingsStatistics: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const isEnabledHaptic = useAppSelector(
    (state) => state.profile.isEnabledHaptic,
  );

  useEffect(() => {
    if (isEnabledHaptic === undefined) {
      dispatch(toggleHaptic())
    }
  })

  return (
    <SettingItem
      text={t("settings.hapticFeedback")}
      isEnable={isEnabledHaptic}
      onValueChange={() => dispatch(toggleHaptic())}
    />
  );
};

export default SettingsStatistics;
