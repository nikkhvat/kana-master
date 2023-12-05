import React from 'react'
import { ScrollView, Text, View } from 'react-native'

import learningImage from "../../../assets/preview/wordgame.png";
import PreviewCard from '../../../components/PreviewCard';

import CardModeView, { CardModeViewProp } from '../../../components/CardModeView';
import Button from '../../../components/Button';


type Props = {}

const WordBuilding = (props: Props) => {

  const cardMode: CardModeViewProp["btns"] = [
    [
      { title: "Hira → Kata", onCLick: () => {}, type: "active" },
      { title: "Hira → Romaji", onCLick: () => {}, type: "inactive" },
      { title: "Romaji → Hira", onCLick: () => {}, type: "inactive" },
    ],
    [
      { title: "Kata → Hira", onCLick: () => {}, type: "inactive" },
      { title: "Kata → Romaji", onCLick: () => {}, type: "inactive" },
      { title: "Romaji → Kata", onCLick: () => {}, type: "inactive" },
    ],
  ];

  const Mode: CardModeViewProp["btns"] = [
    [
      { title: "Choice", onCLick: () => {}, type: "active" },
      { title: "Word building", onCLick: () => {}, type: "inactive" },
    ],
    [
      { title: "Write", onCLick: () => {}, type: "inactive" },
      { title: "Find the pair", onCLick: () => {}, type: "inactive" },
    ],
  ];

  const DifficultyLevel: CardModeViewProp["btns"] = [
    [{ title: "Time test", onCLick: () => {}, type: "weak" }],
    [{ title: "One attempt", onCLick: () => {}, type: "inactive" }],
  ];

  return (
    <View>
      <ScrollView style={{ paddingHorizontal: 20, marginBottom: 15 }}>
        <PreviewCard
          imageSource={learningImage}
          title={"44"}
          subtitle={"Hiragana / Katakana"}
        />
        <CardModeView title={"Card mode"} btns={cardMode} />
        <CardModeView title={"Mode"} btns={Mode} />
        <CardModeView title={"Difficulty level"} btns={DifficultyLevel} />
        <Button
          customStyles={{ marginTop: 60 }}
          title={"Start"}
          type={"general"}
          fontSize={17}
        />
      </ScrollView>
    </View>
  );
}

export default WordBuilding;