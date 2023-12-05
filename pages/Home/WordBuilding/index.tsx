import React from 'react'
import { Text, View } from 'react-native'

import learningImage from "../../../assets/preview/wordgame.png";
import PreviewCard from '../../../components/PreviewCard';

type Props = {}

const WordBuilding = (props: Props) => {
  return (
    <View>
      <PreviewCard
        imageSource={learningImage}
        title={"44"}
        subtitle={"Hiragana / Katakana"}
      />
      <Text>WordBuilding</Text>
    </View>
  );
}

export default WordBuilding;