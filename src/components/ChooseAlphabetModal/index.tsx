import React, { useMemo, useState } from "react";

import { Modal, View } from "react-native";
import styled from "styled-components/native";

import Button from "@/components/Button";
import KanaTable from "@/components/KanaTable";
import Switch from "@/components/Switch";
import { KanaSection } from "@/constants/kana";
import letters, {
  lettersDakuon,
  lettersHandakuon,
  lettersYoon,
} from "@/data/letters";
import { useAppSelector } from "@/hooks/redux";
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

const reset = () => {};

const ChooseAlphabetModal: React.FC<ChooseAlphabetModalProps> = ({closeModal, show}) => {

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

  const selected = useAppSelector((state: RootState) => state.kana.kanaSections);

  const IS_BASIC_HIRA = selected.includes(KanaSection.BasicHiragana) && activeTab === "Hiragana";
  const IS_BASIC_KATA = selected.includes(KanaSection.BasicKatakana) && activeTab === "Katakana";
  const IS_DAKUON_KATA = selected.includes(KanaSection.DakuonKatakana) && activeTab === "Katakana";
  const IS_DAKUON_HIRA = selected.includes(KanaSection.DakuonHiragana) && activeTab === "Hiragana";
  const IS_HANDAKUON_KATA = selected.includes(KanaSection.HandakuonKatakana) && activeTab === "Katakana";
  const IS_HANDAKUON_HIRA = selected.includes(KanaSection.HandakuonHiragana) && activeTab === "Hiragana";
  const IS_YOON_KATA = selected.includes(KanaSection.YoonKatakana) && activeTab === "Katakana";
  const IS_YOON_HIRA = selected.includes(KanaSection.YoonHiragana) && activeTab === "Hiragana";
  
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
          <KanaTable fullSelected={IS_BASIC_HIRA || IS_BASIC_KATA} isEditMode={true} type="basic" data={rows} kana={activeTab} onClick={() => {}} />
          <NameContainer>
            <Name>Dakuon</Name>
          </NameContainer>
          <KanaTable fullSelected={IS_DAKUON_KATA || IS_DAKUON_HIRA} isEditMode={true} type="dokuon" data={rowsDokuon} kana={activeTab} onClick={() => {}} />
          <NameContainer>
            <Name>Handakuon</Name>
          </NameContainer>
          <KanaTable fullSelected={IS_HANDAKUON_KATA || IS_HANDAKUON_HIRA} isEditMode={true} type="handakuon" data={rowsHandakuon} kana={activeTab} onClick={() => {}} />
          <NameContainer>
            <Name>Yoon</Name>
          </NameContainer>
          <KanaTable fullSelected={IS_YOON_KATA || IS_YOON_HIRA} isEditMode={true} type="yoon" data={rowsYoon} kana={activeTab} onClick={() => {}} />
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
          customStyles={{marginTop: 9, width: 110, height: 46}} 
          title={"Confirm"} 
          type={"general"} />
      </Control>
    </Modal>
  );
};

export default ChooseAlphabetModal;