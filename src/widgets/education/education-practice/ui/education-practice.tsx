import React, { useEffect } from "react";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useKeepAwake } from "expo-keep-awake";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useEducationPracticeContext } from "../lib/context/education-practice-context";

import { RootState } from "@/app/store";
import EducationPracticeChooseLetters from "@/features/education/education-practice-choose-letters/education-practice-choose-letters";
import EducationPracticeChooseValue from "@/features/education/education-practice-choose-value/education-practice-choose-value";
import EducationPracticeFindPair from "@/features/education/education-practice-find-pair/education-practice-find-pair";
import EducationPracticeSelectAnswers from "@/features/education/education-practice-select-answers/education-practice-select-answers";
import EducationPracticeShowSymbol from "@/features/education/education-practice-show-symbol/education-practice-show-symbol";
import EducationPracticeTimer from "@/features/education/education-practice-timer/education-practice-timer";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useThemeContext } from "@/hooks/theme-context";
import useStats from "@/hooks/useStats";
import { DifficultyLevelType, PracticeScreenMode, QuestionTypeBuildingWord, QuestionTypeChooseLetter, QuestionTypeChooseWord, QuestionTypeFindPairWord } from "@/shared/constants/kana";
import { RootStackParamList } from "@/shared/types/navigationTypes";
import LinearProgressBar from "@/shared/ui/progressbar/linear/linear-progress-bar";
import { countAvailableWords } from "@/store/features/kana/slice";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Practice">;
type LearnScreenRouteProp = RouteProp<RootStackParamList, "Practice">;

interface LearnScreenProps {
  route: LearnScreenRouteProp
  navigation: HomeScreenNavigationProp
}

function EducationPractice({ route, navigation }: LearnScreenProps) {
  useKeepAwake();

  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const { colors } = useThemeContext();

  useEffect(() => {
    dispatch(countAvailableWords());
  }, [dispatch]);

  const selectedLetters = useAppSelector((state: RootState) => state.kana.selected);
  const selectedWords = useAppSelector((state: RootState) => state.kana.selectedWords);

  const {
    keysCardModeState,
    keysModeState,
    timerDeration,
    keysDifficultyLevelState,
    mode
  } = route.params;

  const IS_TIMER = keysDifficultyLevelState.includes(DifficultyLevelType.TimeTest);
  const ONE_ATTEMPT = keysDifficultyLevelState.includes(DifficultyLevelType.OneAttempt);

  const TIMER_SPEED = timerDeration === "fast" ? 3 : timerDeration === "slow" ? 7 : 5;

  const stats = useStats({
    cardModeState: keysCardModeState,
  });

  const { init, submit, questions, currentIndex, generateQuestions } = useEducationPracticeContext();

  useEffect(() => {
    const generateQuestion = generateQuestions({
      mode,
      selectedLetters,
      selectedWords,
      keysCardModeState,
      keysModeState,
    });

    init(generateQuestion);

    return () => {};
  }, []);

  // Вызываеться после ответа на вопрос
  const finishCallback = (onFinishPractice: boolean, trueAnswer: boolean) => {
    stats.recordAnswer(trueAnswer, 10, "questions[index]");

    if (onFinishPractice) {
      const finalStats = stats.getStats();
      navigation.navigate("Results", { stats: finalStats });
    }
  };

  const onSubmit = (trueAnswer: boolean) => submit(trueAnswer, finishCallback);
  const onError = () => ONE_ATTEMPT && onSubmit(false);
  const endTime = () => onSubmit(false);

  const question = questions[currentIndex];

  const isChooseLetter = question?.type === QuestionTypeChooseLetter;
  const isFindPair = question?.type === QuestionTypeFindPairWord;
  const isBuildingWord = question?.type === QuestionTypeBuildingWord;
  const isChooseWord = question?.type === QuestionTypeChooseWord;

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + 20,
          backgroundColor: colors.color1
        }
      ]} >
      <View style={styles.header}>
        <LinearProgressBar
          close={navigation.goBack}
          current={currentIndex + 1}
          all={questions.length}
        />
        {IS_TIMER && mode === PracticeScreenMode.Testing && !(currentIndex + 1 > questions.length) &&
          <EducationPracticeTimer
            currentIndex={currentIndex}
            onTimerEnd={endTime}
            initial={TIMER_SPEED}
          />}
      </View>

      {/* Выбор символа (тестирование) */}
      {isChooseLetter && mode === PracticeScreenMode.Testing && <>
        <EducationPracticeShowSymbol symbol={question.symbol} subtext={question.kana} />
        <EducationPracticeSelectAnswers
          answers={question.answers}
          onCompleted={onSubmit}
          trueAnswer={question.trueAnswer}
          onError={onError}
        />
      </>}

      {/* Выбор пары (игра слов) */}
      {isFindPair && mode == PracticeScreenMode.WordGame &&
        <EducationPracticeFindPair
          pairs={question.pairs}
          answers={question.answers}
          onCompleted={(isError) => onSubmit(!isError)}
          title={question.title}
        />}

      {/* Составить слово из предложенных букв (игра слов) */}
      {isBuildingWord && mode == PracticeScreenMode.WordGame &&
        <EducationPracticeChooseLetters
          title={question.title}
          romanji={question.romanji}
          translate={question.translate}
          kana={question.kana}
          shuffle={question.shuffle}
          onFinish={(isError) => onSubmit(!isError)}
        />}

      {/* Составить слово из предложенных букв (игра слов) */}
      {isChooseWord && mode == PracticeScreenMode.WordGame &&
        <EducationPracticeChooseValue
          title={question.title}
          answers={question.questions}
          onCompleted={(isError) => onSubmit(!isError)}
          trueAnswer={question.trueKey}
        />}
    </View>
  );
}

export default EducationPractice;

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
