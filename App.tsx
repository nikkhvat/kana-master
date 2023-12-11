import React, { createContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionics from "react-native-vector-icons/MaterialCommunityIcons";

import HomeScreen from "./pages/Home";
import LearnScreen from "./pages/Learn";
import SettingsScreen from "./pages/Settings";
import SettingsLearnScreen from "./pages/SettingsLearn";

import { RootStackParamList } from "./types";
import LearnResultsScreen from "./pages/LearnResults";

import { SafeAreaProvider } from "react-native-safe-area-context";
import Kana from "./pages/Kana";
import DrawScreen from "./pages/Draw/index";
import { useColorScheme } from "react-native";

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

          return <Ionics name={iconName} size={size} color={color} />;
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
          headerTitle: ""
        }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={SettingsScreen} 
        options={{
          headerTransparent: true, 
          headerTitle: ""
        }} 
      />
    </Tab.Navigator>
  );
}

const lightColors = {
  color1: "#FFFFFF",
  color2: "#ECECEC",
  color3: "#BDBDBD",
  color4: "#2A2A2A",
  color5: "#FFFFFF",
  second_color1: "#F4817D",
  second_color2: "#7ABC71",
  second_color3: "#9A7861",
  second_color4: "#F0EBE5",
  second_color5: "#F6BF6C",

  primary: "#9A7861",
  background: "#FFFFFF",
  card: "#FFFFFF",
  text: "#2A2A2A",
  border: "#ECECEC",
  notification: "red",
};

const darkColors = {
  color1: "#1F1F1F",
  color2: "#3A3A3A",
  color3: "#969696",
  color4: "#FFFFFF",
  color5: "#FFFFFF",
  second_color1: "#EF625D",
  second_color2: "#60BA53",
  second_color3: "#C08D6B",
  second_color4: "#393635",
  second_color5: "#F0B153",

  primary: "#9A7861",
  background: "#1F1F1F",
  card: "#1F1F1F",
  text: "#BDBDBD",
  text__gray: "#969696",
  text__active: "#FFFFFF",
  border: "#ECECEC",
  notification: "red",
};

export type Colors = typeof lightColors;

const App = () => {
  const scheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <NavigationContainer
        theme={
          scheme === "dark"
            ? { dark: true, colors: lightColors }
            : { dark: false, colors: darkColors }
        }
      >
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
            name="SettingsLearn"
            component={SettingsLearnScreen}
            options={{ title: "Start Learn" }}
          />
          <Stack.Screen
            name="Learn"
            component={LearnScreen}
            options={{ headerBackVisible: false, gestureEnabled: false }}
          />
          <Stack.Screen
            name="LearnResults"
            component={LearnResultsScreen}
            options={{
              headerBackVisible: false,
              gestureEnabled: false,
              title: "Results",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
