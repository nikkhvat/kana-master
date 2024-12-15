import React from "react";

import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import SoundLetter from "@/entities/kana/sound-letter/sound-letter";
import Symbol from "@/entities/kana/symbol/symbol";
import SymbolHeader from "@/entities/kana/symbol-header/symbol-header";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { KanaAlphabet } from "@/shared/constants/kana";
import { LessonSymbol } from "@/shared/constants/lessons";
import PrimaryButton from "@/shared/ui/buttons/Primary/primary-button";
import { LearningTitle } from "../ui/title";

type LessonSymbolScreenProps = LessonSymbol & {
  next: () => void;
  kana: KanaAlphabet;
};

const LessonSymbolScreen: React.FC<LessonSymbolScreenProps> = ({
  symbol,
  kana,
  next,
}) => {
  const { colors } = useThemeContext();

  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View>
        <LearningTitle>
          {t("lesson.rememberWritingAndSoundLetter")}
        </LearningTitle>

        <View
          style={[
            styles.symbolContainer,
            {
              borderColor: colors.BorderDefault,
            },
          ]}
        >
          <Symbol id={symbol?.id} kana={kana} />
        </View>

        <View style={styles.bottomRow}>
          <SoundLetter width={50} id={symbol.id} />
          <View>
            <SymbolHeader bottomTitle kana={kana} letter={symbol} />
          </View>
          <View style={{ width: 50 }}></View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <PrimaryButton isFullWidth text={t("common.next")} onClick={next} />
      </View>
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
    borderRadius: 24
  },
  buttonContainer: {
    width: "100%",
    height: 50,
  },
  bottomRow: {
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexDirection: "row",
  },
});
