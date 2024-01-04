/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { Dimensions, ScrollView, View } from "react-native";

import Button from "@/components/Button";
import CardModeView, { CardModeViewProp } from "@/components/CardModeView";
import PreviewCard from "@/components/PreviewCard";
import { CardMode, PracticeScreenMode, TestMode } from "@/constants/kana";
import { useAppSelector } from "@/hooks/redux";
import { RootState } from "@/store/store";
import { RootStackParamList } from "@/types/navigationTypes";


type WordBuildingNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface WordBuildingProps {
  navigation: WordBuildingNavigationProp;
}

const screenWidth = Dimensions.get("window").width;

const WordBuilding: React.FC<WordBuildingProps> = ({ navigation }) => {
  const { t } = useTranslation();
  
  const letters = useAppSelector((state: RootState) => state.kana.selected);

  const [cardModeState, setCardModeState] = useState<CardModeViewProp["buttons"]>([[], []]);
  const [modeState, setModeState] = useState<CardModeViewProp["buttons"]>([]);

  useEffect(() => {
    const isHira =
      letters.base.hiragana.length > 0 ||
      letters.dakuon.hiragana.length > 0 ||
      letters.handakuon.hiragana.length > 0 ||
      letters.yoon.hiragana.length > 0;

    const isKata =
      letters.base.katakana.length > 0 ||
      letters.dakuon.katakana.length > 0 ||
      letters.handakuon.katakana.length > 0 ||
      letters.yoon.katakana.length > 0;

    setCardModeState(() => [
      [
        { title: "Hira → Romaji", key: CardMode.hiraganaToRomaji, type: isHira ? "active" : "inactive", condition: isHira },
        { title: "Romaji → Hira", key: CardMode.romajiToHiragana, type: "inactive", condition: isHira },
      ],
      [
        { title: "Kata → Romaji", key: CardMode.katakanaToRomaji, type: isKata ? "active" : "inactive", condition: isKata },
        { title: "Romaji → Kata", key: CardMode.romajiToKatakana, type: "inactive", condition: isKata },
      ],
    ]);

    setModeState([
      [
        { title: t("wordGame.choice"), key: TestMode.Choice, type: "active", condition: true },
        { title: t("wordGame.wordBuilding"), key: TestMode.WordBuilding, type: "active", condition: true },
      ],
      [{ title: t("wordGame.findThePair"), key: TestMode.FindPair, type: "active", condition: true }],
    ]);
  }, [letters]);

  const toggleButtonState = (
    btnArray: typeof cardModeState,
    setBtnArray: (
      data: {
        title: string;
        type: "active" | "inactive" | "weak" | "general";
        key: string;
      }[][]
    ) => void,
    indexGroup: number,
    indexButton: number,
    active: "active" | "inactive" | "weak" | "general",
    mode: "has_one" | "no_one"
  ) => {
    const newBtnArray = [...btnArray];
    const currentType = newBtnArray[indexGroup][indexButton].type;

    const isActivePresentInOthers = newBtnArray.some((group, gIndex) =>
      group.some(
        (btn, bIndex) =>
          btn.type === active &&
          (gIndex !== indexGroup || bIndex !== indexButton)
      )
    );

    if (
      mode === "has_one" &&
      currentType === active &&
      !isActivePresentInOthers
    ) {
      return;
    }

    newBtnArray[indexGroup][indexButton].type =
      currentType === active ? "inactive" : active;

    setBtnArray(newBtnArray);
  };

  
  const getActiveFromArray = (
    objects: any,
    active: string
  ) => {
    const array = [];

    for (let i = 0; i < objects.length; i++) {
      const object = objects[i];

      for (let j = 0; j < object.length; j++) {
        const element = object[j];

        if (element.type === active) {
          array.push(element.key);
        }
      }
    }

    return array;
  };

  return (
    <View style={{ width: screenWidth }} >
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <PreviewCard
          imageSource={"wordgame"}
          onEdit={() =>
            navigation.navigate("ChooseAlphabet", {
              screen: "WordBuilding",
            })
          }
        />
        <CardModeView
          title={t("wordGame.cardMode")}
          buttons={cardModeState}
          onButtonClick={(groupIndex: number, btnIndex: number) =>
            toggleButtonState(
              cardModeState,
              setCardModeState,
              groupIndex,
              btnIndex,
              "active",
              "has_one"
            )
          }
        />
        <CardModeView
          title={t("wordGame.mode")}
          buttons={modeState}
          onButtonClick={(groupIndex: number, btnIndex: number) =>
            toggleButtonState(
              modeState,
              setModeState,
              groupIndex,
              btnIndex,
              "active",
              "has_one"
            )
          }
        />

        <Button
          customStyles={{ marginTop: 60, marginBottom: 15 }}
          title={t("wordGame.start")}
          type={"general"}
          fontSize={17}
          onClick={() => {
            const keysCardModeState = getActiveFromArray(
              cardModeState,
              "active"
            );
            const keysModeState = getActiveFromArray(modeState, "active");

            navigation.navigate("Practice", {
              keysCardModeState,
              keysModeState,
              keysDifficultyLevelState: [],
              mode: PracticeScreenMode.WordGame,
            });
          }}
        />
      </ScrollView>
    </View>
  );
};

export default WordBuilding;