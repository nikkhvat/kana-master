import { ILetter } from "./utils/letters";

export type RootStackParamList = {
  Root: undefined;
  Home: undefined;
  SettingsLearn: { letters: ILetter[]; kata: "hi" | "ka" };
  Learn: { letters: ILetter[]; kata: "hi" | "ka", mode: 1 | 0, isTime: 1 | 0 };
  LearnResults: undefined;
};
