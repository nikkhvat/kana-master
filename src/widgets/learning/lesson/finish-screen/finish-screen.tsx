import React from "react";

import { useTranslation } from "react-i18next";
import { Platform, StyleSheet, Text, View } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { LessonFinish } from "@/shared/constants/lessons";
import Button from "@/shared/ui/button/button";

import * as StoreReview from 'expo-store-review';


type FinishScreenProps = LessonFinish & {
  next: () => void
  retry: () => void
}


const FinishScreen: React.FC<FinishScreenProps> = ({ next, retry }) => {

  const { t } = useTranslation();
  const { colors } = useThemeContext();

  const onNext = () => {
    next()

    try {
      if (Platform.OS === "ios") {
        StoreReview.requestReview();
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <View style={styles.container} >
      <View style={styles.titleContainer} >
        <Text style={[styles.title, {
          color: colors.color4
        }]} >
          {t("lesson.learningComplete")}
        </Text>
        <Text style={[styles.subtitle, {
          color: colors.color3
        }]} >
          {t("lesson.practiceEveryDay")}
        </Text>
      </View>

      <View style={styles.btnsContainer} >
        <Button
          customStyles={{ width: "100%" }}
          type={"inactive"}
          title={t("common.retry")}
          onClick={retry}
        />
        <Button
          customStyles={{ width: "100%" }}
          type={"general"}
          title={t("common.complete")}
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
  title: {
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 15,
    width: "100%",
  },
  subtitle: {
    fontSize: 17,
    fontWeight: "400",
    textAlign: "center",
    paddingLeft: 30,
    paddingRight: 30,
    width: "100%",
  },
  titleContainer: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  btnsContainer: {
    width: "100%",
    alignItems: "center",
  }
});
