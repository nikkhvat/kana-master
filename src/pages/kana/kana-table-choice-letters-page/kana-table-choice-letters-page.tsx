import React, { useEffect, useMemo, useState } from "react";

import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { View, Text, SectionList, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import EducationKanaTableSelected from "@/features/education/education-kana-table-selected/education-kana-table";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { resetKanaSelected } from "@/pages/kana/kana-table-choice-letters-page/model/slice";
import { Alphabet, KanaAlphabet } from "@/shared/constants/kana";
import { useAppDispatch } from "@/shared/model/hooks";
import { RootStackParamList } from "@/app/navigationTypes";
import Switcher from "@/shared/ui/switcher/switcher";
import { Typography } from "@/shared/typography";
import { ROUTES } from "@/app/navigationTypes";
import PrimaryButton from "@/shared/ui/buttons/Primary/primary-button";

interface KanaInfoProps {
  navigation: StackNavigationProp<RootStackParamList, typeof ROUTES.KANA_SELECT>;
}

const KanaTableChoiceLettersPage: React.FC<KanaInfoProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { colors } = useThemeContext();
  const insets = useSafeAreaInsets();

  const [activeTab, setActiveTab] = useState<KanaAlphabet>(KanaAlphabet.Hiragana);

  const sections = useMemo(
    () => [
      { title: t("kana.basic"), type: "base", data: ["base"] },
      { title: t("kana.dakuon"), type: "dakuon", data: ["dakuon"] },
      { title: t("kana.handakuon"), type: "handakuon", data: ["handakuon"] },
      { title: t("kana.yoon"), type: "yoon", data: ["yoon"] },
    ],
    [t]
  );

  useEffect(() => {
    navigation.setOptions({
      header: () => <View style={{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: insets.left + 20,
        paddingRight: insets.right + 20,
        backgroundColor: colors.BgPrimary,
      }} >
        <PrimaryButton
          isOutline
          containerStyles={{ borderWidth: 0 }}
          textStyles={{
            ...Typography.regularH4,
            color: colors.TextSecondary
          }}
          containerStylesFunc={({ pressed }) => ({
            backgroundColor: colors.BgPrimary,
          })}
          isHapticFeedback
          onClick={navigation.goBack}
          text={t("common.close")}
        />
        <Text style={[Typography.semiBoldH4, { color: colors.TextPrimary }]} >
          {activeTab === KanaAlphabet.Hiragana ? t("kana.hiragana") : t("kana.katakana")}
        </Text>
        <PrimaryButton
          isOutline
          containerStyles={{ borderWidth: 0 }}
          textStyles={{
            ...Typography.regularH4,
            color: colors.TextPrimary
          }}
          containerStylesFunc={({ pressed }) => ({
            backgroundColor: colors.BgPrimary,
          })}
          isHapticFeedback
          onClick={() => dispatch(resetKanaSelected())}
          text={t("common.reset")}
        />
      </View>,
    });
  }, [activeTab, dispatch, navigation, t]);

  return (
    <>
      <View style={{ flex: 1, backgroundColor: colors.BgPrimary, paddingBottom: 40 + insets.bottom }}>
        {Platform.OS === "ios" && <View style={[styles.lineContainer, { top: 40, backgroundColor: colors.BorderDefault }]} />}
        <SectionList
          sections={sections}
          keyExtractor={(item, index) => item + index}
          renderItem={({ section }) => (
            <React.Suspense fallback={<View />}>
              <EducationKanaTableSelected
                type={section.type as Alphabet}
                kana={activeTab}
                last={section.type === "yoon"}
              />
            </React.Suspense>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <View style={[styles.nameContainer, { backgroundColor: colors.BgPrimary }]}>
              <Text style={[Typography.boldH3, { color: colors.TextPrimary }]}>{title}</Text>
            </View>
          )}
        />
      </View>
      <View style={[
        styles.switcherContainer, 
        { 
          bottom: insets.bottom, 
          backgroundColor: colors.BgPrimary, 
          borderColor: colors.BorderDefault, 
        }]}>
        <Switcher<KanaAlphabet>
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          options={[
            KanaAlphabet.Hiragana,
            KanaAlphabet.Katakana
          ]}
          translate={[
            t("kana.hiragana"),
            t("kana.katakana"),
          ]} />
      </View>
    </>
  );
};

export default KanaTableChoiceLettersPage;


const styles = StyleSheet.create({
  content: {
    height: 52,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20
  },
  nameContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  lineContainer: {
    width: "100%",
    height: 1,
    position: "absolute",
    zIndex: 999,
  },
  switcherContainer: {
    position: "absolute",
    width: "100%",
    paddingTop: 15,
    paddingBottom: 15,
    borderTopWidth: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 20,
  }
});