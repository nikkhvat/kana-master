import React from "react";

import { useTranslation } from "react-i18next";
import { Platform, StyleSheet, Text, View } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { LessonFinish } from "@/shared/constants/lessons";

import * as StoreReview from "expo-store-review";
import PrimaryButton from "@/shared/ui/buttons/Primary/primary-button";
import { LearningTitle } from "../ui/title";
import { Typography } from "@/shared/typography";

type FinishScreenProps = LessonFinish & {
  next: () => void;
  retry: () => void;
};

const FinishScreen: React.FC<FinishScreenProps> = ({ next, retry }) => {
  const { t } = useTranslation();
  const { colors } = useThemeContext();

  const onNext = () => {
    next();

    try {
      if (Platform.OS === "ios") {
        StoreReview.requestReview();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <LearningTitle style={[Typography.boldH1]}>
          {t("lesson.learningComplete")}
        </LearningTitle>
        <LearningTitle
          style={[Typography.regularParagraph, { color: colors.TextSecondary }]}
        >
          {t("lesson.practiceEveryDay")}
        </LearningTitle>
      </View>

      <View style={styles.btnsContainer}>
        <PrimaryButton isFullWidth text={t("common.retry")} onClick={retry} />
        <PrimaryButton
          isOutline
          isFullWidth
          text={t("common.complete")}
          onClick={onNext}
        />
      </View>
    </View>
  );
};

export default FinishScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  titleContainer: {
    width: "100%",
    flex: 1,
    gap: 16,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  btnsContainer: {
    width: "100%",
    gap: 16,

    height: 116,
  },
});
