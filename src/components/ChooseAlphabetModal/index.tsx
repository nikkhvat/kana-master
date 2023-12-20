import React, { useMemo, useState } from "react";

import { Modal, View } from "react-native";
import styled from "styled-components/native";

import Button from "@/components/Button";
import KanaTable from "@/components/KanaTable";
import Switch from "@/components/Switch";
import { KanaSection, LETTERS_COUNT } from "@/constants/kana";
import letters, {
  ILetter,
  lettersDakuon,
  lettersHandakuon,
  lettersYoon,
} from "@/data/letters";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { resetKanaSelected, toggleLetter, toggleSome } from "@/store/features/kana/slice";
import { RootState } from "@/store/store";

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.color1};
`;

const ModalHeader = styled.View`
  height: 52px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  border-color: ${({ theme }) => theme.colors.color2};
  border-bottom-width: 1px;
`;

const HeaderPress = styled.Pressable`
  padding: 14px;
  margin: -14px;
`; 

const HeaderTitle = styled.Text`
  color: ${({ theme }) => theme.colors.color4};
  font-size: 17px;
  font-weight: 700;
`;

type HeaderLink = {
  type: "gray" | "orange"
}

const HeaderLink = styled.Text<HeaderLink>`
  color: ${({ theme, type }) =>
    type === "gray" ? theme.colors.color3 : theme.colors.second_color3};
  font-size: 17px;
  font-weight: 400;
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

const Content = styled.ScrollView`
  
`;

const Control = styled.View`
  position: absolute;
  bottom: 0;
  height: 100px;
  width: 100%;
  flex-direction: row;
  align-items: flex-start;
  padding-top: 5px;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.color1};
  border-color: ${({ theme }) => theme.colors.color2};
  border-top-width: 1px;
  padding-right: 20px;
`;

interface ChooseAlphabetModalProps {
  closeModal: () => void
  show: boolean
}

