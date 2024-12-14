import React from "react";

import { StyleProp, StyleSheet, TextStyle, View } from "react-native";
import { Text } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { ROUTES } from "@/app/navigationTypes";

interface PageTitleProps {
  children: React.ReactNode
  style?: StyleProp<TextStyle>
  isSaveArea?: boolean
  isKey?: boolean
}

type IconType = typeof ROUTES.LEARNING_ROOT
  | typeof ROUTES.PRACTICE_ROOT
  | typeof ROUTES.SETTINGS_ROOT
  | typeof ROUTES.KANA_TABLE_ROOT

const PageTitle: React.FC<PageTitleProps> = ({
  children,
  style = {},
  isSaveArea,
  isKey
}) => {
  const { colors } = useThemeContext();
  const insets = useSafeAreaInsets();

  const { t } = useTranslation();

  const titles = {
    [ROUTES.LEARNING_ROOT]: t('tabs.learning'),
    [ROUTES.PRACTICE_ROOT]: t('tabs.practice'),
    [ROUTES.SETTINGS_ROOT]: t('tabs.profile'),
    [ROUTES.KANA_TABLE_ROOT]: t('tabs.kana'),
  }
  
  return (
    <View style={[{ backgroundColor: colors.BgPrimary }, ...(isSaveArea ? [{
      paddingLeft: insets.left + 20,
      paddingTop: insets.top
      }] : [])]} >
      {children &&
        <Text style={[styles.title, { color: colors.TextPrimary }, style]}>
          {isKey && titles[children as IconType]}
          {!isKey && children}
        </Text>}
    </View>
  );
};

export default PageTitle;

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 44,
    marginTop: 10,
    marginBottom: 10,
  }
});