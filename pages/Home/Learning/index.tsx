import React from 'react'
import { View } from 'react-native'
import PreviewCard from '../../../components/PreviewCard';

type Props = {}

import learningImage from "../../../assets/preview/learning.png";
import Button from '../../../components/Button';
import { styles } from './styles';

const Learning = (props: Props) => {
  return (
    <View>
      <PreviewCard
        imageSource={learningImage}
        title={"66"}
        subtitle={"Hiragana / Katakana"}
      />

      <View style={styles.container}>
        <Button
          title={"Learn"}
          type={"general"}
          fontSize={17}
        />
      </View>
    </View>
  );
}

export default Learning;