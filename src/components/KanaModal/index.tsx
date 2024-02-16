import React from "react";

import { Audio } from "expo-av";
import { Dimensions, Modal } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "styled-components";
import styled from "styled-components/native";

import Button from "@/components/Button";
import { Colors } from "@/constants/app";
import getSound from "@/resources/sounds/index";
import getImage from "@/resources/svgs";
import { darkTheme } from "@/themes/dark";

const Container = styled.View`
  flex: 1;
  padding-top: 15px;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.colors.color1};
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
`;

const TitleContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 30px;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.colors.color4};
  font-size: 17px;
  font-weight: 700;
`;

const SubTitle = styled.Text`
  color: ${({ theme }) => theme.colors.color4};
  font-size: 34px;
  font-weight: 700;
  margin-top: 15px;
`;

const ButtonContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0;
`;

const Buttons = styled.View`
  flex: 1;
  padding-left: 20px;
  padding-right: 20px;
  flex-direction: row;
  justify-content: space-between;
  gap: 15px;
  margin-top: 15px;
`;

interface KanaModalProp {
  show: boolean;
  kana: "hiragana" | "katakana";
  letter: {
    id: string;
    ka: string;
    hi: string;
    en: string;
    ru: string;
  } | null;
  changeKata: (val: "hiragana" | "katakana") => void;
  closeModal: () => void;
  drawSymbol: (enKey: string) => void;
  prevLetter: () => void;
  nextLetter: () => void;
}

const KanaModal: React.FC<KanaModalProp> = ({
  show,
  kana,
  changeKata,
  closeModal,
  drawSymbol,
  letter,
  prevLetter,
  nextLetter,
}) => {
  Audio.setAudioModeAsync({ playsInSilentModeIOS: true });

  const getImagePath = (key: string | undefined, theme: "DARK" | "LIGHT") => {
    const screenWidth = Dimensions.get("window").width;

    if (theme === "DARK") {
      key = key?.trim() + "-DARK";
    }

    return getImage(key?.toUpperCase(), {
      width: screenWidth - 24,
      height: screenWidth - 24,
    });
  };

  const colors = useTheme().colors as Colors;

  const THEME = colors?.color1 === darkTheme?.color1 ? "DARK" : "LIGHT";

  const playSound = async (enKey: string) => {
    try {
      const sound = getSound(enKey);

      const { sound: playbackObject } = await Audio.Sound.createAsync(sound, {
        shouldPlay: true,
      });

      playbackObject.playAsync();
    } catch (error) {
      console.log(error);
    }
  };

  if (letter === null) return (
    <Modal
      visible={show}
      presentationStyle="pageSheet"
      animationType="slide"
      onRequestClose={() => closeModal()}
      onDismiss={() => closeModal()}
    >
      Letter is null :(
    </Modal>
  );

  return (
    <Modal
      visible={show}
      presentationStyle="pageSheet"
      animationType="slide"
      onRequestClose={() => closeModal()}
      onDismiss={() => closeModal()}
    >
      <Container>
        <Header>
          <Icon
            onPress={() => closeModal()}
            name={"close"}
            size={29}
            color={colors.color4}
          />
        </Header>
        <TitleContainer>
          <Title>{kana}</Title>
          <SubTitle>{letter.en.toUpperCase()}</SubTitle>
          {getImagePath(`${kana === "hiragana" ? "H" : "K"}-${letter.en}`, THEME)}
        </TitleContainer>

        <ButtonContainer>
          <Buttons>
            <Button
              customStyles={{ flex: 1, marginTop: 0 }}
              title={"Sound"}
              onClick={() => playSound(letter.en)}
              type={"inactive"}
              image={"volume-high"}
            />
            <Button
              customStyles={{ flex: 1, marginTop: 0 }}
              title={"Draw"}
              onClick={() => {
                drawSymbol(letter.en);
              }}
              type={"inactive"}
              image={"gesture-tap-hold"}
            />
          </Buttons>
          <Buttons>
            <Button
              customStyles={{ flex: 1, marginTop: 0 }}
              title={`${kana === "hiragana" ? "katakana" : "hiragana"} →`}
              onClick={() => {
                changeKata(kana === "hiragana" ? "katakana" : "hiragana");
              }}
              type={"inactive"}
            />
          </Buttons>
        </ButtonContainer>

        <Buttons>
          <Button
            customStyles={{ width: 50 }}
            title={"Sound"}
            type={"inactive"}
            image={"chevron-left"}
            onClick={() => prevLetter()}
          />
          <Button
            customStyles={{ width: 50 }}
            title={"Draw"}
            type={"inactive"}
            image={"chevron-right"}
            onClick={() => nextLetter()}
          />
        </Buttons>
      </Container>
    </Modal>
  );
};

export default KanaModal;