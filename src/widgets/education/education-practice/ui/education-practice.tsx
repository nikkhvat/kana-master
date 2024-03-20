import React, { useEffect } from "react";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useKeepAwake } from "expo-keep-awake";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useEducationPracticeContext } from "../lib/context/education-practice-context";
import { useEducationStatisticContext } from "../lib/context/education-statistic-context";

import { RootState } from "@/app/store";
import EducationPracticeSelectAnswers from "@/entities/education/education-practice-select-answers/education-practice-select-answers";
import EducationPracticeTimer from "@/entities/education/education-practice-timer/education-practice-timer";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { countAvailableWords } from "@/pages/education/kana-quick-selection/model/slice";
import { recalculate } from "@/pages/kana/kana-list/model/slice";
import { CardMode, DifficultyLevelType } from "@/shared/constants/kana";
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

  const {
    keysCardModeState,
    timerDeration,
    keysDifficultyLevelState,
  } = route.params;

  const IS_TIMER = keysDifficultyLevelState.includes(DifficultyLevelType.TimeTest);
  const ONE_ATTEMPT = keysDifficultyLevelState.includes(DifficultyLevelType.OneAttempt);

  const TIMER_SPEED = timerDeration === "fast" ? 3 : timerDeration === "slow" ? 7 : 5;

  const { init, submit, questions, currentIndex, generateQuestions } = useEducationPracticeContext();

  const { init: initStat, pickAnswer, getResult } = useEducationStatisticContext();

  useEffect(() => {
    const generateQuestion = generateQuestions({
      selectedLetters,
      keysCardModeState,
    });

    init(generateQuestion);
    initStat();

    return () => { };
  }, []);

  // Вызываеться после ответа на вопрос
  const finishCallback = (onFinishPractice: boolean) => {
    if (onFinishPractice) {
      const result = getResult();

      dispatch(recalculate({
        data: result.incorrect.map(item => {
          const isChapterHiragana = item.mode === CardMode.hiraganaToKatakana || item.mode === CardMode.hiraganaToRomaji || item.mode === CardMode.romajiToHiragana;
          return {
            chapter: isChapterHiragana ? "hiragana" : "katakana",
            id: item.letter.id,
            isCorrect: false,
          };
        })
      }));
      
      dispatch(recalculate({
        data: result.correct.map(item => {
          const isChapterHiragana = item.mode === CardMode.hiraganaToKatakana || item.mode === CardMode.hiraganaToRomaji || item.mode === CardMode.romajiToHiragana;
          return {
            chapter: isChapterHiragana ? "hiragana" : "katakana",
            id: item.letter.id,
            isCorrect: true,
          };
        })
      }));

      navigation.navigate("Results", { result });
    }
  };

  const onSubmit = (trueAnswer: boolean) => submit(trueAnswer, finishCallback);
  const onError = () => {
    if (ONE_ATTEMPT) {
      onSubmitTestQuestion(false, question.symbol);
    }
  };

  const endTime = () => onSubmitTestQuestion(false);

  const onSubmitTestQuestion = (correctAnswer: boolean, pickedAnswer?: ILetter) => {
    onSubmit(correctAnswer);
    if (currentIndex + 1 !== questions.length) {
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
        {IS_TIMER &&
          <EducationPracticeTimer
            currentIndex={currentIndex}
            onTimerEnd={endTime}
            initial={TIMER_SPEED}
          />}
      </View>

      <EducationPracticeSelectAnswers
        question={question}
        onCompleted={onSubmitTestQuestion}
        onError={onError}
      />
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
