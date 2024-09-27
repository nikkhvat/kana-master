import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { Typography } from "@/shared/typography";
import { FC, ReactNode } from "react";

import * as Haptics from "expo-haptics";

import { Text, StyleSheet, Pressable } from "react-native";

interface SecondaryButtonProps {
  content?: ReactNode;

  text?: string;

  isDisabled?: boolean;
  isOutline?: boolean;

  width?: number;
  isFullWidth?: boolean;

  isHapticFeedback?: boolean;

  containerStyles?: Record<string, string | number>;
  textStyles?: Record<string, string | number>;

  onClick?: () => void;
}

const SecondaryButton: FC<SecondaryButtonProps> = ({
  content,
  text,

  isDisabled,
  isOutline,

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

  const normalColors = {
    backgroundColor: colors.BgAccentPrimary,
    borderColor: colors.BgAccentPrimary,
  };

  const outlineColors = {
    backgroundColor: colors.BgPrimary,
    borderColor: colors.BorderDefault,
  };

  const pressedoutlineColors = {
    backgroundColor: colors.BgPrimaryPressed,
    borderColor: colors.BorderDefault,
  };

  const pressedColors = {
    backgroundColor: colors.BgAccentPrimaryPressed,
    borderColor: colors.BgAccentPrimaryPressed,
  };

  const disablesColors = {
    backgroundColor: colors.BgLightGray,
    borderColor: colors.BgLightGray,
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          width: width ? width : isFullWidth ? "100%" : "auto",
        },
        normalColors,
        pressed && !isOutline && pressedColors,
        isOutline && outlineColors,
        isDisabled && disablesColors,
        pressed && isOutline && pressedoutlineColors,
        styles.button,
        containerStyles && containerStyles,
      ]}
    >
      {!content && text && (
        <Text
          style={[
            {
              color: colors.TextContrastSecondary,
            },
            isOutline && {
              color: colors.TextPrimary,
            },
            isDisabled && {
              color: colors.TextSecondary,
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

    borderWidth: 1,

    borderRadius: 12,
  },
});

export default SecondaryButton;
