import { ILetter } from "../data/lettersTable";

import { ResultInfoWordGame } from "@/pages/education/practice/education-word-game/lib/context/education-statistic-context";
import { ResultInfo } from "@/pages/education/practice/testing/lib/context/education-statistic-context";
import { CardMode, DifficultyLevelType, KanaAlphabet, TestMode } from "@/shared/constants/kana";

export type RootStackParamList = {
  Root: undefined;
  Home: undefined;
  EducationPractice: { 
    keysCardModeState: CardMode[], 
    keysDifficultyLevelState: DifficultyLevelType[]
    timerDeration?: "fast" | "medium" | "slow"
   };
  Practice: undefined,
  EducationWordGame: {
    keysModeState: TestMode[],
  };
  LearningPage: undefined;
  LessonPage: {
    title: ILetter
    letters: ILetter[]
    msg: string
  };
  DrawKana: { letter: ILetter, kana: KanaAlphabet };
  Lesson: { symbols: ILetter[], kana: KanaAlphabet };
  KanaInfo: { 
    id: string,
    kana: KanaAlphabet,
    title: string
  }
  KanaSelect: {
    title: string
  },
  ChooseAlphabet: { screen: "Practice" | "WordBuilding" };
  Results: { result: ResultInfo | ResultInfoWordGame }
};
