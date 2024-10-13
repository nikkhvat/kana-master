import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { Typography } from "@/shared/typography";
import { FC, ReactNode } from "react";

import * as Haptics from "expo-haptics";

import { Text, StyleSheet, Pressable } from "react-native";
import { useAppSelector } from "@/shared/model/hooks";

interface PrimaryButtonProps {
  content?: ReactNode;

  text?: string;
  icon?: React.ReactElement;

  isDisabled?: boolean;
  isOutline?: boolean;
  isIcon?: boolean;

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

  icon,

  isDisabled,
  isOutline,
  isIcon,

  width,
  isFullWidth,

  isHapticFeedback,

  containerStyles,
  textStyles,

  onClick,
}) => {
  const { colors } = useThemeContext();

  const isEnabledHaptic = useAppSelector(
    (state) => state.profile.isEnabledHaptic,
  );

  const onPress = () => {
    if (isDisabled) return;

    if (isHapticFeedback && isEnabledHaptic) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    if (!isDisabled) {
      onClick?.();
    }
  };

  const getButtonStyles = (pressed: boolean) => [
    isFullWidth ? { flex: 1 } : { width },

    isDisabled
      ? { backgroundColor: colors.BgLightGray }
      : {
          backgroundColor: pressed
            ? colors.BgContrastPressed
            : colors.BgContrast,
        },

    isIcon && {
      backgroundColor: pressed
        ? colors.BgAccentSecondaryPressed
        : colors.BgAccentSecondary,
      borderColor: pressed
        ? colors.BgAccentSecondaryPressed
        : colors.BgAccentSecondary,
    },

    isOutline && {
      backgroundColor: pressed ? colors.BgPrimaryPressed : colors.BgPrimary,
      borderColor: colors.BorderDefault,
    },

    styles.button,
    containerStyles,
  ];

  const getTextStyles = () => [
    {
      color: isDisabled ? colors.TextSecondary : colors.TextContrastPrimary,
    },
    isOutline && {
      color: isDisabled ? colors.TextSecondary : colors.TextPrimary,
    },
    Typography.boldH4,
    textStyles,
  ];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => getButtonStyles(pressed)}
    >
      {!content && text && <Text style={getTextStyles()}>{text}</Text>}

      {content && !text && content}

      {icon && icon}
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

export default PrimaryButton;
