import React, { useCallback, useMemo, useState } from "react";

import { StackNavigationProp } from "@react-navigation/stack";
import { Audio } from "expo-av";
import { useTranslation } from "react-i18next";
import { SectionList, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import EducationKanaTable from "@/features/education/education-kana-table/education-kana-table";
import EducationShowKanaModal from "@/features/education/education-show-kana-modal/education-show-kana-modal";
import { useThemeContext } from "@/hooks/theme-context";
import { Alphabet } from "@/shared/constants/kana";
import {
  LettersKeys, baseFlatLettersId,
  dakuonFlatLettersId, handakuonFlatLettersId,
  lettersTableById, yoonFlatLettersId
} from "@/shared/data/lettersTable";
import { RootStackParamList } from "@/shared/types/navigationTypes";
import Switcher from "@/shared/ui/switcher/switcher";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const MemoizedEducationKanaTable = React.memo(EducationKanaTable);

export const Kana: React.FC<HomeScreenProps> = ({ navigation }) => {
  Audio.setAudioModeAsync({ playsInSilentModeIOS: true });

  const { t } = useTranslation();

  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<"hiragana" | "katakana">("hiragana");

  const [isModalVisible, setModalVisible] = useState<LettersKeys | null>(null);

  const openModal = useCallback((id: LettersKeys) => {
    setModalVisible(id);
  }, []);

  const closeModal = () => setModalVisible(null);

  const flatLetters = useMemo(() => [
    ...baseFlatLettersId,
    ...dakuonFlatLettersId,
    ...handakuonFlatLettersId,
    ...yoonFlatLettersId,
  ], []);

  const prev = () => {
    if (isModalVisible === null) return;

    const active = lettersTableById[isModalVisible];
    const activeIndex = flatLetters.findIndex((element) => element === active.id);
    if (activeIndex === 0) return;

    setModalVisible(flatLetters[activeIndex - 1]);
  };

  const next = () => {
    if (isModalVisible === null) return;

    const active = lettersTableById[isModalVisible];
    const activeIndex = flatLetters.findIndex((element) => element === active.id);
    if (flatLetters.length === activeIndex + 1) return;

    setModalVisible(flatLetters[activeIndex + 1]);
  };

  const sections = useMemo(
    () => [
      { title: "Basic", data: ["base"] },
      { title: "Dakuon", data: ["dakuon"] },
      { title: "Handakuon", data: ["handakuon"] },
      { title: "Yoon", data: ["yoon"] },
    ],
    []
  );

  const toggleTab = (val: string) => {
    setActiveTab(val as "hiragana" | "katakana");
  };

  const { colors } = useThemeContext();  

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.color1 }]}>
      <Text style={[styles.title, { color: colors.color4 }]}>{t("tabs.kana")}</Text>
      <View style={styles.switcherContainer}>
        <Switcher
          activeTab={activeTab}
          setActiveTab={toggleTab}
          options={[
            "hiragana", 
            "katakana"
          ]}
          translate={[
            t("kana.hiragana"),
            t("kana.katakana"),
          ]}
        />
      </View>
      <View style={[styles.lineContainer, { top: insets.top + 160, backgroundColor: colors.color2 }]} />
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

      <EducationShowKanaModal
        type="yoon"
        show={isModalVisible === null ? false : true}
        kana={activeTab}
        changeKata={(kata) => setActiveTab(kata)}
        letter={lettersTableById[isModalVisible as LettersKeys] || null}
        drawSymbol={() => { }}
        closeModal={closeModal}
        prevLetter={prev}
        nextLetter={next}
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