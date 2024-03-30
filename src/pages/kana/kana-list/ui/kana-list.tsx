import React, { useCallback, useMemo, useState } from "react";

import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { SectionList, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import EducationKanaTable from "@/features/education/education-kana-table/education-kana-table";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { Alphabet, KanaAlphabet } from "@/shared/constants/kana";
import { LettersKeys, dakuonFlatLettersId, handakuonFlatLettersId, yoonFlatLettersId } from "@/shared/data/lettersTable";
import { RootStackParamList } from "@/shared/types/navigationTypes";
import PageTitle from "@/shared/ui/page-title/page-title";
import Switcher from "@/shared/ui/switcher/switcher";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const MemoizedEducationKanaTable = React.memo(EducationKanaTable);

export const Kana: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();

  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<KanaAlphabet>(KanaAlphabet.Hiragana);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getTypeById = (id: any) => {
    if (yoonFlatLettersId.includes(id)) return t("kana.yoon");
    if (handakuonFlatLettersId.includes(id)) return t("kana.handakuon");
    if (dakuonFlatLettersId.includes(id)) return t("kana.dakuon");

    return t("kana.basic");
  };

  const openModal = useCallback((id: LettersKeys) => {
    navigation.navigate("KanaInfo", {
      id: id,
      kana: activeTab,
      title: `${activeTab === KanaAlphabet.Hiragana ? t("kana.hiragana") : t("kana.katakana")} (${getTypeById(id)})`
    });
  }, [activeTab, navigation, t]);

  const sections = useMemo(
    () => [
      { title: t("kana.basic"), data: ["base"] },
      { title: t("kana.dakuon"), data: ["dakuon"] },
      { title: t("kana.handakuon"), data: ["handakuon"] },
      { title: t("kana.yoon"), data: ["yoon"] },
    ],
    [t]
  );

  const { colors } = useThemeContext();  

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.color1 }]}>
      <PageTitle style={styles.title} >{t("tabs.kana")}</PageTitle>
      <View style={styles.switcherContainer}>
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
          ]}
        />
      </View>
      <View style={[styles.lineContainer, { top: insets.top + 155, backgroundColor: colors.color2 }]} />
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <React.Suspense fallback={<View />}>
            <MemoizedEducationKanaTable
              type={item as Alphabet}
              kana={activeTab}
              onClick={openModal}
              last={item === "yoon"}
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
  );
};

export default Kana;


const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingBottom: 80,
  },
  switcherContainer: {
    paddingHorizontal: 20,
  },
  title: {
    marginLeft: 20,
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