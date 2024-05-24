import React, { useEffect, useMemo, useState } from "react";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { Dimensions, Pressable, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { StatisticLevel } from "../../kana-list/model/types";

import AdaptiveLayout from "@/app/layouts/adaptiveLayout";
import SoundLetter from "@/entities/kana/sound-letter/sound-letter";
import Symbol from "@/entities/kana/symbol/symbol";
import SymbolHeader from "@/entities/kana/symbol-header/symbol-header";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { KanaAlphabet } from "@/shared/constants/kana";
import {
  ILetter,
  LettersKeys,
  baseFlatLettersId,
  dakuonFlatLettersId,
  handakuonFlatLettersId,
  lettersTableById,
  yoonFlatLettersId,
} from "@/shared/data/lettersTable";
import { useAppSelector } from "@/shared/model/hooks";
import { RootStackParamList } from "@/shared/types/navigationTypes";
import Button from "@/shared/ui/button/button";
import DrawKana from "@/widgets/kana/draw-kana/ui/draw-kana";
import IconButton from "@/shared/ui/icon-button";

interface KanaInfoProps {
  route: RouteProp<RootStackParamList, "KanaInfo">;
  navigation: StackNavigationProp<RootStackParamList, "KanaInfo">;
}

const screenHeight = Dimensions.get("window").height;

const KanaInfo = ({ route, navigation }: KanaInfoProps) => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const { colors } = useThemeContext();

  const { id: LetterIdFromParams, kana: kanaFromParams } = route.params;

  const flatLetters = useMemo(
    () => [
      ...baseFlatLettersId,
      ...dakuonFlatLettersId,
      ...handakuonFlatLettersId,
      ...yoonFlatLettersId,
    ],
    [],
  );

  const [letterId, setLetterId] = useState(LetterIdFromParams);
  const [letterKana, setLetterKana] = useState(kanaFromParams);

  const level = useAppSelector(
    (state) => state.statistics.statistics[kanaFromParams][letterId],
  );

  const isEnabledStats = useAppSelector((state) => state.statistics.isEnabled);
  const indicatorColor =
    level === undefined
      ? null
      : level?.level === StatisticLevel.Green
        ? colors.second_color2
        : level?.level === StatisticLevel.Yellow
          ? colors.second_color5
          : colors.second_color1;

  const [isDrawSymbol, setIsDrawSymbol] = useState(false);

  const prevLetter = () => {
    const active = lettersTableById[letterId as LettersKeys];
    const activeIndex = flatLetters.findIndex(
      (element) => element === active.id,
    );
    if (activeIndex === 0) return;

    setLetterId(flatLetters[activeIndex - 1]);
  };

  const nextLetter = () => {
    const active = lettersTableById[letterId as LettersKeys];
    const activeIndex = flatLetters.findIndex(
      (element) => element === active.id,
    );
    if (flatLetters.length === activeIndex + 1) return;

    setLetterId(flatLetters[activeIndex + 1]);
  };

  const letter = lettersTableById[letterId as LettersKeys];

  const drawSymbol = () => {
    setIsDrawSymbol(true);
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      headerLeft: () => (
        <IconButton
          onPress={() => {
            if (isDrawSymbol) {
              setIsDrawSymbol(false);
            } else {
              navigation.goBack();
            }
          }}
        >
          <Icon
            name={isDrawSymbol ? "keyboard-backspace" : "close"}
            size={24}
            color={colors.color4}
          />
        </IconButton>
      ),
      title:
        letterKana === KanaAlphabet.Hiragana
          ? t("kana.hiragana")
          : t("kana.katakana"),
      headerShadowVisible: false,
    });
  }, [navigation, isDrawSymbol, letterKana]);

  return (
    <AdaptiveLayout style={{ flex: 1 }}>
      {isDrawSymbol === false ? (
        <View style={[styles.container, { backgroundColor: colors.color1 }]}>
          {letter !== null && (
            <View style={styles.symbolContainer}>
              <SymbolHeader
                indicatorColor={isEnabledStats ? indicatorColor : null}
                hideTitle
                kana={letterKana}
                letter={letter as ILetter}
              />
              <View style={{ marginTop: 30 }}>
                <Symbol id={letter.id} kana={letterKana} />
              </View>
            </View>
          )}

          {letter !== null && (
            <View style={styles.buttonContainer}>
              <View style={styles.buttons}>
                <SoundLetter
                  customStyles={{ flex: 1, marginTop: 0 }}
                  id={letter.id}
                />
                <Button
                  customStyles={{ flex: 1, marginTop: 0 }}
                  title={"Draw"}
                  onClick={drawSymbol}
                  type={"inactive"}
                  image={"gesture-tap-hold"}
                />
              </View>
              <View style={styles.buttons}>
                {screenHeight < 700 && (
                  <Button
                    customStyles={{ flex: 1, width: 50, marginTop: 0 }}
                    type={"inactive"}
                    image={"chevron-left"}
                    onClick={() => prevLetter()}
                  />
                )}
                <Button
                  customStyles={{ flex: 1, marginTop: 0 }}
                  title={`${letterKana === KanaAlphabet.Hiragana ? t("kana.katakana") : t("kana.hiragana")} →`}
                  onClick={() => {
                    setLetterKana(
                      letterKana === KanaAlphabet.Hiragana
                        ? KanaAlphabet.Katakana
                        : KanaAlphabet.Hiragana,
                    );
                  }}
                  type={"inactive"}
                />
                {screenHeight < 700 && (
                  <Button
                    customStyles={{ width: 50, marginTop: 0 }}
                    title={"Draw"}
                    type={"inactive"}
                    image={"chevron-right"}
                    onClick={() => nextLetter()}
                  />
                )}
              </View>
            </View>
          )}

          {screenHeight > 700 && (
            <View style={[styles.buttons, { paddingBottom: insets.bottom }]}>
              <Button
                customStyles={{ width: 50 }}
                type={"inactive"}
                image={"chevron-left"}
                onClick={() => prevLetter()}
              />
              <Button
                customStyles={{ width: 50 }}
                type={"inactive"}
                image={"chevron-right"}
                onClick={() => nextLetter()}
              />
            </View>
          )}
        </View>
      ) : (
        <DrawKana letter={letter as ILetter} kana={letterKana} />
      )}
    </AdaptiveLayout>
  );
};

export default KanaInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  symbolContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
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
    gap: 15,
  },
  close: {
    marginTop: 10,
    marginLeft: 10,
    position: "absolute",
    padding: 10,
    zIndex: 9,
  },
});
