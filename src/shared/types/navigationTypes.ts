import { ILetter } from "../data/lettersTable";

import { CardMode, DifficultyLevelType, KanaAlphabet, PracticeScreenMode, TestMode } from "@/shared/constants/kana";
import { Stats } from "@/widgets/education/education-practice/lib/context/useStats";


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
  Results: { stats: Stats };
};
