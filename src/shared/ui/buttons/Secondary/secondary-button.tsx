import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { Typography } from "@/shared/typography";
import { FC, ReactNode } from "react";

import * as Haptics from "expo-haptics";

import { Text, StyleSheet, Pressable, DimensionValue, Vibration } from "react-native";
import { useAppSelector } from "@/shared/model/hooks";
import { isIOS } from "@/shared/constants/platformUtil";

interface SecondaryButtonProps {
  content?: ReactNode;

  text?: string;
  icon?: React.ReactElement;

  isDisabled?: boolean;
  isOutline?: boolean;

  width?: DimensionValue;
  isFullWidth?: boolean;

  isHapticFeedback?: boolean;

  containerStyles?: Record<string, string | number>;
  textStyles?: Record<string, string | number>;

  onClick?: () => void;
}

const SecondaryButton: FC<SecondaryButtonProps> = ({
  content,
  text,

  icon,

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

  const isEnabledHaptic = useAppSelector(
    (state) => state.profile.isEnabledHaptic,
  );

  const onPress = () => {
    if (isDisabled) return;

    if (isHapticFeedback && isEnabledHaptic) {
      if (isIOS()) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } else {
        Vibration.vibrate(1);
      }
    }

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