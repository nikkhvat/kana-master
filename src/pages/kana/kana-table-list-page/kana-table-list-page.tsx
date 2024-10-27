import React, { useCallback, useMemo, useState } from "react";

import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { Dimensions, Platform, SectionList, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AdaptiveLayout from "@/app/layouts/adaptiveLayout";
import SafeLayout from "@/app/layouts/safeLayout";
import EducationKanaTable from "@/features/education/education-kana-table/education-kana-table";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { Alphabet, KanaAlphabet } from "@/shared/constants/kana";
import { LettersKeys, dakuonFlatLettersId, handakuonFlatLettersId, yoonFlatLettersId } from "@/shared/data/lettersTable";
import { RootStackParamList } from "@/app/navigationTypes";
import PageTitle from "@/shared/ui/page-title/page-title";
import Switcher from "@/shared/ui/switcher/switcher";
import { ROUTES } from "@/app/navigationTypes";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, typeof ROUTES.KANA_TABLE_ROOT>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const MemoizedEducationKanaTable = React.memo(EducationKanaTable);

const screenHeight = Dimensions.get("window").height;

const getTypeById = (id: LettersKeys) => {
  if ((yoonFlatLettersId as string[]).includes(id)) return "kana.yoon";
  if ((handakuonFlatLettersId as string[]).includes(id)) return "kana.handakuon";
  if ((dakuonFlatLettersId as string[]).includes(id)) return "kana.dakuon";

  return "kana.basic";
};

const isIos = Platform.OS === "ios";
const isAndroid = Platform.OS === "android";

export const KanaTableListPage: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();

  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<KanaAlphabet>(KanaAlphabet.Hiragana);

  const openModal = useCallback((id: LettersKeys) => {
    navigation.navigate(ROUTES.KANA_INFO, {
      id: id,
      kana: activeTab,
      title: `${activeTab === KanaAlphabet.Hiragana ? t("kana.hiragana") : t("kana.katakana")} (${t(getTypeById(id))})`
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
    <SafeLayout disableLeft disableRight >
      <AdaptiveLayout>
        <View style={[{
          backgroundColor: colors.BgPrimary,
          flexDirection: "column",
          height: screenHeight - insets.bottom - (isAndroid ? 120 : 90),
        }]}>
          {isIos && <View style={[styles.lineContainer, { top: 155, backgroundColor: colors.BorderDefault }]} />}
          
          <PageTitle style={styles.title} >{t("tabs.kana")}</PageTitle>
          
          <View style={{ paddingBottom: isAndroid ? 20 : 0, paddingHorizontal: 20 }}>
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
              <View style={[styles.nameContainer, { backgroundColor: colors.BgPrimary }]}>
                <Text style={[styles.name, { color: colors.TextPrimary }]}>{title}</Text>
              </View>
            )}
          />
        </View>
      </AdaptiveLayout>
    </SafeLayout>
  );
};

export default KanaTableListPage;


const styles = StyleSheet.create({
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