import { AutoLesson, ManuallyLesson } from "../shared/constants/lessons";

import { ResultInfoWordGame } from "@/pages/education/practice/education-quiz-word-game/lib/context/education-statistic-context";
import { ResultInfo } from "@/pages/education/practice/education-quiz-testing/lib/context/education-statistic-context";
import { CardMode, DifficultyLevelType, KanaAlphabet, TestMode } from "@/shared/constants/kana";

export const ROUTES = {
  ROOT: 'Root',

  // Info kana and draw kana
  KANA_INFO: 'KanaInfo',

  // Select alphabet
  KANA_SELECT: 'KanaSelect',
  
  // Lesson page
  LESSON_PAGE: 'LessonPage',
  
  // practice (2 variants)
  PRACTICE_WORD_GAME: 'EducationWordGame',
  PRACTICE_TESTING: 'EducationPractice',
  
  // results of practice
  RESULTS: 'Results',
  
  // bottom tab navigator
  PRACTICE_ROOT: 'Practice',
  LEARNING_ROOT: 'Learning',
  SETTINGS_ROOT: 'Settings',
  KANA_TABLE_ROOT: 'KanaTable',
} as const;


export type RootStackParamList = {
  [ROUTES.ROOT]: undefined;
  
  // Info kana and draw kana
  [ROUTES.KANA_INFO]: {
    id: string,
    kana: KanaAlphabet,
    title: string
  }

  // Select alphabet
  [ROUTES.KANA_SELECT]: {
    title: string
  },

  // Lesson page
  [ROUTES.LESSON_PAGE]: { lesson: AutoLesson | ManuallyLesson }
  // practice (2 variants)
  [ROUTES.PRACTICE_WORD_GAME]: {
    keysModeState: TestMode[],
  };
  [ROUTES.PRACTICE_TESTING]: { 
    keysCardModeState: CardMode[], 
    keysDifficultyLevelState: DifficultyLevelType[]
    timerDeration?: "fast" | "medium" | "slow"
  };

  // results of practice
  [ROUTES.RESULTS]: { result: ResultInfo | ResultInfoWordGame }

  // bottom tab navigator
  [ROUTES.PRACTICE_ROOT]: undefined,
  [ROUTES.LEARNING_ROOT]: undefined;
  [ROUTES.SETTINGS_ROOT]: undefined;
  [ROUTES.KANA_TABLE_ROOT]: undefined;
};
