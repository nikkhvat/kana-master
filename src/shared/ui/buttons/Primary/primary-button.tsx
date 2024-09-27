import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { Typography } from "@/shared/typography";
import { FC, ReactNode } from "react";

import * as Haptics from "expo-haptics";

import { Text, StyleSheet, Pressable } from "react-native";

interface PrimaryButtonProps {
  content?: ReactNode;

  text?: string;
  isDisabled?: boolean;

  width?: number;
  isFullWidth?: boolean;

  isHapticFeedback?: boolean;

  containerStyles?: Record<string, string | number>;
  textStyles?: Record<string, string | number>;

  onClick?: () => void;
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
  content,
  text,
  isDisabled,

  width,
  isFullWidth,

  isHapticFeedback,

  containerStyles,
  textStyles,

  onClick,
}) => {
  const { colors } = useThemeContext();

  const onPress = () => {
    if (isDisabled) return;

    if (isHapticFeedback) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    if (!isDisabled) {
      onClick?.();
    }
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          width: width ? width : isFullWidth ? "100%" : "auto",
        },
        isDisabled
          ? {
              backgroundColor: colors.BgLightGray,
            }
          : {
              backgroundColor: pressed
                ? colors.BgContrastPressed
                : colors.BgContrast,
            },
        styles.button,
        containerStyles && containerStyles,
      ]}
    >
      {!content && text && (
        <Text
          style={[
            {
              color: isDisabled
                ? colors.TextSecondary
                : colors.TextContrastPrimary,
            },
            Typography.boldH4,
            textStyles && textStyles,
          ]}
        >
          {text}
        </Text>
      )}

      {content && !text && content}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,

    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 30,
    paddingRight: 30,

    borderRadius: 12,
  },
});

export default PrimaryButton;
