import React, { useEffect, useMemo, useState } from "react";

import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { View, Text, SectionList, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import EducationKanaTableSelected from "@/features/education/education-kana-table-selected/education-kana-table";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { resetKanaSelected } from "@/pages/kana/kana-quick-selection/model/slice";
import { Alphabet, KanaAlphabet } from "@/shared/constants/kana";
import { useAppDispatch } from "@/shared/model/hooks";
import { RootStackParamList } from "@/shared/types/navigationTypes";
import Switcher from "@/shared/ui/switcher/switcher";

interface KanaInfoProps {
  navigation: StackNavigationProp<RootStackParamList, "KanaSelect">;
}

const EducationKanaSelection: React.FC<KanaInfoProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { colors } = useThemeContext();

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
      headerTitleAlign: "center",
      title: activeTab === KanaAlphabet.Hiragana ? t("kana.hiragana") : t("kana.katakana"),
      headerLeft: () => <TouchableOpacity 
        onPress={navigation.goBack} 
        style={{ padding: 14, margin: -14 }}>
        <Text style={{ color: colors.color4, fontSize: 17, fontWeight: "400" }}>{t("common.close")}</Text>
      </TouchableOpacity>,
      headerRight: () => <TouchableOpacity onPress={() => dispatch(resetKanaSelected())} style={{ padding: 14, margin: -14 }}>
        <Text style={{ color: colors.second_color3, fontSize: 17, fontWeight: "400" }}>{t("common.reset")}</Text>
      </TouchableOpacity>,
      headerShadowVisible: false,
    });
  }, [activeTab, dispatch, navigation, t]);

  const insets = useSafeAreaInsets();

  return (
    <>
      <View style={{ flex: 1, backgroundColor: colors.color1, paddingBottom: 40 + insets.bottom }}>
        {Platform.OS === "ios" && <View style={[styles.lineContainer, { top: 40, backgroundColor: colors.color2 }]} />}
        <SectionList
          sections={sections}
          keyExtractor={(item, index) => item + index}
          renderItem={({ section }) => (
            <React.Suspense fallback={<View />}>
              <EducationKanaTableSelected
                isEditMode={true}
                type={section.type as Alphabet}
                kana={activeTab}
                last={section.type === "yoon"}
              />
            </React.Suspense>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <View style={[styles.nameContainer, { backgroundColor: colors.color1 }]}>
              <Text style={[styles.name, { color: colors.color4 }]}>{title}</Text>
            </View>
          )}
        />
      </View>
      <View style={[
        styles.switcherContainer, 
        { 
          bottom: insets.bottom, 
          backgroundColor: colors.color1, 
          borderColor: colors.color2, 
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

export default EducationKanaSelection;


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
  name: {
    fontSize: 17,
    fontWeight: "700",
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