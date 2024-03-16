import { ILetter } from "../data/lettersTable";

import { CardMode, DifficultyLevelType, KanaAlphabet, PracticeScreenMode, TestMode } from "@/shared/constants/kana";
import { ResultInfo } from "@/widgets/education/education-practice/lib/context/education-statistic-context";

export type RootStackParamList = {
  Root: undefined;
  Home: undefined;
  Practice: { 
    keysCardModeState: CardMode[], 
    keysDifficultyLevelState: DifficultyLevelType[]
    timerDeration?: "fast" | "medium" | "slow"
   };
  EducationWordGame: {
    keysModeState: TestMode[],
  };
  LearningPage: undefined;
  DrawKana: { letter: ILetter, kana: KanaAlphabet };
  KanaInfo: { id: string, kana: KanaAlphabet }
  KanaSelect: undefined,
  ChooseAlphabet: { screen: "Learning" | "Practice" | "WordBuilding" };
  Results: { result: ResultInfo }
};
