import React from "react";

import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

import EducationPracticeFindPair from "@/entities/education/practice/word-game-find-pair/education-practice-find-pair";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { KanaAlphabet } from "@/shared/constants/kana";
import { LessonMatchSymbols } from "@/shared/constants/lessons";
import getKana from "@/shared/helpers/getKanaKey";
import { shufflePairs } from "@/shared/helpers/letters";
import useGetRomanji from "@/shared/lib/i18n/hooks/useKey";
import MatchPairs from "@/shared/ui/match-pairs/match-pairs";


type LessonDrawScreenProps = LessonMatchSymbols & {
  next: () => void
  kana: KanaAlphabet
}

const MatchLettersScreen: React.FC<LessonDrawScreenProps> = ({ name, symbols, kana, next }) => {
  const { colors } = useThemeContext();

  const { t } = useTranslation();
  const { getRomanji } = useGetRomanji();


  return (
    <View style={styles.container} >
      <View>
        <Text style={[styles.title, {color: colors.color4 }]} >
          {kana === KanaAlphabet.Hiragana
            ? t("lesson.matchHiraganaWithTransliteration")
            : t("lesson.matchKatakanaWithTransliteration") }
        </Text>

        <EducationPracticeFindPair
          hideTitle
          onCompleted={next}
          question={{
            type: "find-pair-word",
            pairs: shufflePairs(symbols.map(item => 
              [
                { title: getKana(item, kana), id: getKana(item, kana) },
                { title: getRomanji(item), id: getRomanji(item) }
              ])),
            kana: kana,
            answers: symbols.map(item => [getKana(item, kana), getRomanji(item)])
          }} />
      </View>
    </View>
  );
};

export default MatchLettersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 30
  },
});
