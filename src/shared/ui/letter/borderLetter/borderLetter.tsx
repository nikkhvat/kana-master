import React from "react";

import { Dimensions, View } from "react-native";

import Symbol from "@/entities/kana/symbol/symbol";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { KanaAlphabet } from "@/shared/constants/kana";

type borderLetterProps = {
  id: string
  kana: KanaAlphabet
}

const screenWidth = Dimensions.get("window").width;

const BorderLetter: React.FC<borderLetterProps> = ({ id, kana }) => {
  const { colors } = useThemeContext();

  return (
    <View>
      <View style={{
        width: screenWidth - 40,
        height: screenWidth - 40,
        borderColor: colors.color2,
        borderWidth: 1,
        borderRadius: 12,
        marginTop: 30
      }} >
        <Symbol id={id} kana={kana} />
      </View>
    </View>
  );
};

export default BorderLetter;