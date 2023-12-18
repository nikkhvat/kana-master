import React, { useState } from 'react'
import { Animated, ScrollView, View } from 'react-native'

import PreviewCard from '@/components/PreviewCard';
import CardModeView, { CardModeViewProp } from '@/components/CardModeView';
import Button from '@/components/Button';
import { CardMode, DifficultyLevelType, PracticeScreenMode } from '@/constants/kana';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/navigationTypes';

type PracticeNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface PracticeProps {
  navigation: PracticeNavigationProp;
}

const Practice: React.FC<PracticeProps> = ({ navigation }) => {
  const cardMode: CardModeViewProp["buttons"] = [
    [
      { title: "Hira → Kata", key: CardMode.hiraganaToKatakana, type: "active" },
      { title: "Hira → Romaji", key: CardMode.hiraganaToRomaji, type: "inactive" },
      { title: "Romaji → Hira", key: CardMode.romajiToHiragana, type: "inactive" },
    ],
    [
      { title: "Kata → Hira", key: CardMode.katakanaToHiragana, type: "inactive" },
      { title: "Kata → Romaji", key: CardMode.katakanaToRomaji, type: "inactive" },
      { title: "Romaji → Kata", key: CardMode.romajiToKatakana, type: "inactive" },
    ],
  ];

  const DifficultyLevel: CardModeViewProp["buttons"] = [
    [{ title: "Time test", key: DifficultyLevelType.TimeTest, type: "inactive" }],
    [{ title: "One attempt", key: DifficultyLevelType.OneAttempt, type: "inactive" }],
  ];

  const getActiveFromArray = (objects: any, active: string) => {
    const array = []

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
  }

  const [cardModeState, setCardModeState] = useState(cardMode);
  const [difficultyLevelState, setDifficultyLevelState] = useState(DifficultyLevel);
  
  const toggleButtonState = (
    btnArray: typeof cardMode,
    setBtnArray: Function,
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
          btn.type === active && (gIndex !== indexGroup || bIndex !== indexButton)
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

  const scrollY = new Animated.Value(0);

  return (
    <View>
      <ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        style={{ paddingHorizontal: 20 }}
      >
        <PreviewCard
          imageSource={"practice"}
          onEdit={() => navigation.navigate("ChooseAlphabet")}
        />

        <CardModeView
          title={"Card mode"}
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
          title={"Difficulty level"}
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
          title={"Start"}
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
}

export default Practice;