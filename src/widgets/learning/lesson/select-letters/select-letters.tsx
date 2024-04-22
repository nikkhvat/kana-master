import React from "react";

import { StyleSheet, Text, View } from "react-native";

import EducationPracticeChooseValue from "@/entities/education/practice/word-game-choose-value/word-game-choose-value";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { LessonSelectSymbol } from "@/shared/constants/lessons";

type SelectLettersScreenProps = LessonSelectSymbol & {
  next: () => void
}

const SelectLettersScreen: React.FC<SelectLettersScreenProps> = ({ name, symbols, kana, next }) => {

  const { colors } = useThemeContext();

  return (
    <View style={styles.container} >
      <Text style={[styles.title, {
        color: colors.color4
      }]} >
        Выбирите букву хириганы для звука {symbols[1]?.en}
      </Text>
      <EducationPracticeChooseValue 
        hideTitle
        title={"qwe"} 
        answers={symbols.map(item => ({
          text: item.ka,
          key: item.id
        }))}
        onCompleted={next}
        trueAnswer={symbols[1].id}
        word={{
          kana: "",
          kanji: null,
          romanji: "",
          translate: ""
        }} />
    </View>
  );
};

export default SelectLettersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    width: "100%",
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 30
  },
});
