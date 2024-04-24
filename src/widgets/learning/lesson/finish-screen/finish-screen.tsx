import React from "react";

import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { LessonFinish } from "@/shared/constants/lessons";
import Button from "@/shared/ui/button/button";

type FinishScreenProps = LessonFinish & {
  next: () => void
  retry: () => void
}


const FinishScreen: React.FC<FinishScreenProps> = ({ next, retry }) => {

  const { t } = useTranslation();
  const { colors } = useThemeContext();
  
  return (
    <View style={styles.container} >
      <View style={styles.titleContainer} >
        <Text style={[styles.title, {
          color: colors.color4
        }]} >
          {t("lesson.learningComplete")}
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
          onClick={next}
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
    marginBottom: 30,
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
