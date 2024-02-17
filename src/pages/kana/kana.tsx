import React, { useState } from "react";

import { StackNavigationProp } from "@react-navigation/stack";
import { Audio } from "expo-av";
import { useTranslation } from "react-i18next";
import {
  View,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";


import {
  LettersKeys, baseFlatLetters, dakuonFlatLetters,
  handakuonFlatLetters, lettersTable,
  lettersTableById, yoonFlatLetters
} from "@/shared/data/lettersTable";
import { RootStackParamList } from "@/shared/types/navigationTypes";
import Switcher from "@/shared/ui/switcher/switcher";
import EducationKanaTable from "@/widgets/education/education-kana-table/education-kana-table";
import EducationShowKanaModal from "@/widgets/education/education-show-kana-modal/education-show-kana-modal";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export const Kana: React.FC<HomeScreenProps> = ({ navigation }) => {
  Audio.setAudioModeAsync({ playsInSilentModeIOS: true });

  const { t } = useTranslation();

  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<"hiragana" | "katakana">("hiragana");

  const [isModalVisible, setModalVisible] = useState<string | null>(null);

  const closeModal = () => setModalVisible(null);

  const flatLetters = [
    ...baseFlatLetters,
    ...dakuonFlatLetters,
    ...handakuonFlatLetters,
    ...yoonFlatLetters,
  ];

  const prev = () => {
    const active = lettersTableById[isModalVisible as LettersKeys];
    const activeIndex = flatLetters.findIndex((element) => element === active.en);

    if (activeIndex === 0) return;

    const newLetter = lettersTable[flatLetters[activeIndex - 1]];
    setModalVisible(newLetter.id);
  };

  const next = () => {
    const active = lettersTableById[isModalVisible as LettersKeys];
    const activeIndex = flatLetters.findIndex((element) => element === active.en);

    if (flatLetters.length === activeIndex + 1) return;

    const newLetter = lettersTable[flatLetters[activeIndex + 1]];
    setModalVisible(newLetter.id);
  };

  return (
    <Container paddingTop={insets.top}>
      <Title>{t("tabs.kana")}</Title>
      <Switcher
        activeTab={activeTab}
        setActiveTab={(val) => setActiveTab(val as "hiragana" | "katakana")}
        options={["hiragana", "katakana"]}
      />
      {isModalVisible === null && <ScrollView>
        <NameContainer>
          <Name>Basic</Name>
        </NameContainer>
        <EducationKanaTable type="base" kana={activeTab} onClick={setModalVisible} />
        <NameContainer>
          <Name>Dakuon</Name>
        </NameContainer>
        <EducationKanaTable type="dakuon" kana={activeTab} onClick={setModalVisible} />
        <NameContainer>
          <Name>Handakuon</Name>
        </NameContainer>
        <EducationKanaTable type="handakuon" kana={activeTab} onClick={setModalVisible} />
        <NameContainer>
          <Name>Yoon</Name>
        </NameContainer>
        <EducationKanaTable type="yoon" kana={activeTab} onClick={setModalVisible} />
        <View style={{ marginBottom: 120 }}></View>
      </ScrollView>}
      {isModalVisible !== null && (
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
      )}
    </Container>
  );
};

export default Kana;


const Container = styled.View<{ paddingTop: number }>`
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.color1};
  padding-top: ${({ paddingTop }) => paddingTop + "px"};
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
  border-color: ${({ theme }) => theme.colors.color2};
  border-bottom-width: 1px;
`;

const Name = styled.Text`
  color: ${({ theme }) => theme.colors.color4};
  font-size: 17px;
  font-weight: 700;
`;
