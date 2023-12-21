import React, { useState } from "react";

import { Modal, View } from "react-native";
import styled from "styled-components/native";

import KanaTable from "@/components/KanaTable";
import Switch from "@/components/Switch";
import { useAppDispatch } from "@/hooks/redux";
import { resetKanaSelected } from "@/store/features/kana/slice";

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
  padding-top: 5px;
  background-color: ${({ theme }) => theme.colors.color1};
  border-color: ${({ theme }) => theme.colors.color2};
  border-top-width: 1px;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
`;

interface ChooseAlphabetModalProps {
  closeModal: () => void
  show: boolean
}

const ChooseAlphabetModal: React.FC<ChooseAlphabetModalProps> = ({closeModal, show}) => {
  const dispatch = useAppDispatch();

  const [activeTab, setActiveTab] = useState<"hiragana" | "katakana">("hiragana");

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
            <HeaderLink type="gray">Close</HeaderLink>
          </HeaderPress>
          <HeaderTitle>Hiragana</HeaderTitle>
          <HeaderPress onPress={() => dispatch(resetKanaSelected())}>
            <HeaderLink type="orange">Reset</HeaderLink>
          </HeaderPress>
        </ModalHeader>
        <Content>
          <NameContainer>
            <Name>Basic</Name>
          </NameContainer>
          <KanaTable isEditMode={true} type="base" kana={activeTab} />
          <NameContainer>
            <Name>Dakuon</Name>
          </NameContainer>
          <KanaTable isEditMode={true} type="dakuon" kana={activeTab} />
          <NameContainer>
            <Name>Handakuon</Name>
          </NameContainer>
          <KanaTable isEditMode={true} type="handakuon" kana={activeTab} />
          <NameContainer>
            <Name>Yoon</Name>
          </NameContainer>
          <KanaTable isEditMode={true} type="yoon" kana={activeTab} />
          <View style={{ marginBottom: 120 }}></View>
        </Content>
      </Container>
      <Control>
        <Switch
          activeTab={activeTab}
          setActiveTab={(val) => setActiveTab(val as "hiragana" | "katakana")}
          options={["hiragana", "katakana"]}
          width="100%"
        />
      </Control>
    </Modal>
  );
};

export default ChooseAlphabetModal;