import React, { useEffect } from "react";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StyleSheet, View } from "react-native";

import { useEducationLessonContext } from "../lib/context/education-lesson-context";

import SafeLayout from "@/app/layouts/safeLayout";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { LessonScreen } from "@/shared/constants/lessons";
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
  const { letters, kana } = route.params;

  const { colors } = useThemeContext();

  const { init, currentScreen, screen, screens, next, retry } = useEducationLessonContext();

  useEffect(() => {
    init(letters);
  }, []);

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
      {currentScreen?.name === LessonScreen.Symbol && 
        <LessonSymbolScreen 
          name={LessonScreen.Symbol}
          symbol={currentScreen.symbol}
          kana={kana}
          next={next} />}
      
      {currentScreen?.name === LessonScreen.Draw && 
        <LessonDrawScreen 
          name={LessonScreen.Draw}
          symbol={currentScreen.symbol}
          kana={kana}
          next={next} />}
      
      {currentScreen?.name === LessonScreen.MatchSymbols && 
        <MatchLettersScreen 
          name={LessonScreen.MatchSymbols}
          symbols={currentScreen.symbols}
          kana={kana}
          next={next} />}
      
      {currentScreen?.name === LessonScreen.SelectSymbol && 
        <SelectLettersScreen 
          name={LessonScreen.SelectSymbol}
          symbols={currentScreen.symbols}
          kana={kana}
          next={next} />}
      
      {currentScreen?.name === LessonScreen.SelectSequenceLetters && 
        <SelectSequenceLettersScreen
          name={LessonScreen.SelectSequenceLetters}
          sequence={currentScreen.sequence}
          kana={kana}
          next={next} />}
      
      {currentScreen?.name === LessonScreen.BuildWord && 
        <BuildWordScreen
          name={LessonScreen.BuildWord}
          sequence={currentScreen.sequence}
          kana={kana}
          next={next} />}
      
      {currentScreen?.name === LessonScreen.Finish && 
        <FinishScreen name={LessonScreen.Finish} 
          next={navigation.goBack}
          retry={retry} />}
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
