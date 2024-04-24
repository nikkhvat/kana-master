import React from "react";

import { useTranslation } from "react-i18next";
import { Dimensions, StyleSheet, Text, View } from "react-native";

import SoundLetter from "@/entities/kana/sound-letter/sound-letter";
import Symbol from "@/entities/kana/symbol/symbol";
import SymbolHeader from "@/entities/kana/symbol-header/symbol-header";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { KanaAlphabet } from "@/shared/constants/kana";
import { LessonSymbol } from "@/shared/constants/lessons";
import Button from "@/shared/ui/button/button";


type LessonSymbolScreenProps = LessonSymbol & {
  next: () => void
  kana: KanaAlphabet
}

const screenWidth = Dimensions.get("window").width;

const LessonSymbolScreen: React.FC<LessonSymbolScreenProps> = ({ name, symbol, kana, next }) => {

  const { colors } = useThemeContext();

  const { t } = useTranslation();

  return (
    <View style={styles.container} >
      <View>
        <Text style={[styles.title, {
          color: colors.color4
        }]} >
          {t("lesson.rememberWritingAndSoundLetter")}
        </Text>

        <View style={[styles.symbolContainer, {
          width: screenWidth - 40,
          height: screenWidth - 40,
          borderColor: colors.color2
        }]} >
          <Symbol id={symbol?.id} kana={kana} />
        </View>
        <View style={styles.bottomRow}  >
          <SoundLetter customStyles={{ width: 50, height: 50 }} id={symbol.en} />
          <View>
            <SymbolHeader bottomTitle kana={kana} letter={symbol} />
          </View>
          <View style={{width: 50}} ></View>
        </View>
      </View>

      <Button
        customStyles={{ width: "100%" }}
        type={"general"}
        title={t("common.next")}
        onClick={next}
      />
    </View>
  );
};

export default LessonSymbolScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  symbolContainer: {
    borderWidth: 1,
    borderRadius: 12,
    marginTop: 30
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center"
  },
  bottomRow: {
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexDirection: "row"
  }
});
