import React from 'react'
import { Text, View } from 'react-native'

type Props = {}

import learningImage from "../../../assets/preview/practice.png";
import PreviewCard from '../../../components/PreviewCard';

const Practice = (props: Props) => {
  return (
    <View>
      <PreviewCard
        imageSource={learningImage}
        title={"66"}
        subtitle={"Hiragana / Katakana"}
      />
      <Text>Practice</Text>
    </View>
  );
}

export default Practice;