import React, { useMemo, useState } from "react";

import { StackNavigationProp } from "@react-navigation/stack";
import { Audio } from "expo-av";
import {
  View,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";

import { ILetter, baseWithSpaces, dakuon, handakuon, yoon } from "../../data/lettersTable";

import KanaModal from "@/components/KanaModal";
import KanaTable from "@/components/KanaTable";
import Switch from "@/components/Switch";
import { RootStackParamList } from "@/types/navigationTypes";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

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
  border-color: ${({theme}) => theme.colors.color2};
  border-bottom-width: 1px;
`;

const Name = styled.Text`
  color: ${({theme}) => theme.colors.color4};
  font-size: 17px;
  font-weight: 700;
`;

export const Kana: React.FC<HomeScreenProps> = ({ navigation }) => {
  Audio.setAudioModeAsync({ playsInSilentModeIOS: true });

  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<"hiragana" | "katakana">("hiragana");

  const rowsDakuon = useMemo(() => dakuon.map((item) => item), []);
  const rowsHandakuon = useMemo(() => handakuon.map((item) => item), []);
  const rowsYoon = useMemo(() => yoon.map((item) => item), []);

  const [isModalVisible, setModalVisible] = useState(null as null | [(ILetter | number), number, number, string]);

  const closeModal = () => setModalVisible(null);  

  const list = ["basic", "dakuon", "handakuon", "yoon"];
  const listLetters = [baseWithSpaces, rowsDakuon, rowsHandakuon, rowsYoon];

  function isLetter(item: ILetter | number) {
    return typeof item === "object";
  }

  function findNext(isModalVisible: null | [(ILetter | number), number, number, string]): [(ILetter | number), number, number, string] | null {
    if (!isModalVisible) return null;

    // eslint-disable-next-line prefer-const
    let [currentLetter, rowIndex, colIndex, listName] = isModalVisible;
    let listIndex = list.indexOf(listName);

    do {
      colIndex++;
      if (colIndex >= listLetters[listIndex][rowIndex].length) {
        rowIndex++;
        colIndex = 0;
        if (rowIndex >= listLetters[listIndex].length) {
          listIndex = (listIndex + 1) % list.length;
          rowIndex = 0;
        }
      }
    } while (!isLetter(listLetters[listIndex][rowIndex][colIndex]) && rowIndex < listLetters[listIndex].length);

    return [listLetters[listIndex][rowIndex][colIndex], rowIndex, colIndex, list[listIndex]];
  }

  function findPrev(
    isModalVisible: null | [(ILetter | number), number, number, string]
  ): [ILetter | number, number, number, string] | null {
    if (!isModalVisible) return null;

    // eslint-disable-next-line prefer-const
    let [currentLetter, rowIndex, colIndex, listName] = isModalVisible;
    let listIndex = list.indexOf(listName);

    do {
      colIndex--;
      if (colIndex < 0) {
        rowIndex--;
        if (rowIndex < 0) {
          listIndex = (listIndex - 1 + list.length) % list.length;
          rowIndex = listLetters[listIndex].length - 1;
        }
        colIndex = listLetters[listIndex][rowIndex].length - 1;
      }
    } while (
      !isLetter(listLetters[listIndex][rowIndex][colIndex]) &&
      rowIndex >= 0
    );

    return [
      listLetters[listIndex][rowIndex][colIndex],
      rowIndex,
      colIndex,
      list[listIndex],
    ];
  }

  const prev = () => {
    const res = findPrev(isModalVisible);

    if (res !== undefined) {
      setModalVisible(res);
    }
  };
  
  const next = () => {
    const res = findNext(isModalVisible);

    if (res !== undefined) {
      setModalVisible(res);
    }
  };

  return (
    <Container paddingTop={insets.top}>
      <Title>Kana</Title>
      <Switch
        activeTab={activeTab}
        setActiveTab={(val) => setActiveTab(val as "hiragana" | "katakana")}
        options={["hiragana", "katakana"]}
      />
      <ScrollView>
        <NameContainer>
          <Name>Basic</Name>
        </NameContainer>
        <KanaTable type="base" kana={activeTab} onClick={setModalVisible} />
        <NameContainer>
          <Name>Dakuon</Name>
        </NameContainer>
        <KanaTable type="dakuon" kana={activeTab} onClick={setModalVisible} />
        <NameContainer>
          <Name>Handakuon</Name>
        </NameContainer>
        <KanaTable type="handakuon" kana={activeTab} onClick={setModalVisible} />
        <NameContainer>
          <Name>Yoon</Name>
        </NameContainer>
        <KanaTable type="yoon" kana={activeTab} onClick={setModalVisible} />
        <View style={{ marginBottom: 120 }}></View>
      </ScrollView>
      {isModalVisible !== null && typeof isModalVisible[0] !== "number" && (
        <KanaModal
          show={isModalVisible === null ? false : true}
          kana={activeTab}
          changeKata={(kata) => setActiveTab(kata)}
          letter={isModalVisible[0]}
          closeModal={() => closeModal()}
          drawSymbol={() => {}}
          prevLetter={() => prev()}
          nextLetter={() => next()}
        />
      )}
    </Container>
  );
};

export default Kana;