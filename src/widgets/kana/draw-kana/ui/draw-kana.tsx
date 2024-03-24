import React from "react";

import { useTranslation } from "react-i18next";
import { Dimensions, TouchableOpacity, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Draw from "@/entities/education/draw/draw";
import SymbolHeader from "@/entities/kana/symbol-header/symbol-header";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { KanaAlphabet } from "@/shared/constants/kana";
import { ILetter } from "@/shared/data/lettersTable";

interface DrawKanaProps {
  letter: ILetter,
  kana: KanaAlphabet,
  back: () => void
}

const screenWidth = Dimensions.get("window").width;

const width = screenWidth - 40;
const height = screenWidth - 40;

const DrawKana: React.FC<DrawKanaProps> = ({ letter, kana, back }) => {
  const { colors } = useThemeContext();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.color1 }
      ]} >
      <View style={styles.header}>
        <TouchableOpacity onPress={back}>
          <Icon
            name={"keyboard-backspace"}
            size={24}
            color={colors.color4} />
        </TouchableOpacity>
      </View>

      <SymbolHeader 
        kana={kana} 
        letter={letter} />

      <Draw 
        width={width}
        height={height}
        letter={letter}
        kana={kana} 
      />
    </View>
  );
};

export default DrawKana;


const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
    width: "100%",
    flexDirection: "column",
    gap: 22,
  },
});