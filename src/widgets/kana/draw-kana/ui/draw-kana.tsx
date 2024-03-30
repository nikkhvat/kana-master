import React from "react";

import { StyleSheet, View } from "react-native";

import Draw from "@/entities/education/draw/draw";
import SymbolHeader from "@/entities/kana/symbol-header/symbol-header";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { KanaAlphabet } from "@/shared/constants/kana";
import { ILetter } from "@/shared/data/lettersTable";

interface DrawKanaProps {
  letter: ILetter,
  kana: KanaAlphabet,
}

const DrawKana: React.FC<DrawKanaProps> = ({ letter, kana }) => {
  const { colors } = useThemeContext();

  return (
    <View
      style={[
        styles.container,
        { 
          backgroundColor: colors.color1,
        }
      ]} >
      <SymbolHeader hideTitle kana={kana} letter={letter} />
      <Draw kana={kana} letter={letter} />
    </View>
  );
};

export default DrawKana;


const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 0,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
    width: "100%",
    flexDirection: "column",
    gap: 22,
  },
});