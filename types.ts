import { Stats } from "./pages/Practice/useStats";
import { CardMode, DifficultyLevelType, PracticeScreenMode, TestMode } from "./shared/constants/test";
import { ILetter } from "./utils/letters";

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
