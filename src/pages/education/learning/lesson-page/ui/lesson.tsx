import React, { useEffect } from "react";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StyleSheet, View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { completeLesson } from "../../model/slice";
import { useEducationLessonContext } from "../lib/context/education-lesson-context";

import SafeLayout from "@/app/layouts/safeLayout";
import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { KanaAlphabet } from "@/shared/constants/kana";
import {
  AnyLesson,
  AutoLesson,
  InfoLessonScreen,
  LessonScreen,
  ManuallyLesson,
} from "@/shared/constants/lessons";
import { useAppDispatch } from "@/shared/model/hooks";
import { RootStackParamList } from "@/app/navigationTypes";
import LinearProgressBar from "@/shared/ui/progressbar/linear/linear-progress-bar";
import BuildWordScreen from "@/widgets/learning/lesson/build-word-screen/build-word-screen";
import LessonDrawScreen from "@/widgets/learning/lesson/draw/draw";
import FinishScreen from "@/widgets/learning/lesson/finish-screen/finish-screen";
import InfoScreen from "@/widgets/learning/lesson/info-screen/info-screen";
import MatchLettersScreen from "@/widgets/learning/lesson/match-letters/match-letters";
import SelectLettersScreen from "@/widgets/learning/lesson/select-letters/select-letters";
import SelectSequenceLettersScreen from "@/widgets/learning/lesson/select-sequence-letters/select-sequence-letters";
import LessonSymbolScreen from "@/widgets/learning/lesson/symbol/symbol";
import { ROUTES } from "@/app/navigationTypes";

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  typeof ROUTES.LESSON_PAGE
>;
type LearnScreenRouteProp = RouteProp<RootStackParamList, typeof ROUTES.LESSON_PAGE>;

interface LearnScreenProps {
  route: LearnScreenRouteProp;
  navigation: HomeScreenNavigationProp;
}

