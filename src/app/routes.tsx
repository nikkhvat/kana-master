import Kana from "@/pages/kana/kana-list/ui/kana-list";
import LearningList from "@/pages/education/learning/list/learning-list";
import PracticeWelcomePage from "@/pages/education/practice/practice-welcome/practice-welcome";
import ProfilePage from "@/pages/profile/profile";

import LessonPage from "@/pages/education/learning/lesson";
import EducationResultPage from "@/pages/education/practice/education-result/education-result";
import EducationWordGamePage from "@/pages/education/practice/education-quiz-word-game/index";
import TestingPage from "@/pages/education/practice/education-quiz-testing";
import KanaInfo from "@/pages/kana/kana-info/ui";
import EducationKanaSelection from "@/pages/kana/kana-select/ui";

import { ScreenOptions } from "./types";
import { ROUTES } from "./navigationTypes";

export const bottomScreens = [
  {
    name: ROUTES.KANA_TABLE_ROOT,
    component: Kana,
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
    component: ProfilePage,
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
        component: KanaInfo,
        options: ({ route }: ScreenOptions) => ({
          title: route?.params?.title,
          contentStyle: {
            borderTopWidth: 0,
          },
        }),
      },
      {
        name: ROUTES.KANA_SELECT,
        component: EducationKanaSelection,
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
      orientation: "portrait",
    }
  }
] as const
