import React, { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'

import learningImage from "../../../assets/preview/wordgame.png";
import PreviewCard from '../../../components/PreviewCard';

import CardModeView, { CardModeViewProp } from '../../../components/CardModeView';
import Button from '../../../components/Button';


type Props = {}

const WordBuilding = (props: Props) => {

  const cardMode: CardModeViewProp["btns"] = [
    [
      { title: "Hira → Kata", key: "Hira2Kata", onCLick: () => {}, type: "active" },
      { title: "Hira → Romaji", key: "Hira2Romaji", onCLick: () => {}, type: "inactive" },
      { title: "Romaji → Hira", key: "Romaji2Hira", onCLick: () => {}, type: "inactive" },
    ],
    [
      { title: "Kata → Hira", key: "Kata2Hira", onCLick: () => {}, type: "inactive" },
      { title: "Kata → Romaji", key: "Kata2Romaji", onCLick: () => {}, type: "inactive" },
      { title: "Romaji → Kata", key: "Romaji2Kata", onCLick: () => {}, type: "inactive" },
    ],
  ];

  const Mode: CardModeViewProp["btns"] = [
    [
      { title: "Choice", key: "Choice", onCLick: () => {}, type: "active" },
      { title: "Word building", key: "Word building", onCLick: () => {}, type: "inactive" },
    ],
    [
      { title: "Write", key: "Write", onCLick: () => {}, type: "inactive" },
      { title: "Find the pair", key: "Find the pair", onCLick: () => {}, type: "inactive" },
    ],
  ];

  const DifficultyLevel: CardModeViewProp["btns"] = [
    [{ title: "Time test", key: "Time test", onCLick: () => {}, type: "weak" }],
    [{ title: "One attempt", key: "One attempt", onCLick: () => {}, type: "inactive" }],
  ];

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

    // Проверяем, есть ли другие активные кнопки, кроме текущей
    const isActivePresentInOthers = newBtnArray.some((group, gIndex) =>
      group.some(
        (btn, bIndex) =>
          btn.type === active && (gIndex !== indexGroup || bIndex !== indexButton)
      )
    );

    // Если mode равен "has_one" и текущая кнопка единственная активная, не меняем ее состояние
    if (
      mode === "has_one" &&
      currentType === active &&
      !isActivePresentInOthers
    ) {
      return;
    }

    // Обновляем состояние кнопки
    newBtnArray[indexGroup][indexButton].type =
      currentType === active ? "inactive" : active;

    setBtnArray(newBtnArray);
  };

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


  return (
    <View>
      <ScrollView style={{ paddingHorizontal: 20, marginBottom: 15 }}>
        <PreviewCard
          imageSource={learningImage}
          title={"44"}
          subtitle={"Hiragana / Katakana"}
        />
        <CardModeView
          title={"Card mode"}
          btns={cardModeState}
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
          btns={modeState}
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
          btns={difficultyLevelState}
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
          customStyles={{ marginTop: 60 }}
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

export default WordBuilding;