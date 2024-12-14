import React from "react";

import LearningList from "@/pages/education/learning/learning-list-page/learning-list-page";
import PracticeWelcomePage from "@/pages/education/practice/practice-welcome/practice-welcome";

import LessonPage from "@/pages/education/learning/lesson-page/lesson-page";
import EducationResultPage from "@/pages/education/practice/education-result-page/education-result-page";
import EducationWordGamePage from "@/pages/education/practice/education-quiz-word-game/index";
import TestingPage from "@/pages/education/practice/education-quiz-testing";
import KanaTableChoiceLettersPage from "@/pages/kana/kana-table-choice-letters-page/kana-table-choice-letters-page";

import SettingsPage from "@/pages/settings/settings-page";
import KanaLetterPage from "@/pages/kana/kana-letter-page/kana-letter-page";
import KanaTableListPage from "@/pages/kana/kana-table-list-page/kana-table-list-page";

import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createBottomTabNavigator, TransitionPresets } from '@react-navigation/bottom-tabs';
import { TabBarButton } from "./BottomTabNavigator";
import PageTitle from "@/shared/ui/page-title/page-title";
import { ROUTES } from "./navigationTypes";
import { isAndroid } from "@/shared/constants/platformUtil";

export const BottomTabs = createBottomTabNavigator({
  tabBar: (props) => <TabBarButton {...props} />,
  screens: {
    [ROUTES.KANA_TABLE_ROOT]: KanaTableListPage,
    [ROUTES.LEARNING_ROOT]: LearningList,
    [ROUTES.PRACTICE_ROOT]: PracticeWelcomePage,
    [ROUTES.SETTINGS_ROOT]: SettingsPage,
  },
  screenOptions: {
    header: (props) => <PageTitle isSaveArea isKey>{props.route.name}</PageTitle>,
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    [ROUTES.HOME]: {
      screen: BottomTabs,
      options: {
        headerShown: false,
      },
    },

    [ROUTES.PRACTICE_TESTING]: TestingPage,
    [ROUTES.PRACTICE_WORD_GAME]: EducationWordGamePage,
    [ROUTES.LESSON_PAGE]: LessonPage,
    [ROUTES.RESULTS]: EducationResultPage,

    [ROUTES.KANA_INFO]: KanaLetterPage,
    [ROUTES.KANA_SELECT]: KanaTableChoiceLettersPage,
  },
});

export const RootNavigation = createStaticNavigation(RootStack);