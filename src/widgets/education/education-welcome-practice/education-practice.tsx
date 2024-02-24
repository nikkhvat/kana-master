/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";

import EducationModeChange, { EducationModeChangeProps } from "@/features/education/education-mode-change/education-mode-change";
import EducationKanaSelectedCard from "@/features/education/education-selected-card/education-kana-selected-card";
import { useAppSelector } from "@/hooks/redux";
import { CardMode, DifficultyLevelType, PracticeScreenMode } from "@/shared/constants/kana";
import { RootStackParamList } from "@/shared/types/navigationTypes";
import Button from "@/shared/ui/button/button";
import { RootState } from "@/store/store";


type PracticeNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface PracticeProps {
  navigation: PracticeNavigationProp;
}

const screenWidth = Dimensions.get("window").width;

const EducationPractice: React.FC<PracticeProps> = ({ navigation }) => {
  const { t } = useTranslation();
  
  const letters = useAppSelector((state: RootState) => state.kana.selected);
  const [cardModeState, setCardModeState] = useState<EducationModeChangeProps["buttons"]>([[], []]);

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
        { title: "Hira → Romaji", key: CardMode.hiraganaToRomaji, type: isHira ? "active" : "inactive", condition: isHira, },
        { title: "Romaji → Hira", key: CardMode.romajiToHiragana, type: "inactive", condition: isHira, },
        { title: "Hira → Kata", key: CardMode.hiraganaToKatakana, type: "inactive", condition: isHira && isKata, },
      ],
      [
        { title: "Kata → Romaji", key: CardMode.katakanaToRomaji, type: isKata ? "active" : "inactive", condition: isKata, },
        { title: "Romaji → Kata", key: CardMode.romajiToKatakana, type: "inactive", condition: isKata, },
        { title: "Kata → Hira", key: CardMode.katakanaToHiragana, type: "inactive", condition: isHira && isKata, },
      ],
    ]);
  }, [letters]);

  const DifficultyLevel: EducationModeChangeProps["buttons"] = [
    [{ 
      title: t("difficultyLevel.timeTest"), 
      key: DifficultyLevelType.TimeTest, 
      type: "inactive" 
    }],
    [{ 
      title: t("difficultyLevel.oneAttempt"), 
      key: DifficultyLevelType.OneAttempt, 
      type: "inactive" 
    }],
  ];

  const getActiveFromArray = (objects: any, active: string) => {
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

  const [difficultyLevelState, setDifficultyLevelState] = useState(DifficultyLevel);
  
  const toggleButtonState = (
    btnArray: typeof cardModeState,
    setBtnArray: (cards: any) => void,
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

  return (
    <View style={[styles.container, { width: screenWidth - 40 }]}>
      <ScrollView showsVerticalScrollIndicator={false} >
        <EducationKanaSelectedCard
          imageSource={"practice"}
          onEdit={() =>
            navigation.navigate("ChooseAlphabet", {
              screen: "Practice",
            })
          }
        />

        <EducationModeChange
          title={t("testing.cardMode")}
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

        <EducationModeChange
          title={t("testing.difficultyLevel")}
          buttons={difficultyLevelState}
          onButtonClick={(groupIndex: number, btnIndex: number) =>
            toggleButtonState(
              difficultyLevelState,
              setDifficultyLevelState,
              groupIndex,
              btnIndex,
              "weak",
              "no_one"
            )
          }
        />

        <Button
          customStyles={{ marginTop: 60, marginBottom: 15 }}
          title={t("testing.start")}
          type={"general"}
          fontSize={17}
          onClick={() => {
            const keysCardModeState = getActiveFromArray(
              cardModeState,
              "active"
            );
            const keysDifficultyLevelState = getActiveFromArray(
              difficultyLevelState,
              "weak"
            );

            navigation.navigate("Practice", {
              keysCardModeState,
              keysModeState: [],
              keysDifficultyLevelState,
              mode: PracticeScreenMode.Testing,
            });
          }}
        />
      </ScrollView>
    </View>
  );
};

export default EducationPractice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
