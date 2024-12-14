import AsyncStorage from "@react-native-async-storage/async-storage";
import SafeLayout from "@/app/layouts/safeLayout";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { Typography } from "@/shared/typography";
import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from "react-native";

import practiceImage from "@/shared/assets/icon.png";
import { LanguageKeys, languageList, ShortLanguage } from "@/shared/constants/language";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import CountryFlag from "react-native-country-flag";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import { useTranslation } from "react-i18next";
import { updateLessons } from "../education/learning/model/slice";
import { toggleWelcomePage } from "../settings/model/slice";

import { useHaptic } from "@/shared/helpers/haptic";

interface LanguageItemProps {
  langKey: ShortLanguage;
  name: string
  onClick: (key: ShortLanguage) => void;
}

const LanguageItem: React.FC<LanguageItemProps> = ({ langKey, name, onClick }) => {
  const { triggerHaptic } = useHaptic();
  const { colors } = useThemeContext();

  return (
    <Pressable
      style={({ pressed }) => [styles.languageItem, { borderColor: colors.BorderDefault, backgroundColor: pressed ? colors.BgPrimaryPressed : colors.BgPrimary }]}
      onPress={() => {
        triggerHaptic();
        onClick(langKey)
      }}
    >
      <View style={styles.languageLeft} >
        <CountryFlag
          style={styles.languageFlag}
          isoCode={langKey === ShortLanguage.EN ? "gb" : langKey} size={24}
        />

        <Text style={[Typography.semiBoldH4, { color: colors.TextPrimary, textAlignVertical: "center" }]} >{name}</Text>
      </View>

      <Icon name={"chevron-right"} size={24} color={colors.IconPrimary} />
    </Pressable>
  )
};

const WelcomePage: React.FC = () => {
  const { colors } = useThemeContext();
  const { i18n } = useTranslation();

  const dispatch = useAppDispatch();

  const isWelcomePage = useAppSelector((state) => state.profile?.isWelcomePage);

  const setLanguage = async (lang: LanguageKeys) => {
    await AsyncStorage.setItem("lang", lang);
    i18n.changeLanguage(lang);

    dispatch(updateLessons({ lang }));
    dispatch(toggleWelcomePage());
  };

  if (!isWelcomePage) return null;

  return (
    <SafeLayout style={[styles.page, { backgroundColor: colors.BgPrimary }]} >
      <View style={styles.header} >
        <Image
          style={[styles.logo, { borderColor: colors.BorderDefault }]}
          source={practiceImage}
        />
        <Text style={[Typography.boldH1, styles.title, { color: colors.TextPrimary }]} >Welcome</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} >
        {languageList.map(item =>
          <LanguageItem
            key={item.key}
            langKey={item.key}
            name={item.title}
            onClick={setLanguage}
          />)}
      </ScrollView>
    </SafeLayout>
  )
}

const styles = StyleSheet.create({
  page: {
    position: 'absolute',
    zIndex: 100,
    width: "100%",
    height: "100%",
    flex: 1,
  },
  header: {
    marginTop: 64,
    marginBottom: 24,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 14,
  },
  title: {
    textAlign: "center"
  },
  logo: {
    width: 96,
    height: 96,
    borderRadius: 12,
    borderWidth: 1,
  },

  languageItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    marginTop: 14,
    padding: 14,
    borderRadius: 12,
  },

  languageFlag: {
    borderRadius: 4,
    width: 38
  },
  languageLeft: {
    flexDirection: "row",
    gap: 10,
  }
})

export default WelcomePage;