import React, { useEffect, useState } from "react";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StyleSheet, View } from "react-native";

import { useEducationLessonContext } from "../lib/context/education-lesson-context";

import SafeLayout from "@/app/layouts/safeLayout";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { KanaAlphabet } from "@/shared/constants/kana";
import { AnyLesson, LessonScreen } from "@/shared/constants/lessons";
import { ILetter } from "@/shared/data/lettersTable";
import { RootStackParamList } from "@/shared/types/navigationTypes";
import LinearProgressBar from "@/shared/ui/progressbar/linear/linear-progress-bar";
import BuildWordScreen from "@/widgets/learning/lesson/build-word-screen/build-word-screen";
import LessonDrawScreen from "@/widgets/learning/lesson/draw/draw";
import FinishScreen from "@/widgets/learning/lesson/finish-screen/finish-screen";
import MatchLettersScreen from "@/widgets/learning/lesson/match-letters/match-letters";
import SelectLettersScreen from "@/widgets/learning/lesson/select-letters/select-letters";
import SelectSequenceLettersScreen from "@/widgets/learning/lesson/select-sequence-letters/select-sequence-letters";
import LessonSymbolScreen from "@/widgets/learning/lesson/symbol/symbol";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "LessonPage">;
type LearnScreenRouteProp = RouteProp<RootStackParamList, "LessonPage">;

interface LearnScreenProps {
  route: LearnScreenRouteProp
  navigation: HomeScreenNavigationProp
}


const Lesson: React.FC<LearnScreenProps> = ({ route, navigation }) => {
  const { letters } = route.params;

  const { init } = useEducationLessonContext();

  const { colors } = useThemeContext();

  useEffect(() => {
    init(letters);
  }, []);

  const screens: AnyLesson[] = [
    {
      name: LessonScreen.Symbol,
      symbol: { id: "a151eeeb-2537-463c-ae23-d484d1bcb835", ka: "ア", hi: "あ", en: "A", ru: "А" } as ILetter,
      kana: KanaAlphabet.Hiragana
    },
    {
      name: LessonScreen.Draw,
      symbol: { id: "a151eeeb-2537-463c-ae23-d484d1bcb835", ka: "ア", hi: "あ", en: "A", ru: "А" } as ILetter,
      kana: KanaAlphabet.Hiragana
    },
    {
      name: LessonScreen.MatchSymbols,
      symbols: [
        { id: "a151eeeb-2537-463c-ae23-d484d1bcb835", ka: "ア", hi: "あ", en: "A", ru: "А" },
        { id: "11017078-148a-4a44-b3f7-21d1df02d981", ka: "イ", hi: "い", en: "I", ru: "И" },
      ] as ILetter[],
      kana: KanaAlphabet.Hiragana
    },
    {
      name: LessonScreen.SelectSymbol,
      symbols: [
        { id: "a151eeeb-2537-463c-ae23-d484d1bcb835", ka: "ア", hi: "あ", en: "A", ru: "А" },
        { id: "11017078-148a-4a44-b3f7-21d1df02d981", ka: "イ", hi: "い", en: "I", ru: "И" },
      ] as ILetter[],
      kana: KanaAlphabet.Hiragana
    },
    {
      name: LessonScreen.SelectSequenceLetters,
      sequence: [
        { id: "11017078-148a-4a44-b3f7-21d1df02d981", ka: "イ", hi: "い", en: "I", ru: "И" },
        { id: "a151eeeb-2537-463c-ae23-d484d1bcb835", ka: "ア", hi: "あ", en: "A", ru: "А" },
        { id: "70680d73-c9f9-4b4e-aac4-c82caa49668c", ka: "エ", hi: "え", en: "E", ru: "Э" },
        { id: "bcbd90e2-fabc-4dcc-8022-02e5b650c822", ka: "ウ", hi: "う", en: "U", ru: "У" },
      ],
      kana: KanaAlphabet.Hiragana
    },
    {
      name: LessonScreen.BuildWord,
      sequence: [
        { id: "11017078-148a-4a44-b3f7-21d1df02d981", ka: "イ", hi: "い", en: "I", ru: "И" },
        { id: "a151eeeb-2537-463c-ae23-d484d1bcb835", ka: "ア", hi: "あ", en: "A", ru: "А" },
        { id: "70680d73-c9f9-4b4e-aac4-c82caa49668c", ka: "エ", hi: "え", en: "E", ru: "Э" },
        { id: "bcbd90e2-fabc-4dcc-8022-02e5b650c822", ka: "ウ", hi: "う", en: "U", ru: "У" },
      ],
      kana: KanaAlphabet.Hiragana
    },
    {
      name: LessonScreen.Finish,
    }
  ];

  const [screen, setScreen] = useState(0);

  const currentScreen = screens[screen];

  const toNext = () => {
    if (screen + 1 !== screens.length) {
      setScreen(prev => prev + 1);
    } else {
      navigation.goBack();
    }
  };

  const retry = () => {
    setScreen(0);
  };

  return (
    <SafeLayout  
      additionalPaddingTop={20}
      style={[
        styles.container,
        {
          flex: 1,
          backgroundColor: colors.color1
        }
      ]} >
      <View style={styles.header}>
        {screen + 1 !== screens.length && <LinearProgressBar
          close={navigation.goBack}
          current={screen + 1}
          all={screens.length}
        />}
      </View>
      <View style={styles.container} >
      {currentScreen.name === LessonScreen.Symbol && 
        <LessonSymbolScreen 
          name={LessonScreen.Symbol}
          symbol={currentScreen.symbol}
          kana={KanaAlphabet.Hiragana}
          next={toNext} />}
      
      {currentScreen.name === LessonScreen.Draw && 
        <LessonDrawScreen 
          name={LessonScreen.Draw}
          symbol={currentScreen.symbol}
          kana={KanaAlphabet.Hiragana}
          next={toNext} />}
      
      {currentScreen.name === LessonScreen.MatchSymbols && 
        <MatchLettersScreen 
          name={LessonScreen.MatchSymbols}
          symbols={currentScreen.symbols}
          kana={KanaAlphabet.Hiragana}
          next={toNext} />}
      
      {currentScreen.name === LessonScreen.SelectSymbol && 
        <SelectLettersScreen 
          name={LessonScreen.SelectSymbol}
          symbols={currentScreen.symbols}
          kana={KanaAlphabet.Hiragana}
          next={toNext} />}
      
      {currentScreen.name === LessonScreen.SelectSequenceLetters && 
        <SelectSequenceLettersScreen
          name={LessonScreen.SelectSequenceLetters}
          sequence={currentScreen.sequence}
          kana={KanaAlphabet.Hiragana}
          next={toNext} />}
      
      {currentScreen.name === LessonScreen.BuildWord && 
        <BuildWordScreen
          name={LessonScreen.BuildWord}
          sequence={currentScreen.sequence}
          kana={KanaAlphabet.Hiragana}
          next={toNext} />}
      
      {currentScreen.name === LessonScreen.Finish && 
        <FinishScreen name={LessonScreen.Finish} next={toNext} retry={retry} />}
      </View>
    </SafeLayout>
  );
};

export default Lesson;


const styles = StyleSheet.create({
  header: {
    marginBottom: 22,
  },
  container: {
    flex: 1,
  }
});
