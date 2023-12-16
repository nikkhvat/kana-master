import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import HomeScreen from "./pages/Home";
import PracticeScreen from "./pages/Practice";
import SettingsScreen from "./pages/Settings/Index";

import { RootStackParamList } from "./types";

import { SafeAreaProvider } from "react-native-safe-area-context";
import Kana from "./pages/Kana";
import DrawScreen from "./pages/Draw/index";

import { Appearance } from "react-native";

import { ThemeProvider } from "styled-components";
import { darkTheme } from "./themes/dark";
import { lightTheme } from "./themes/light";
import ResultsScreen from "./pages/Results";
import ChooseAlphabet from "./pages/ChooseAlphabet";

import { RootState } from "./shared/store/store";
import { useAppSelector } from "./shared/store/hooks";
import { Theme } from "./shared/constants/profile";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
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

export type Colors = typeof lightTheme;

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
      <SafeAreaProvider>
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
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default Layout;
