import React, { useMemo, useState } from "react";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { View, Pressable, Text, SectionList, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import EducationKanaTableSelected from "@/features/education/education-kana-table-selected/education-kana-table";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { resetKanaSelected } from "@/pages/kana/kana-quick-selection/model/slice";
import { Alphabet, KanaAlphabet } from "@/shared/constants/kana";
import { useAppDispatch } from "@/shared/model/hooks";
import { RootStackParamList } from "@/shared/types/navigationTypes";
import Switcher from "@/shared/ui/switcher/switcher";

interface KanaInfoProps {
  route: RouteProp<RootStackParamList, "KanaSelect">;
  navigation: StackNavigationProp<RootStackParamList, "KanaSelect">;
}

const EducationKanaSelection: React.FC<KanaInfoProps> = ({ route, navigation }) => {
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

  const insets = useSafeAreaInsets();

  return (
    <>
      <View style={{ flex: 1, backgroundColor: colors.color1, paddingBottom: 40 + insets.bottom }}>
        <View style={{ 
            height: 52,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: 20,
            paddingRight: 20
          }} >
          <Pressable onPress={navigation.goBack} style={{ padding: 14, margin: -14 }}>
            <Text style={{ color: colors.color4, fontSize: 17, fontWeight: "400" }}>{t("common.close")}</Text>
          </Pressable>
          <Text style={{ color: colors.color4, fontSize: 17, fontWeight: "700" }}>
            {activeTab === KanaAlphabet.Hiragana ? t("kana.hiragana") : t("kana.katakana")}
          </Text>
          <Pressable onPress={() => dispatch(resetKanaSelected())} style={{ padding: 14, margin: -14 }}>
            <Text style={{ color: colors.second_color3, fontSize: 17, fontWeight: "400" }}>{t("common.reset")}</Text>
          </Pressable>
        </View>
        <View style={[styles.lineContainer, { top: 90, backgroundColor: colors.color2 }]} />
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
      <View style={{ 
        position: "absolute", 
        bottom: insets.bottom, 
        width: "100%", 
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: colors.color1, 
        borderColor: colors.color2, 
        borderTopWidth: 1, 
        flexDirection: "row", 
        alignItems: "flex-start", 
        justifyContent: "center", 
        paddingHorizontal: 20,
      }}>
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
  container: {
    flexDirection: "column",
    paddingBottom: 80,
  },
  switcherContainer: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
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
});