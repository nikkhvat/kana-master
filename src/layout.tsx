import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import { Appearance } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ThemeProvider } from "styled-components";

import { Word, words } from "./data/words";
import { findWordsFromArray } from "./helpers/word";

import { Theme } from "@/constants/profile";
import { useAppSelector } from "@/hooks/redux";
import ChooseAlphabet from "@/screens/ChooseAlphabet";
import DrawScreen from "@/screens/Draw/index";
import HomeScreen from "@/screens/Home";
import Kana from "@/screens/Kana";
import PracticeScreen from "@/screens/Practice";
import ResultsScreen from "@/screens/Results";
import SettingsScreen from "@/screens/Settings/Index";
import { RootState } from "@/store/store";
import { darkTheme } from "@/themes/dark";
import { lightTheme } from "@/themes/light";
import { RootStackParamList } from "@/types/navigationTypes";


const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {

  const characters: string[] = [
    "ア",
    "イ",
    "ウ",
    "エ",
    "オ",
    "カ",
    "キ",
    "ク",
    "ケ",
    "コ",
    "サ",
    "シ",
    "ス",
    "セ",
    "ソ",
    "あ",
    "い",
    "う",
    "え",
    "お",
    "か",
    "き",
    "く",
    "け",
    "こ",
    "さ",
  ];

  const matchingWords = findWordsFromArray(words, characters);
  console.log(matchingWords.length);


  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "home";

          if (route.name === "Learning") {
            iconName = focused ? "school-outline" : "school-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "account-outline" : "account-outline";
          } else if (route.name === "Kana") {
            iconName = focused ? "syllabary-hiragana" : "syllabary-hiragana";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Learning"
        component={HomeScreen}
        options={{
          title: "Learning",
          headerTransparent: true,
          headerTitle: "",
        }}
      />
      <Tab.Screen
        name="Kana"
        component={Kana}
        options={{
          title: "Kana",
          headerTransparent: true,
          headerTitle: "",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={SettingsScreen}
        options={{
          headerTransparent: true,
          headerTitle: "",
        }}
      />
    </Tab.Navigator>
  );
}

const Layout = () => {
  
  const themeFromStore = useAppSelector(
    (state: RootState) => state.profile.theme
    );
    
  const scheme =
    themeFromStore === Theme.Auto
      ? Appearance.getColorScheme()
      : themeFromStore === Theme.Dark
        ? "dark"
        : "light";

  const dark = { mode: "dark", colors: darkTheme };
  const light = { mode: "light", colors: lightTheme };

  const theme =
    themeFromStore === Theme.Auto
      ? scheme === "dark"
        ? dark
        : light
      : themeFromStore === Theme.Dark
        ? dark
        : light;

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle={scheme === "dark" ? "light-content" : "dark-content"}
      />
      <NavigationContainer
        theme={scheme === "dark" ? { dark: true, colors: darkTheme } : { dark: false, colors: lightTheme }} >
        <Stack.Navigator>
          <Stack.Screen
            name="Root"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DrawScreen"
            component={DrawScreen}
            options={{ title: "Start Learn" }}
          />
          <Stack.Screen
            name="ChooseAlphabet"
            component={ChooseAlphabet}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Practice"
            component={PracticeScreen}
            options={{
              title: "Learning",
              headerTransparent: true,
              gestureEnabled: false,
              headerTitle: "",
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="Results"
            component={ResultsScreen}
            options={{
              title: "Results",
              headerTransparent: true,
              gestureEnabled: false,
              headerTitle: "",
              headerBackVisible: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default Layout;