const Lesson: React.FC<LearnScreenProps> = ({ route, navigation }) => {
  const insets = useSafeAreaInsets();

  const isAutoLesson = (
    item: AutoLesson | ManuallyLesson,
  ): item is AutoLesson => "letters" in item;

  const isManuallyLesson = (
    item: AutoLesson | ManuallyLesson,
  ): item is ManuallyLesson => "screens" in item;

  const isInfoLessonScreen = (
    item: AnyLesson | InfoLessonScreen | null | undefined,
  ): item is InfoLessonScreen =>
    item !== null && typeof item === "object" && !("name" in item);

  const isAnyLessonScreen = (
    item: AnyLesson | InfoLessonScreen | null | undefined,
  ): item is AnyLesson =>
    item !== null && typeof item === "object" && "name" in item;

  const { lesson } = route.params;

  const id = lesson.id;

  const dispatch = useAppDispatch();

  const { colors } = useThemeContext();

  const { init, currentScreen, screen, lessonScreens, next, retry } =
    useEducationLessonContext();

  const addMarkCompleteLessonInStore = () => {
    if (isAutoLesson(lesson)) {
      const key = lesson.kana === KanaAlphabet.Hiragana ? "hi" : "ka";
      dispatch(completeLesson(`${key}/${id}`));
    }

    if (isManuallyLesson(lesson)) {
      const category = lesson.category;

      if (category?.length === 2) {
        dispatch(completeLesson(id));
      } else {
        if (category.includes(KanaAlphabet.Hiragana)) {
          dispatch(completeLesson(`hi/${id}`));
        }

        if (category.includes(KanaAlphabet.Katakana)) {
          dispatch(completeLesson(`ka/${id}`));
        }
      }
    }
  };

  const onComplete = () => {
    addMarkCompleteLessonInStore();
    navigation.goBack();
  };

  const onRetry = () => {
    addMarkCompleteLessonInStore();

    if (isAutoLesson(lesson)) {
      init(lesson.letters, "auto", []);
    }

    if (isManuallyLesson(lesson)) {
      init([], "manually", lesson.screens as InfoLessonScreen[]);
    }

    retry();
  };

  useEffect(() => {
    if (isAutoLesson(lesson)) {
      init(lesson.letters, "auto", []);
    }

    if (isManuallyLesson(lesson)) {
      init([], "manually", lesson.screens as InfoLessonScreen[]);
    }
  }, []);

  const isAnyScreen =
    currentScreen !== null && isAnyLessonScreen(currentScreen);

  return (
    <SafeLayout
      additionalPaddingTop={20}
      disableLeft
      disableRight
      style={[
        styles.container,
        {
          flex: 1,
        },
      ]}
    >
      <View
        style={{
          paddingLeft: insets.left + 20,
          paddingRight: insets.right + 20,
        }}
      >
        {(isManuallyLesson(lesson)
          ? true
          : screen + 1 !== lessonScreens.length) && (
          <LinearProgressBar
            close={navigation.goBack}
            current={screen}
            all={lessonScreens.length}
          />
        )}
      </View>
      {isAutoLesson(lesson) &&
        isAnyScreen &&
        currentScreen?.name !== LessonScreen.Finish && (
          <View
            style={[
              styles.container,
              {
                paddingLeft: insets.left + 20,
                paddingRight: insets.right + 20,
              },
            ]}
          >
            {isAnyScreen && currentScreen?.name === LessonScreen.Symbol && (
              <LessonSymbolScreen
                name={LessonScreen.Symbol}
                symbol={currentScreen.symbol}
                kana={lesson.kana || KanaAlphabet.Hiragana}
                next={next}
                key={screen}
              />
            )}

            {isAnyScreen && currentScreen?.name === LessonScreen.Draw && (
              <LessonDrawScreen
                name={LessonScreen.Draw}
                symbol={currentScreen.symbol}
                kana={lesson.kana || KanaAlphabet.Hiragana}
                next={next}
                key={screen}
              />
            )}

            {isAnyScreen &&
              currentScreen?.name === LessonScreen.MatchSymbols && (
                <MatchLettersScreen
                  name={LessonScreen.MatchSymbols}
                  symbols={currentScreen.symbols}
                  kana={lesson.kana || KanaAlphabet.Hiragana}
                  next={next}
                  key={screen}
                />
              )}

            {isAnyScreen &&
              currentScreen?.name === LessonScreen.SelectSymbol && (
                <SelectLettersScreen
                  name={LessonScreen.SelectSymbol}
                  symbols={currentScreen.symbols}
                  kana={lesson.kana || KanaAlphabet.Hiragana}
                  next={next}
                  key={screen}
                />
              )}

            {isAnyScreen &&
              currentScreen?.name === LessonScreen.SelectSequenceLetters && (
                <SelectSequenceLettersScreen
                  name={LessonScreen.SelectSequenceLetters}
                  sequence={currentScreen.sequence}
                  kana={lesson.kana || KanaAlphabet.Hiragana}
                  next={next}
                  key={screen}
                />
              )}

            {isAnyScreen && currentScreen?.name === LessonScreen.BuildWord && (
              <BuildWordScreen
                name={LessonScreen.BuildWord}
                sequence={currentScreen.sequence}
                kana={lesson.kana || KanaAlphabet.Hiragana}
                next={next}
                key={screen}
              />
            )}
          </View>
        )}

      {(isAutoLesson(lesson) || isManuallyLesson(lesson)) &&
        currentScreen !== null &&
        isAnyLessonScreen(currentScreen) &&
        currentScreen?.name === LessonScreen.Finish && (
          <View
            style={[
              styles.container,
              {
                paddingLeft: insets.left + 20,
                paddingRight: insets.right + 20,
              },
            ]}
          >
            <FinishScreen
              name={LessonScreen.Finish}
              next={onComplete}
              retry={onRetry}
            />
          </View>
        )}

      {isManuallyLesson(lesson) && !isAnyLessonScreen(currentScreen) && (
        <View style={styles.container}>
          {currentScreen !== null && isInfoLessonScreen(currentScreen) && (
            <InfoScreen
              next={next}
              finish={onComplete}
              title={currentScreen.title}
              blocks={currentScreen.blocks}
              isLast={screen + 1 === lessonScreens.length}
            />
          )}
        </View>
      )}
    </SafeLayout>
  );
};

export default Lesson;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
