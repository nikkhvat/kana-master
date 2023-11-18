import { ILetter } from "./utils/letters";

export type RootStackParamList = {
  Home: undefined;
  Learn: { letters: ILetter[]; kata: "hi" | "ka" };
};
