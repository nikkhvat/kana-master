import { CardMode, DifficultyLevelType, PracticeScreenMode, TestMode } from "@/constants/kana";
import { ILetter } from "@/data/lettersTable";
import { Stats } from "@/screens/Practice/hooks/useStats";

export type RootStackParamList = {
  Root: undefined;
  Home: undefined;
  Practice: { 
    keysCardModeState: CardMode[], 
    keysModeState: TestMode[], 
    keysDifficultyLevelState: DifficultyLevelType[]
    mode: PracticeScreenMode.Testing | PracticeScreenMode.WordGame
   };
  ChooseAlphabet: undefined;
  Results: { stats: Stats };
  DrawScreen: { letter: ILetter };
};
