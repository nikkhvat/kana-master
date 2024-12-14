import React from "react";

import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import PrimaryButton from "@/shared/ui/buttons/Primary/primary-button";
import { Typography } from "@/shared/typography";

interface StartPracticeButtonProps {
  conditions: {
    condition: boolean;
    text: string;
  }[];
  absolute?: boolean;
  onPress: () => void;
}

const StartPracticeButton: React.FC<StartPracticeButtonProps> = ({
  conditions,
  onPress,
  absolute,
}) => {
  const { t } = useTranslation();
  const { colors } = useThemeContext();

  const someError = conditions.some((el) => !el.condition);
  const error = conditions.filter((el) => !el.condition);

  return (
    <View
      style={[{ marginTop: 32 }, absolute && styles.absolute]}
    >
      {someError && (
        <Text
          style={[
            Typography.regularCaption,
            styles.hint,
            { color: colors.TextSecondary },
          ]}
        >
          {error[0]?.text}
        </Text>
      )}

      <PrimaryButton
        containerStyles={{ marginTop: 0, marginBottom: 32 }}
        text={t("common.start")}
        isDisabled={someError}
        onClick={onPress}
        isHapticFeedback
      />
    </View>
  );
};

export default StartPracticeButton;

const styles = StyleSheet.create({
  hint: {
    marginBottom: 8,
    width: "100%",
    textAlign: "center",
  },
  absolute: {
    margin: 0,
    marginTop: 0,
  },
});