const ChooseAlphabetModal: React.FC<ChooseAlphabetModalProps> = ({closeModal, show}) => {
  const dispatch = useAppDispatch();

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

  const selected = useAppSelector((state: RootState) => state.kana.selected);

  const IS_BASIC_HIRA = selected.base.hiragana.length === LETTERS_COUNT[KanaSection.BasicHiragana] && activeTab === "Hiragana";
  const IS_BASIC_KATA = selected.base.katakana.length === LETTERS_COUNT[KanaSection.BasicKatakana] && activeTab === "Katakana";
  const IS_DAKUON_HIRA = selected.dakuon.hiragana.length === LETTERS_COUNT[KanaSection.DakuonHiragana] && activeTab === "Hiragana";
  const IS_DAKUON_KATA = selected.dakuon.katakana.length === LETTERS_COUNT[KanaSection.DakuonKatakana] && activeTab === "Katakana";
  const IS_HANDAKUON_KATA = selected.handakuon.katakana.length === LETTERS_COUNT[KanaSection.HandakuonKatakana] && activeTab === "Katakana";
  const IS_HANDAKUON_HIRA = selected.handakuon.hiragana.length === LETTERS_COUNT[KanaSection.HandakuonHiragana] && activeTab === "Hiragana";
  const IS_YOON_HIRA = selected.yoon.hiragana.length === LETTERS_COUNT[KanaSection.YoonHiragana] && activeTab === "Hiragana";
  const IS_YOON_KATA = selected.yoon.katakana.length === LETTERS_COUNT[KanaSection.YoonKatakana] && activeTab === "Katakana";
  
  const reset = () => dispatch(resetKanaSelected());

  const onToggleLetter = (
    letter: ILetter,
    alphabet: "base" | "dakuon" | "handakuon" | "yoon"
  ) => {
    dispatch(toggleLetter({ letter: letter, alphabet, kana: activeTab === "Hiragana" ? "hiragana" : "katakana" }));
  };

  const onPlus = (
    type: "row" | "cell",
    index: number,
    alphabet: "basic" | "dakuon" | "handakuon" | "yoon"
  ) => {
    const data =
      alphabet === "basic"
        ? rows
        : alphabet === "dakuon"
          ? rowsDokuon
          : alphabet === "handakuon"
            ? rowsHandakuon
            : rowsYoon;

    if (type === "row") {
      const letters: ILetter[] = [];

      for (let i = 0; i < data[index].length; i++) {
        const element = data[index][i];

        if (typeof element !== "number") {
          letters.push(element);
        }
      }

      onToggleSome(letters, alphabet === "basic" ? "base" : alphabet);
    } else {
      const letters: ILetter[] = [];

      for (let i = 0; i < data.length; i++) {
        const columns = data[i];

        const elem = columns?.[index];
        if (typeof elem === "object") {
          letters.push(elem);
        }
      }

      onToggleSome(letters, alphabet === "basic" ? "base" : alphabet);
    }
  };

  const onToggleSome = (
    letters: ILetter[],
    alphabet: "base" | "dakuon" | "handakuon" | "yoon"
  ) => {
    dispatch(
      toggleSome({
        letter: letters,
        alphabet,
        kana: activeTab === "Hiragana" ? "hiragana" : "katakana",
      })
    );
  };

  const selectedLetters = useAppSelector((state: RootState) => state.kana.selected);

  return (
    <Modal
      visible={show}
      presentationStyle="pageSheet"
      animationType="slide"
      onRequestClose={closeModal}
    >
      <Container>
        <ModalHeader>
          <HeaderPress onPress={closeModal}>
            <HeaderLink type="gray">Cancel</HeaderLink>
          </HeaderPress>
          <HeaderTitle>Hiragana</HeaderTitle>
          <HeaderPress onPress={reset}>
            <HeaderLink type="orange">Reset</HeaderLink>
          </HeaderPress>
        </ModalHeader>
        <Content>
          <NameContainer>
            <Name>Basic</Name>
          </NameContainer>
          <KanaTable
            isEditMode={true}
            onPlus={onPlus}
            type="basic"
            data={rows}
            kana={activeTab}
            onClick={(val) => onToggleLetter(val[0], "base")}
            selectedLetters={selectedLetters["base"]}
          />
          <NameContainer>
            <Name>Dakuon</Name>
          </NameContainer>
          <KanaTable
            isEditMode={true}
            onPlus={onPlus}
            type="dakuon"
            data={rowsDokuon}
            kana={activeTab}
            onClick={(val) => onToggleLetter(val[0], "dakuon")}
            selectedLetters={selectedLetters["dakuon"]}
          />
          <NameContainer>
            <Name>Handakuon</Name>
          </NameContainer>
          <KanaTable
            isEditMode={true}
            onPlus={onPlus}
            type="handakuon"
            data={rowsHandakuon}
            kana={activeTab}
            onClick={(val) => onToggleLetter(val[0], "handakuon")}
            selectedLetters={selectedLetters["handakuon"]}
          />
          <NameContainer>
            <Name>Yoon</Name>
          </NameContainer>
          <KanaTable
            isEditMode={true}
            onPlus={onPlus}
            type="yoon"
            data={rowsYoon}
            kana={activeTab}
            onClick={(val) => onToggleLetter(val[0], "yoon")}
            selectedLetters={selectedLetters["yoon"]}
          />
          <View style={{ marginBottom: 120 }}></View>
        </Content>
      </Container>
      <Control>
        <Switch
          activeTab={activeTab}
          setActiveTab={(val) => setActiveTab(val as "Hiragana" | "Katakana")}
          options={["Hiragana", "Katakana"]}
          width="70%"
        />
        <Button
          customStyles={{ marginTop: 9, width: 110, height: 46 }}
          title={"Confirm"}
          type={"general"}
        />
      </Control>
    </Modal>
  );
};

export default ChooseAlphabetModal;