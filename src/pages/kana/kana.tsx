import React, { useCallback, useMemo, useState } from "react";

import { StackNavigationProp } from "@react-navigation/stack";
import { Audio } from "expo-av";
import { useTranslation } from "react-i18next";
import { SectionList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";


import { Alphabet } from "@/shared/constants/kana";
import {
  LettersKeys, baseFlatLettersId,
  dakuonFlatLettersId, handakuonFlatLettersId,
  lettersTableById, yoonFlatLettersId
} from "@/shared/data/lettersTable";
import { RootStackParamList } from "@/shared/types/navigationTypes";
import Switcher from "@/shared/ui/switcher/switcher";
import EducationKanaTable from "@/widgets/education/education-kana-table/education-kana-table";
import EducationShowKanaModal from "@/widgets/education/education-show-kana-modal/education-show-kana-modal";

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
      { title: "Base", data: ["base"] },
      { title: "Dakuon", data: ["dakuon"] },
      { title: "Handakuon", data: ["handakuon"] },
      { title: "Yoon", data: ["yoon"] },
    ],
    []
  );

  const toggleTab = (val: string) => {
    setActiveTab(val as "hiragana" | "katakana");
  };

  return (
    <Container paddingTop={insets.top}>
      <Title>{t("tabs.kana")}</Title>
      <Switcher
        activeTab={activeTab}
        setActiveTab={toggleTab}
        options={["hiragana", "katakana"]}
      />
      <LineContainer val={insets.top} />
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <React.Suspense fallback={<View></View>}>
            <View style={{ display: activeTab === "hiragana" ? "none" : "flex" }} >
              <MemoizedEducationKanaTable
                type={item as Alphabet}
                kana={"hiragana"}
                onClick={openModal}
                last={item === "yoon"}
              />
            </View>
            <View style={{ display: activeTab === "hiragana" ? "flex" : "none" }} >
              <MemoizedEducationKanaTable
                type={item as Alphabet}
                kana={"katakana"}
                onClick={openModal}
                last={item === "yoon"}
              />
            </View>
          </React.Suspense>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <NameContainer>
            <Name>{title}</Name>
          </NameContainer>
        )} />

        <EducationShowKanaModal
          show={isModalVisible === null ? false : true}
          kana={activeTab}
          changeKata={(kata) => setActiveTab(kata)}
          letter={lettersTableById[isModalVisible as LettersKeys] || null}
          closeModal={closeModal}
          drawSymbol={() => { }}
          prevLetter={prev}
          nextLetter={next}
        />
    </Container>
  );
};

export default Kana;

const Container = styled.View<{ paddingTop: number }>`
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.color1};
  padding-top: ${({ paddingTop }) => paddingTop + "px"};
  padding-bottom: 140px;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: 700;
  margin-left: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.color4};
`;

const NameContainer = styled.View`
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: ${({ theme }) => theme.colors.color1};
`;

const Name = styled.Text`
  color: ${({ theme }) => theme.colors.color4};
  font-size: 17px;
  font-weight: 700;
`;

const LineContainer = styled.View<{ val: number }>`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.color2};
  position: absolute;
  top: 220px;
  z-index: 999;
  top: ${({ val }) => (val + 160) + "px"};;
`;