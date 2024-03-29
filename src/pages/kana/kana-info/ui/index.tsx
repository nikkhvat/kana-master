import React, { useMemo, useState } from "react";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import SoundLetter from "@/entities/kana/sound-letter/sound-letter";
import Symbol from "@/entities/kana/symbol/symbol";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { KanaAlphabet } from "@/shared/constants/kana";
import { ILetter, LettersKeys, baseFlatLettersId, dakuonFlatLettersId, handakuonFlatLettersId, lettersTableById, yoonFlatLettersId } from "@/shared/data/lettersTable";
import { RootStackParamList } from "@/shared/types/navigationTypes";
import Button from "@/shared/ui/button/button";
import DrawKana from "@/widgets/kana/draw-kana/ui/draw-kana";

interface KanaInfoProps {
  route: RouteProp<RootStackParamList, "KanaInfo">;
  navigation: StackNavigationProp<RootStackParamList, "KanaInfo">;
}

const screenHeight = Dimensions.get("window").height;

const KanaInfo = ({ route, navigation }: KanaInfoProps) => {
  const { t } = useTranslation();

  const insets = useSafeAreaInsets();

  const { id: LetterIdFromParams, kana: kanaFromParams } = route.params;

  const flatLetters = useMemo(() => [
    ...baseFlatLettersId,
    ...dakuonFlatLettersId,
    ...handakuonFlatLettersId,
    ...yoonFlatLettersId,
  ], []);

  const [letterId, setLetterId] = useState(LetterIdFromParams);
  const [letterKana, setLetterKana] = useState(kanaFromParams);

  const [isDrawSymbol, setIsDrawSymbol] = useState(false);

  const prevLetter = () => {
    const active = lettersTableById[letterId as LettersKeys];
    const activeIndex = flatLetters.findIndex((element) => element === active.id);
    if (activeIndex === 0) return;

    setLetterId(flatLetters[activeIndex - 1]);
  };

  const nextLetter = () => {
    const active = lettersTableById[letterId as LettersKeys];
    const activeIndex = flatLetters.findIndex((element) => element === active.id);
    if (flatLetters.length === activeIndex + 1) return;

    setLetterId(flatLetters[activeIndex + 1]);
  };

  const letter = lettersTableById[letterId as LettersKeys];

  const { colors } = useThemeContext();

  const { i18n: { language } } = useTranslation();

  const lang = language === "ru" ? "ru" : "en";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getTypeById = (id: any) => {
    if (yoonFlatLettersId.includes(id)) return t("kana.yoon");
    if (handakuonFlatLettersId.includes(id)) return t("kana.handakuon");
    if (dakuonFlatLettersId.includes(id)) return t("kana.dakuon");

    return t("kana.basic");
  };

  const drawSymbol = () => {
    setIsDrawSymbol(true);
  };

  return (
    <>
      {isDrawSymbol === false ?
        <View style={[styles.container, { backgroundColor: colors.color1 }]}>
          <Pressable style={styles.close} onPress={navigation.goBack} >
            <Icon name={"close"} size={24} color={colors.color4} />
          </Pressable>
          {letter !== null && <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: colors.color4 }]}>
              {letterKana === KanaAlphabet.Katakana ? t("kana.katakana") : t("kana.hiragana")}{" "}
              ({getTypeById(letter.id)})
            </Text>
            <Text style={[styles.subTitle, { color: colors.color4 }]}>
              {letter?.[lang].toUpperCase()}
            </Text>
            <Symbol id={letter.id} kana={letterKana} />
          </View>}

          {letter !== null && <View style={styles.buttonContainer}>
            <View style={styles.buttons}>
              <SoundLetter id={letter.en} />
              <Button
                customStyles={{ flex: 1, marginTop: 0 }}
                title={"Draw"}
                onClick={drawSymbol}
                type={"inactive"}
                image={"gesture-tap-hold"}
              />
            </View>
            <View style={styles.buttons}>
              {screenHeight < 700 && 
                <Button
                  customStyles={{ width: 50, marginTop: 0 }}
                  title={"Sound"}
                  type={"inactive"}
                  image={"chevron-left"}
                  onClick={() => prevLetter()}
                />}
              <Button
                customStyles={{ flex: 1, marginTop: 0 }}
                title={`${letterKana === KanaAlphabet.Hiragana ? t("kana.katakana") : t("kana.hiragana") } →`}
                onClick={() => {
                  setLetterKana(letterKana === KanaAlphabet.Hiragana ? KanaAlphabet.Katakana : KanaAlphabet.Hiragana);
                }}
                type={"inactive"}
              />
              {screenHeight < 700 &&
                <Button
                  customStyles={{ width: 50, marginTop: 0 }}
                  title={"Draw"}
                  type={"inactive"}
                  image={"chevron-right"}
                  onClick={() => nextLetter()}
                />}
            </View>
          </View>}

          {screenHeight > 700 && <View style={[styles.buttons, { paddingBottom: insets.bottom }]}>
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
          </View>}
        </View>
        : 
        <DrawKana 
          letter={letter as ILetter} 
          kana={letterKana} 
          back={() => {
            setIsDrawSymbol(false);
          }} />
        }
    </>
  );
};

export default KanaInfo;


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
  close: {
    marginTop: 5,
    marginLeft: 10,
    position: "absolute",
    padding: 10,
    zIndex: 9,
  }
});