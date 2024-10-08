import React, { useCallback, useEffect, useState } from "react";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as NavigationBar from "expo-navigation-bar";
import * as SystemUI from "expo-system-ui";
import { useTranslation } from "react-i18next";
import { Platform, Pressable, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import LessonPage from "@/pages/education/learning/lesson";
import LearningList from "@/pages/education/learning/list/learning-list";
import EducationResultPage from "@/pages/education/practice/education-result/education-result";
import EducationWordGamePage from "@/pages/education/practice/education-word-game/index";
import PracticeWelcomePage from "@/pages/education/practice/practice-welcome/practice-welcome";
import TestingPage from "@/pages/education/practice/testing";
import KanaInfo from "@/pages/kana/kana-info/ui";
import Kana from "@/pages/kana/kana-list/ui/kana-list";
import EducationKanaQuickSelectionPage from "@/pages/kana/kana-quick-selection/kana-quick-selection";
import EducationKanaSelection from "@/pages/kana/kana-select/ui";
import ProfilePage from "@/pages/profile/profile";
import { darkTheme } from "@/shared/themes/dark";
import { lightTheme } from "@/shared/themes/light";
import { RootStackParamList } from "@/shared/types/navigationTypes";

import * as SplashScreen from "expo-splash-screen";
import { TEST_DELAY } from "@/shared/constants/kana";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const headerSettings = {
  headerTitle: "",
  headerTransparent: true,
  gestureEnabled: false,
  headerBackVisible: false,
};

type Icons = {
  Learning: "school-outline";
  Practice: "cards-outline";
  Settings: "cog-outline";
  Kana: "syllabary-hiragana";
};

const icons: Icons = {
  Learning: "school-outline",
  Practice: "cards-outline",
  Settings: "cog-outline",
  Kana: "syllabary-hiragana",
};

type KeysIcon = "Learning" | "Settings" | "Kana";

SplashScreen.preventAutoHideAsync();

function BottomTabNavigator() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  useEffect(() => {
    setTimeout(() => {
      setAppIsReady(true);
    }, TEST_DELAY * 2);
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => (
          <Icon
            name={icons[route.name as KeysIcon]}
            size={size}
            color={color}
          />
        ),
        tabBarButton: (props) => (
          <Pressable
            {...props}
            style={[props.style, { height: 45, marginTop: 5 }]}
          />
        ),
        tabBarStyle: {
          height: 60 + insets.bottom,
          flexDirection: "column",
          alignItems: "center",
        },
      })}
    >
      <Tab.Screen
        name="Learning"
        component={LearningList}
        options={{
          title: t("tabs.learning"),
          headerTransparent: true,
          headerTitle: "",
        }}
      />
      <Tab.Screen
        name="Practice"
        component={PracticeWelcomePage}
        options={{
          title: t("tabs.practice"),
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
          lazy: true,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={ProfilePage}
        options={{
          title: t("tabs.profile"),
          headerTransparent: true,
          headerTitle: "",
        }}
      />
    </Tab.Navigator>
  );
}

const Layout = () => {
  const { colors } = useThemeContext();
  const { i18n } = useTranslation();

  useEffect(() => {
    const loadLang = async () => {
      try {
        const savedLang = await AsyncStorage.getItem("lang");
        if (savedLang) {
          i18n.changeLanguage(savedLang);
        }
      } catch (error) {
        return error;
      }
    };

    loadLang();
  }, [i18n]);

  if (Platform.OS === "android") {
    SystemUI.setBackgroundColorAsync(colors.background);
    NavigationBar.setBackgroundColorAsync(colors.background);
  }

  return (
    <>
      <StatusBar
        barStyle={colors._theme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colors.color1}
      />
      <NavigationContainer
        theme={
          colors._theme === "dark"
            ? { dark: true, colors: darkTheme }
            : { dark: false, colors: lightTheme }
        }
      >
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
            name="EducationPractice"
            component={TestingPage}
            options={{ title: "Practice", ...headerSettings }}
          />
          <Stack.Screen
            name="EducationWordGame"
            component={EducationWordGamePage}
            options={{ title: "Word Game", ...headerSettings }}
          />
          <Stack.Screen
            name="LessonPage"
            component={LessonPage}
            options={{ ...headerSettings }}
          />
          <Stack.Screen
            name="Results"
            component={EducationResultPage}
            options={{ title: "Results", ...headerSettings }}
          />
          <Stack.Group
            screenOptions={{
              presentation: "modal",
              orientation: "portrait",
            }}
          >
            <Stack.Screen
              name="KanaInfo"
              component={KanaInfo}
              options={({ route }) => ({
                title: route.params.title,
                contentStyle: {
                  borderTopWidth: 0,
                },
              })}
            />
            <Stack.Screen
              name="KanaSelect"
              component={EducationKanaSelection}
              options={({ route }) => ({
                title: route.params.title,
                contentStyle: {
                  borderTopWidth: 0,
                },
              })}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Layout;
