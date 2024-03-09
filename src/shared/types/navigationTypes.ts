import { ILetter } from "../data/lettersTable";

import { Stats } from "@/hooks/useStats";
import { CardMode, DifficultyLevelType, KanaAlphabet, PracticeScreenMode, TestMode } from "@/shared/constants/kana";


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
  DrawKana: {
    letter: ILetter
    kana: KanaAlphabet
  };
  KanaInfo: {
    id: string
    kana: KanaAlphabet
  }
  ChooseAlphabet: {
    screen: "Learning" | "Practice" | "WordBuilding"
  };
  Results: { stats: Stats };
};
