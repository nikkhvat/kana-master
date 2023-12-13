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
  SettingsLearn: { letters: ILetter[]; kata: "hi" | "ka" };
  Practice: { 
    keysCardModeState: CardMode[], 
    keysModeState: TestMode[], 
    keysDifficultyLevelState: DifficultyLevelType[]
    mode: PracticeScreenMode.Testing | PracticeScreenMode.WordGame
   };
  LearnResults: { stat: IStat, kata: "hi" | "ka" };
  DrawScreen: { letter: ILetter };
};
