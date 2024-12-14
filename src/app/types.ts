/* eslint-disable @typescript-eslint/no-explicit-any */
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/app/navigationTypes";

export type ScreenOptions = {
  route: RouteProp<RootStackParamList, any>;
  navigation: any;
}

export interface ScreenItem {
  name: keyof RootStackParamList,
  component: any,
  options: NativeStackNavigationOptions | ((props: {
    route: RouteProp<RootStackParamList, keyof RootStackParamList>;
    navigation: any;
  }) => NativeStackNavigationOptions) | undefined,
}

export interface ScreensArray {
  children: ScreenItem[]
  options: any
}