import { CardMode, DifficultyLevelType, PracticeScreenMode, TestMode } from "./shared/constants/test";
import { ILetter } from "./utils/letters";

interface IStat {
  testDuration: number
  correctAnswers: number
  incorrectAnswers: number
  fastestAnswer: {
    time: number;
    letter: ILetter | null;
  }
  slowestAnswer: {
    time: number;
    letter: ILetter | null;
  }
  averageTime: number
  incorrectLetters: ILetter[]
}

export type RootStackParamList = {
  Root: undefined;
  Home: undefined;
  Practice: { 
    keysCardModeState: CardMode[], 
    keysModeState: TestMode[], 
    keysDifficultyLevelState: DifficultyLevelType[]
    mode: PracticeScreenMode.Testing | PracticeScreenMode.WordGame
   };
  Results: { stat: IStat, kata: "hi" | "ka" };
  DrawScreen: { letter: ILetter };
};
