import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { Typography } from "@/shared/typography";
import React, { ReactNode } from "react";

import { Text, StyleSheet, Pressable, DimensionValue, StyleProp, TextStyle, ViewStyle } from "react-native";
import { useHaptic } from "@/shared/helpers/haptic";

interface SecondaryButtonProps {
  content?: ReactNode;

  text?: string;
  icon?: React.ReactElement;

  isGray?: boolean;

  isDisabled?: boolean;
  isOutline?: boolean;

  width?: DimensionValue;
  isFullWidth?: boolean;

  isHapticFeedback?: boolean;

  containerStyles?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;

  children?: React.ReactElement;

  onClick?: () => void;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  content,
  
  text,
  icon,

  isGray,

  isDisabled,
  isOutline,

  width,
  isFullWidth,

  isHapticFeedback,

  containerStyles,
  textStyles,

  children,

  onClick,
}) => {
  const { colors } = useThemeContext();

  const { triggerHaptic } = useHaptic();

  const onPress = () => {
    if (isDisabled) return;

    triggerHaptic(isHapticFeedback);

    if (!isDisabled) {
      onClick?.();
    }
  };

  const getButtonStyles = (pressed: boolean) => [
    isFullWidth ? { flex: 1 } : { width },

    {
      backgroundColor: colors.BgAccentPrimary,
      borderColor: colors.BgAccentPrimary,
    },

    pressed &&
    !isOutline && {
      backgroundColor: colors.BgAccentPrimaryPressed,
      borderColor: colors.BgAccentPrimaryPressed,
    },

    isGray && {
      backgroundColor: colors.BgAccentSecondary,
    },

    pressed && isGray && {
      backgroundColor: colors.BgAccentSecondaryPressed,
    },

    isOutline && {
      backgroundColor: colors.BgPrimary,
      borderColor: colors.BorderDefault,
    },

    isDisabled && {
      backgroundColor: colors.BgLightGray,
      borderColor: colors.BgLightGray,
    },

    pressed &&
    isOutline &&
    !isDisabled && {
      backgroundColor: colors.BgPrimaryPressed,
      borderColor: colors.BorderDefault,
    },

    styles.button,
    containerStyles && containerStyles,
  ];

  const getTextStyles = () => [
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
  ];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => getButtonStyles(pressed)}
    >
      {!content && text && <Text style={getTextStyles()}>{text}</Text>}

      {content && !text && content}
      {icon && icon}

      {children && children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    gap: 6,
    justifyContent: "center",
    alignItems: "center",
    height: 50,

    borderWidth: 1,

    borderRadius: 12,
  },
});

export default SecondaryButton;