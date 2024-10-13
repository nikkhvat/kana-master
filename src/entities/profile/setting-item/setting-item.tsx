import React from "react";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { StyleSheet, Text, View, Switch } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { Typography } from "@/shared/typography";

interface SettingItemProps {
  text: string;
  subText?: string;
  isEnable?: boolean;
  onValueChange?: () => void;
  onClick?: () => void;
  isLast?: boolean;
}

const SettingItem: React.FC<SettingItemProps> = ({
  text,
  subText,
  isEnable,
  onValueChange,
  isLast,
  onClick,
}) => {
  const { colors } = useThemeContext();

  return (
    <View
      style={[
        styles.container,
        !isLast
          ? {
              borderBottomWidth: 1,
              borderBottomColor: colors.BorderDefault,
              borderColor: colors.BorderDefault,
            }
          : {},
        !subText ? { height: 44 } : { height: 64 },
      ]}
    >
      <View
        style={{
          flexDirection: "column",
          flexWrap: "wrap",
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <Text style={[Typography.regularH4, { color: colors.TextPrimary }]}>
          {text}
        </Text>
        {subText && (
          <Text
            style={[
              Typography.regularParagraph,
              { color: colors.TextSecondary },
            ]}
          >
            {subText}
          </Text>
        )}
      </View>

      {isEnable !== undefined && onValueChange !== undefined && (
        <Switch
          trackColor={{
            false: colors.BgAccentPrimary,
            true: colors.BgAccentPrimary,
          }}
          thumbColor={isEnable ? colors.BgPrimary : colors.BgPrimary}
          ios_backgroundColor={colors.BgLightGray}
          onValueChange={() => {
            onValueChange?.();
          }}
          value={isEnable}
        />
      )}

      {onClick !== undefined && (
        <Icon
          onPress={onClick}
          name={"chevron-right"}
          size={24}
          color={colors.IconSecondary}
        />
      )}
    </View>
  );
};

export default SettingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 16,
  },
});
