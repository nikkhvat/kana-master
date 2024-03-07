import React from "react";

import { Audio } from "expo-av";
import { useTranslation } from "react-i18next";
import { Dimensions, Modal, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { useThemeContext } from "@/hooks/theme-context";
import { Alphabet } from "@/shared/constants/kana";
import { dakuonFlatLettersId, handakuonFlatLettersId, yoonFlatLettersId } from "@/shared/data/lettersTable";
import getSound from "@/shared/resources/sounds/index";
import getImage from "@/shared/resources/svgs";
import Button from "@/shared/ui/button/button";

interface EducationShowKanaModalProps {
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
  type: Alphabet;
}

const EducationShowKanaModal: React.FC<EducationShowKanaModalProps> = ({
  show,
  kana,
  changeKata,
  closeModal,
  drawSymbol,
  letter,
  prevLetter,
  nextLetter,
  type
}) => {
  Audio.setAudioModeAsync({ playsInSilentModeIOS: true });

  const getImagePath = (key: string | undefined, theme: "DARK" | "LIGHT") => {
    const screenWidth = Dimensions.get("window").width;
    const key_formated = `${kana === "katakana" ? "katakana" : "hirigana"}_${theme === "DARK" ? "dark" : "light"}_${key?.replaceAll("-", "_")}`;

    return getImage(key_formated, {
      width: screenWidth - 24,
      height: screenWidth - 24,
    });
  };

  const { colors } = useThemeContext();

  const { i18n: { language } } = useTranslation();

  const lang = language === "ru" ? "ru" : "en";

  const THEME = colors._theme === "dark" ? "DARK" : "LIGHT";

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getTypeById = (id: any) => {
    if (yoonFlatLettersId.includes(id)) return "yoon";
    if (handakuonFlatLettersId.includes(id)) return "handakuon";
    if (dakuonFlatLettersId.includes(id)) return "dakuon";

    return "basic";
  };

  return (
    <Modal
      visible={show}
      presentationStyle="pageSheet"
      animationType="slide"
      onRequestClose={() => closeModal()}
      onDismiss={() => closeModal()}
    >
      <View style={[styles.container, { backgroundColor: colors.color1 }]}>
        <View style={styles.header}>
          <Icon
            onPress={() => closeModal()}
            name={"close"}
            size={29}
            color={colors.color4}
          />
        </View>
        {letter !== null && <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: colors.color4 }]}>{kana} ({getTypeById(letter.id)})</Text>
          <Text style={[styles.subTitle, { color: colors.color4 }]}>{letter?.[lang].toUpperCase()}</Text>
          {getImagePath(type === "yoon" ? letter.id : `${kana === "hiragana" ? "H" : "K"}-${letter.en}`, THEME)}
        </View>}

        {letter !== null && <View style={styles.buttonContainer}>
          <View style={styles.buttons}>
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
          </View>
          <View style={styles.buttons}>
            <Button
              customStyles={{ flex: 1, marginTop: 0 }}
              title={`${kana === "hiragana" ? "katakana" : "hiragana"} →`}
              onClick={() => {
                changeKata(kana === "hiragana" ? "katakana" : "hiragana");
              }}
              type={"inactive"}
            />
          </View>
        </View>}

        <View style={styles.buttons}>
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
        </View>
      </View>
    </Modal>
  );
};

export default EducationShowKanaModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    justifyContent: "flex-start",
    paddingBottom: 30
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  titleContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 30,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    textTransform: "capitalize"
  },
  subTitle: {
    fontSize: 34,
    fontWeight: "700",
    marginTop: 15,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 15,
    gap: 15
  },
});