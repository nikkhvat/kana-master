import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'

import learningImage from "../../../assets/preview/practice.png";
import PreviewCard from '../../../components/PreviewCard';
import CardModeView, { CardModeViewProp } from '../../../components/CardModeView';
import Button from '../../../components/Button';

const Practice = () => {
  const cardMode: CardModeViewProp["buttons"] = [
    [
      { title: "Hira → Kata", key: "hira2kata", onCLick: () => {}, type: "active" },
      { title: "Hira → Romaji", key: "hira2romaji", onCLick: () => {}, type: "inactive" },
      { title: "Romaji → Hira", key: "romaji2hira", onCLick: () => {}, type: "inactive" },
    ],
    [
      { title: "Kata → Hira", key: "kata2hira", onCLick: () => {}, type: "inactive" },
      { title: "Kata → Romaji", key: "kata2romaji", onCLick: () => {}, type: "inactive" },
      { title: "Romaji → Kata", key: "romaji2kata", onCLick: () => {}, type: "inactive" },
    ],
  ];

  const Mode: CardModeViewProp["buttons"] = [
    [{ title: "Choice", key: "Choice", onCLick: () => {}, type: "active" }],
    [{ title: "Write", key: "Write", onCLick: () => {}, type: "inactive" }],
  ];

  const DifficultyLevel: CardModeViewProp["buttons"] = [
    [{ title: "Time test", key: "Time test", onCLick: () => {}, type: "weak" }],
    [{ title: "One attempt", key: "One attempt", onCLick: () => {}, type: "inactive" }],
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
  const [modeState, setModeState] = useState(Mode);
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

  
  return (
    <View>
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <PreviewCard
          imageSource={learningImage}
          title={"66"}
          subtitle={"Hiragana / Katakana"}
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
          title={"Mode"}
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
            const keys1 = getActiveFromArray(cardModeState, "active");
            const keys2 = getActiveFromArray(modeState, "active");
            const keys3 = getActiveFromArray(difficultyLevelState, "weak");
            console.log("start test");
            console.log(keys1, keys2, keys3);
          }}
        />
      </ScrollView>
    </View>
  );
}

export default Practice;