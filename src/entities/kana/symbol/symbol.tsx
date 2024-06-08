import React from "react";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { KanaAlphabet } from "@/shared/constants/kana";
import getImage from "@/shared/resources/svgs";
import { Dimensions, View } from "react-native";
import { verticalScale } from "@/shared/helpers/metrics";
import { TABLET_PADDING, TABLET_WIDTH } from "@/shared/constants/app";


interface SymbolProps {
  id: string
  kana: KanaAlphabet.Hiragana | KanaAlphabet.Katakana
  width?: number
  height?: number

  isGray?: boolean
}


const screenWidth = Dimensions.get("window").width;

const canvasSize =
  screenWidth -
  40 -
  (screenWidth > TABLET_WIDTH ? verticalScale(TABLET_PADDING) : 0);

const Symbol: React.FC<SymbolProps> = ({
  id,
  kana,

  isGray,
}) => {

  const { colors } = useThemeContext();
  
  colors._theme === "dark" ? "DARK" : "LIGHT";

  let letterColors = [null, null] as (null | string)[];

  if (colors._theme === "dark") {
    if (isGray) {
      letterColors = [colors.color2, colors.color2]
    } else {
      letterColors = [colors.second_color3, colors.color4]
    }
  } else {
    if (isGray) {
      letterColors = [colors.color2, colors.color2]
    } else {
      letterColors = [colors.second_color3, colors.color4]
    }
  }

  const getImagePath = (key: string | undefined) => {
    const key_formated = `${kana}_${key?.replaceAll("-", "_")}`;

    return getImage(key_formated);
  };

  return <View style={{
    height: canvasSize,
    width: canvasSize,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }} >
    {getImagePath(id)(letterColors[0] as string, letterColors[1] as string)}
  </View>;
};

export default Symbol;