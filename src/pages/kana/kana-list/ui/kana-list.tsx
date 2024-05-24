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
import { RootStackParamList } from "@/shared/types/navigationTypes";
import PageTitle from "@/shared/ui/page-title/page-title";
import Switcher from "@/shared/ui/switcher/switcher";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

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

export const Kana: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();

  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<KanaAlphabet>(KanaAlphabet.Hiragana);

  const openModal = useCallback((id: LettersKeys) => {
    navigation.navigate("KanaInfo", {
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

  const scrollHeight = screenHeight - insets.top - 210;

  return (
    <SafeLayout disableLeft disableRight >
      <AdaptiveLayout>
        <View style={[styles.container, { backgroundColor: colors.color1 }]}>
          {isIos && <View style={[styles.lineContainer, { top: 155, backgroundColor: colors.color2 }]} />}
          <PageTitle style={styles.title} >{t("tabs.kana")}</PageTitle>
          <View style={[
            styles.switcherContainer,
            {
              paddingBottom: isAndroid ? 20 : 0
            }
          ]}>
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
            style={{ height: scrollHeight }}
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
      </AdaptiveLayout>
    </SafeLayout>
  );
};

export default Kana;


const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
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