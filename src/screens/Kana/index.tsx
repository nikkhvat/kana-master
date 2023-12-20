import React, { useMemo, useState } from "react";

import { StackNavigationProp } from "@react-navigation/stack";
import { Audio } from "expo-av";
import {
  View,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";

import letters, { ILetter, lettersDakuon, lettersHandakuon, lettersYoon } from "../../data/letters";

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
  const [activeTab, setActiveTab] = useState<"Hiragana" | "Katakana">("Hiragana");

  const rows = useMemo(
    () =>
      letters.map((item) =>
        item[0].en !== "WA" && item[0].en !== "YA" && item[0].en !== "N"
          ? item
          : item[0].en === "WA"
            ? [item[0], 0, 0, 0, item[1]]
            : item[0].en === "N"
              ? [0, 0, item[0], 0, 0]
              : [item[0], 0, item[1], 0, item[2]]
      ),
    []
  );
  const rowsDokuon = useMemo(() => lettersDakuon.map((item) => item), []);
  const rowsHandakuon = useMemo(() => lettersHandakuon.map((item) => item), []);
  const rowsYoon = useMemo(() => lettersYoon.map((item) => item), []);

  const [isModalVisible, setModalVisible] = useState(null as null | [(ILetter | number), number, number, string]);

  const closeModal = () => setModalVisible(null);  

  const list = ["basic", "dokuon", "handakuon", "yoon"];
  const listLetters = [rows, rowsDokuon, rowsHandakuon, rowsYoon];

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
      {/* <Content>
        <Tabs>
          <Tab
            active={activeTab === "Hiragana"}
            onPress={() => setActiveTab("Hiragana")}
          >
            <TabText>Hiragana</TabText>
          </Tab>
          <Tab
            active={activeTab === "Katakana"}
            onPress={() => setActiveTab("Katakana")}
          >
            <TabText>Katakana</TabText>
          </Tab>
        </Tabs>
      </Content> */}
      <Switch
        activeTab={activeTab}
        setActiveTab={(val) => setActiveTab(val as "Hiragana" | "Katakana")}
        options={["Hiragana", "Katakana"]}
      />
      <ScrollView>
        <NameContainer>
          <Name>Basic</Name>
        </NameContainer>
        <KanaTable
          type="basic"
          data={rows}
          kana={activeTab}
          onClick={setModalVisible}
        />
        <NameContainer>
          <Name>Dakuon</Name>
        </NameContainer>
        <KanaTable
          type="dokuon"
          data={rowsDokuon}
          kana={activeTab}
          onClick={setModalVisible}
        />
        <NameContainer>
          <Name>Handakuon</Name>
        </NameContainer>
        <KanaTable
          type="handakuon"
          data={rowsHandakuon}
          kana={activeTab}
          onClick={setModalVisible}
        />
        <NameContainer>
          <Name>Yoon</Name>
        </NameContainer>
        <KanaTable
          type="yoon"
          data={rowsYoon}
          kana={activeTab}
          onClick={setModalVisible}
        />
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