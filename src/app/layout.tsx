import React, { useEffect, useState } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { StatusBar } from "react-native";
import { Appearance } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ThemeProvider } from "styled-components";


import { useAppSelector } from "@/hooks/redux";
import EducationKanaQuickSelectionPage from "@/pages/education/education-kana-quick-selection/education-kana-quick-selection";
import EducationPracticePage from "@/pages/education/education-practice/education-practice";
import EducationResultPage from "@/pages/education/education-result/education-result";
import EducationWelcome from "@/pages/education/education-welcome/education-welcome";
import Kana from "@/pages/kana/kana";
import ProfilePage from "@/pages/profile/profile";
import { Theme } from "@/shared/constants/profile";
import { darkTheme } from "@/shared/themes/dark";
import { lightTheme } from "@/shared/themes/light";
import { RootStackParamList } from "@/shared/types/navigationTypes";
import { RootState } from "@/store/store";


const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  const { t } = useTranslation();

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
        component={EducationWelcome}
        options={{
          title: t("tabs.learning"),
          headerTransparent: true,
          headerTitle: "",
        }}
      />
      <Tab.Screen
        name="Kana"
        component={Kana}
        options={{
          title: t("tabs.kana"),
          headerTransparent: true,
          headerTitle: "",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          title: t("tabs.profile"),
          headerTransparent: true,
          headerTitle: "",
        }} />
    </Tab.Navigator>
  );
}

const Layout = () => {
  const { i18n } = useTranslation();

  const lang = useAppSelector((state: RootState) => state.profile.language);
  const themeFromStore = useAppSelector((state: RootState) => state.profile.theme);

  const scheme =
    themeFromStore === Theme.Auto
      ? Appearance.getColorScheme()
      : themeFromStore === Theme.Dark
        ? "dark"
        : "light";

  const [themeApp, setThemeApp] = useState(scheme);

  useEffect(() => {
    const setTheme = async () => {
      setThemeApp(themeFromStore === Theme.Auto
        ? Appearance.getColorScheme()
        : themeFromStore === Theme.Dark
          ? "dark"
          : "light");
    };

    setTheme();
  }, [themeFromStore]);

  useEffect(() => {
    const changeLang = async () => i18n.changeLanguage(lang);
    changeLang();
  }, [i18n, lang]);
    
  const dark = { mode: "dark", colors: darkTheme };
  const light = { mode: "light", colors: lightTheme };

  return (
    <ThemeProvider theme={themeApp === "dark" ? dark : light}>
      <StatusBar
        barStyle={themeApp === "dark" ? "light-content" : "dark-content"}
      />
      <NavigationContainer
        theme={themeApp === "dark" ? { dark: true, colors: darkTheme } : { dark: false, colors: lightTheme }} >
        <Stack.Navigator>
          <Stack.Screen
            name="Root"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ChooseAlphabet"
            component={EducationKanaQuickSelectionPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Practice"
            component={EducationPracticePage}
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
            component={EducationResultPage}
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