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
}


const screenWidth = Dimensions.get("window").width;

const canvasSize =
  screenWidth -
  40 -
  (screenWidth > TABLET_WIDTH ? verticalScale(TABLET_PADDING) : 0);

const Symbol: React.FC<SymbolProps> = ({
  id,
  kana,
}) => {

  const { colors } = useThemeContext();
  
  const THEME = colors._theme === "dark" ? "DARK" : "LIGHT";

  const getImagePath = (key: string | undefined, theme: "DARK" | "LIGHT") => {
    const key_formated = `${kana}_${theme === "DARK" ? "dark" : "light"}_${key?.replaceAll("-", "_")}`;

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
    {getImagePath(id, THEME)}
  </View>;
};

export default Symbol;