import LearningList from "@/pages/education/learning/learning-list-page/learning-list-page";
import PracticeWelcomePage from "@/pages/education/practice/practice-welcome/practice-welcome";

import LessonPage from "@/pages/education/learning/lesson-page/lesson-page";
import EducationResultPage from "@/pages/education/practice/education-result-page/education-result-page";
import EducationWordGamePage from "@/pages/education/practice/education-quiz-word-game/index";
import TestingPage from "@/pages/education/practice/education-quiz-testing";
import KanaTableChoiceLettersPage from "@/pages/kana/kana-table-choice-letters-page/kana-table-choice-letters-page";

import { ScreenOptions } from "./types";
import { ROUTES } from "./navigationTypes";
import SettingsPage from "@/pages/settings/settings-page";
import KanaLetterPage from "@/pages/kana/kana-letter-page/kana-letter-page";
import KanaTableListPage from "@/pages/kana/kana-table-list-page/kana-table-list-page";

export const bottomScreens = [
  {
    name: ROUTES.KANA_TABLE_ROOT,
    component: KanaTableListPage,
    title: "tabs.kana",
  },
  {
    name: ROUTES.LEARNING_ROOT,
    component: LearningList,
    title: "tabs.learning",
  },
  {
    name: ROUTES.PRACTICE_ROOT,
    component: PracticeWelcomePage,
    title: "tabs.practice",
  },
  {
    name: ROUTES.SETTINGS_ROOT,
    component: SettingsPage,
    title: "tabs.profile",
  }
] as const

export const screens = [
  {
    name: ROUTES.PRACTICE_TESTING,
    component: TestingPage,
    options: {
      title: "Practice",
      headerTitle: "",
      headerTransparent: true,
      gestureEnabled: false,
      headerBackVisible: false
    }
  },
  {
    name: ROUTES.PRACTICE_WORD_GAME,
    component: EducationWordGamePage,
    options: {
      title: "Word Game",
      headerTitle: "",
      headerTransparent: true,
      gestureEnabled: false,
      headerBackVisible: false,
    }
  },
  {
    name: ROUTES.LESSON_PAGE,
    component: LessonPage,
    options: {
      headerTitle: "",
      headerTransparent: true,
      gestureEnabled: false,
      headerBackVisible: false,
    }
  },
  {
    name: ROUTES.RESULTS,
    component: EducationResultPage,
    options: {
      title: "Results",
      headerTitle: "",
      headerTransparent: true,
      gestureEnabled: false,
      headerBackVisible: false,
    }
  },
  {
    name: 'modals',
    children: [
      {
        name: ROUTES.KANA_INFO,
        component: KanaLetterPage,
        options: ({ route }: ScreenOptions) => ({
          title: route?.params?.title,
          contentStyle: {
            borderTopWidth: 0,
          },
        }),
      },
      {
        name: ROUTES.KANA_SELECT,
        component: KanaTableChoiceLettersPage,
        options: ({ route }: ScreenOptions) => ({
          title: route?.params?.title,
          contentStyle: {
            borderTopWidth: 0,
          },
        }),
      }
    ],
    options: {
      presentation: "modal",
      orientation: "portrait_up",
    }
  }
] as const
