import { ILetter } from "../data/lettersTable";

import { CardMode, DifficultyLevelType, KanaAlphabet, PracticeScreenMode, TestMode } from "@/shared/constants/kana";
import { ResultInfo } from "@/widgets/education/education-practice/lib/context/education-statistic-context";

export type RootStackParamList = {
  Root: undefined;
  Home: undefined;
  Practice: { 
    keysCardModeState: CardMode[], 
    keysModeState: TestMode[], 
    keysDifficultyLevelState: DifficultyLevelType[]
    mode: PracticeScreenMode.Testing | PracticeScreenMode.WordGame
    timerDeration?: "fast" | "medium" | "slow"
   };
  LearningPage: undefined;
  DrawKana: { letter: ILetter, kana: KanaAlphabet };
  KanaInfo: { id: string, kana: KanaAlphabet }
  KanaSelect: undefined,
  ChooseAlphabet: { screen: "Learning" | "Practice" | "WordBuilding" };
  Results: { result: ResultInfo }
};
