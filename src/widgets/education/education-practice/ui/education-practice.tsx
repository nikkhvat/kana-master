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
import EducationPracticeSelectAnswers from "@/entities/education/education-practice-select-answers/education-practice-select-answers";
import EducationPracticeTimer from "@/entities/education/education-practice-timer/education-practice-timer";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { countAvailableWords } from "@/pages/education/kana-quick-selection/model/slice";
import { DifficultyLevelType, PracticeScreenMode, QuestionTypeBuildingWord, QuestionTypeChooseLetter, QuestionTypeChooseWord, QuestionTypeFindPairWord } from "@/shared/constants/kana";
import { ILetter } from "@/shared/data/lettersTable";
import { useAppDispatch, useAppSelector } from "@/shared/model/hooks";
import { RootStackParamList } from "@/shared/types/navigationTypes";
import LinearProgressBar from "@/shared/ui/progressbar/linear/linear-progress-bar";

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

  const { init, submit, questions, currentIndex, generateQuestions } = useEducationPracticeContext();

  const { init: initStat, pickAnswer, getResult } = useEducationStatisticContext();

  useEffect(() => {
    const generateQuestion = generateQuestions({
      mode,
      selectedLetters,
      selectedWords,
      keysCardModeState,
      keysModeState,
    });

    init(generateQuestion);
    initStat();

    return () => {};
  }, []);

  // Вызываеться после ответа на вопрос
  const finishCallback = (onFinishPractice: boolean, trueAnswer: boolean) => {
    if (onFinishPractice) {
      const result = getResult();
      navigation.navigate("Results", { result });
    }
  };

  const onSubmit = (trueAnswer: boolean) => submit(trueAnswer, finishCallback);
  const onError = () => {
    if (ONE_ATTEMPT) {
      if (isChooseLetter && mode === PracticeScreenMode.Testing) {
        onSubmitTestQuestion(false);
      } else {
        onSubmit(false);
      }
    }
  };

  const endTime = () => onSubmitTestQuestion(false);

  const onSubmitTestQuestion = (correctAnswer: boolean, pickedAnswer?: ILetter) => {
    if (isChooseLetter && mode === PracticeScreenMode.Testing) {
      onSubmit(correctAnswer);
  
      pickAnswer({
        correctAnswer: correctAnswer,
        kana: question.kana,
        question: question.symbol,
        last: currentIndex === questions.length - 1,
        pickedAnswer,
        mode: question.mode,
      });
    }
  };

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
        <EducationPracticeSelectAnswers
          question={question}
          onCompleted={onSubmitTestQuestion}
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
