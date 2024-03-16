import React, { useEffect } from "react";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useKeepAwake } from "expo-keep-awake";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useEducationPracticeContext } from "../lib/context/education-practice-context";
import { useEducationStatisticContext } from "../lib/context/education-statistic-context";

import { RootState } from "@/app/store";
import EducationPracticeChooseLetters from "@/entities/education/education-practice-choose-letters/education-practice-choose-letters";
import EducationPracticeChooseValue from "@/entities/education/education-practice-choose-value/education-practice-choose-value";
import EducationPracticeFindPair from "@/entities/education/education-practice-find-pair/education-practice-find-pair";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { countAvailableWords } from "@/pages/education/kana-quick-selection/model/slice";
import { QuestionTypeBuildingWord, QuestionTypeChooseWord, QuestionTypeFindPairWord } from "@/shared/constants/kana";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import { RootStackParamList } from "@/shared/types/navigationTypes";
import LinearProgressBar from "@/shared/ui/progressbar/linear/linear-progress-bar";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "EducationWordGame">;
type LearnScreenRouteProp = RouteProp<RootStackParamList, "EducationWordGame">;

interface LearnScreenProps {
  route: LearnScreenRouteProp
  navigation: HomeScreenNavigationProp
}

export interface RegistErrorProps {
  type: typeof QuestionTypeFindPairWord | typeof QuestionTypeBuildingWord | typeof QuestionTypeChooseWord,
  pair: string[];
}

function EducationWordGame({ route, navigation }: LearnScreenProps) {
  useKeepAwake();

  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const { colors } = useThemeContext();

  useEffect(() => {
    dispatch(countAvailableWords());
  }, [dispatch]);

  const selectedLetters = useAppSelector((state: RootState) => state.kana.selected);
  const selectedWords = useAppSelector((state: RootState) => state.kana.selectedWords);

  const { keysModeState } = route.params;

  const { init, submit, questions, currentIndex, generateQuestions } = useEducationPracticeContext();

  const { init: initStat, pickAnswer, registrError, getResult } = useEducationStatisticContext();

  useEffect(() => {
    const generateQuestion = generateQuestions({
      selectedLetters,
      selectedWords,
      keysModeState,
    });

    init(generateQuestion);
    initStat();

    return () => {};
  }, []);

  // Вызываеться после ответа на вопрос
  const finishCallback = (onFinishPractice: boolean, trueAnswer: boolean) => {
    pickAnswer({
      correctAnswer: trueAnswer,
      last: !!onFinishPractice,
    });

    if (onFinishPractice) {
      const result = getResult();
      navigation.navigate("Results", { result });
    }
  };

  const onSubmit = (trueAnswer: boolean) => submit(trueAnswer, finishCallback);

  const question = questions[currentIndex];

  const isFindPair = question?.type === QuestionTypeFindPairWord;
  const isBuildingWord = question?.type === QuestionTypeBuildingWord;
  const isChooseWord = question?.type === QuestionTypeChooseWord;

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom,
          backgroundColor: colors.color1
        }
      ]} >
      <View style={styles.header}>
        <LinearProgressBar
          close={navigation.goBack}
          current={currentIndex + 1}
          all={questions.length}
        />
      </View>

      {/* Выбор пары (игра слов) */}
      {isFindPair &&
        <EducationPracticeFindPair
          pairs={question.pairs}
          answers={question.answers}
          onCompleted={(isError) => onSubmit(!isError)}
          onError={registrError}
          title={question.title}
        />}

      {/* Составить слово из предложенных букв (игра слов) */}
      {isBuildingWord &&
        <EducationPracticeChooseLetters
          title={question.title}
          romanji={question.romanji}
          translate={question.translate}
          kana={question.kana}
          shuffle={question.shuffle}
          onError={registrError}
          onFinish={(isError) => onSubmit(!isError)}
        />}

      {/* Составить слово из предложенных букв (игра слов) */}
      {isChooseWord &&
        <EducationPracticeChooseValue
          title={question.title}
          answers={question.questions}
          onCompleted={(isError) => onSubmit(!isError)}
          onError={registrError}
          word={question.word}
          trueAnswer={question.trueKey}
        />}
    </View>
  );
}

export default EducationWordGame;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center"
  },
  header: {
    width: "100%",
    flexDirection: "column",
    gap: 22
  }
});
