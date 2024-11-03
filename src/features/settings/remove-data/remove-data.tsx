import SettingItem from "@/entities/profile/setting-item/setting-item";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import React from "react";
import { useTranslation } from "react-i18next";
import { Alert, Vibration } from "react-native";

import * as Haptics from "expo-haptics";

import { isIOS } from "@/shared/constants/platformUtil";
import { clearStateProfile } from "@/pages/settings/model/slice";
import { clearStateLessons } from "@/pages/education/learning/model/slice";
import { clearStateKana } from "@/pages/kana/kana-table-choice-letters-page/model/slice";
import { clearStateStatistics } from "@/pages/kana/kana-table-list-page/model/slice";

const RemoveData: React.FC = () => {
  const { t, i18n: { language } } = useTranslation();

  const dispatch = useAppDispatch();

  const isEnabledHaptic = useAppSelector(
    (state) => state.profile.isEnabledHaptic,
  );

  const kanaState = useAppSelector((state) => state.kana);
  const lessonsState = useAppSelector((state) => state.lessons);
  const profileState = useAppSelector((state) => state.profile);
  const statisticsState = useAppSelector((state) => state.statistics);

  const stateSize = new Blob([
    JSON.stringify(kanaState),
    JSON.stringify(lessonsState),
    JSON.stringify(profileState),
    JSON.stringify(statisticsState),
  ]).size;

  const haptic = () => {
    if (isEnabledHaptic) {
      if (isIOS()) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } else {
        Vibration.vibrate(1);
      }
    }
  }

  const langSizes = {
    en: ["B", "KB", "MB", "GB"],
    ru: ["Б", "КБ", "МБ", "ГБ"],
    de: ["B", "KB", "MB", "GB"],
    es: ["B", "KB", "MB", "GB"],
    fr: ["o", "Ko", "Mo", "Go"],
    it: ["B", "KB", "MB", "GB"],
    pt: ["B", "KB", "MB", "GB"],
  }

  function formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) return "0";

    const k = 1024;
    const sizes = langSizes[language as "en"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + " " + sizes[i];
  }

  const eraseData = () => {
    dispatch(clearStateProfile());
    dispatch(clearStateLessons());
    dispatch(clearStateStatistics());
    dispatch(clearStateKana());
  }

  const confirmationCloseAlert = () =>
    Alert.alert(t('settings.eraseData.title'), t('settings.eraseData.subtitle'), [
      { text: t('alert.cancel'), style: 'cancel' },
      {
        text: t('alert.confirm'), onPress: () => {
          haptic();
          eraseData();
        }
      },
    ]);

  const dataTakesUp = t('settings.eraseData.dataTakesUp') + ': ' + formatBytes(stateSize);

  return (
    <SettingItem
      text={t('settings.eraseData.button')}
      subText={dataTakesUp}
      onClick={confirmationCloseAlert}
    />
  );
};

export default RemoveData;