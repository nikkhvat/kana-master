import React from "react";

import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import Button from "@/shared/ui/button/button";

interface StartPracticeButtonProps {
  conditions: {
    condition: boolean,
    text: string
  }[]
  onPress: () => void
}

const StartPracticeButton: React.FC<StartPracticeButtonProps> = ({
  conditions,
  onPress
}) => {
  const { t } = useTranslation();
  const { colors } = useThemeContext();

  const someError = conditions.some((el) => !el.condition);
  const error = conditions.filter((el) => !el.condition);

  return (
    <View style={{ marginTop: someError ? 33 : 60 }} >
      {someError && <Text style={[styles.hint, { color: colors.color3 }]} >
        {error[0]?.text}
      </Text>}
      <Button
        customStyles={{ marginTop: 0, marginBottom: 15 }}
        title={t("testing.start")}
        type={someError ? "disabled" : "general"}
        fontSize={17}
        onClick={onPress}
      />
    </View>
  );
};

export default StartPracticeButton;

const styles = StyleSheet.create({
  hint: {
    lineHeight: 22,
    fontSize: 11,
    marginBottom: 5,
    width: "100%",
    textAlign: "center"
  }
});