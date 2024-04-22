import React from "react";

import { StyleSheet, Text, View } from "react-native";

import EducationPracticeFindPair from "@/entities/education/practice/word-game-find-pair/education-practice-find-pair";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { LessonMatchSymbols } from "@/shared/constants/lessons";
import { shufflePairs } from "@/shared/helpers/letters";

type LessonDrawScreenProps = LessonMatchSymbols & {
  next: () => void
}

const MatchLettersScreen: React.FC<LessonDrawScreenProps> = ({ name, symbols, kana, next }) => {

  const { colors } = useThemeContext();

  return (
    <View style={styles.container} >
      <View>
        <Text style={[styles.title, {
          color: colors.color4
        }]} >
          Сопоставьте хиригану с романзи.
        </Text>

        <EducationPracticeFindPair
          hideTitle
          onCompleted={next}
          question={{
            type: "find-pair-word",
            pairs: shufflePairs(symbols.map(item => [{ title: item.ka, id: item.ka }, { title: item.ru, id: item.ru }])),
            kana: kana,
            answers: symbols.map(item => [item.ka, item.ru])
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
