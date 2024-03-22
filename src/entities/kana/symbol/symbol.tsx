import React from "react";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import getImage from "@/shared/resources/svgs";


interface SymbolProps {
  id: string
  kana: "katakana" | "hiragana"
  width?: number
  height?: number
}

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

  return getImagePath(id, THEME);
};

export default Symbol;