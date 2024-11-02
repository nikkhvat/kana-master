import React, { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as NavigationBar from "expo-navigation-bar";
import * as SystemUI from "expo-system-ui";
import { useTranslation } from "react-i18next";
import { Platform, StatusBar } from "react-native";

import { useThemeContext } from "@/features/settings/settings-theme/theme-context";
import { darkTheme } from "@/shared/themes/dark";
import { lightTheme } from "@/shared/themes/light";
import { RootStackParamList, ROUTES } from "@/app/navigationTypes";

import * as SplashScreen from 'expo-splash-screen';
import BottomTabNavigator from "./BottomTabNavigator";
import { screens } from "./routes";
import { ScreenItem, ScreensArray } from "./types";
import { loadFonts } from "@/shared/fonts/load-fonts";

const Stack = createNativeStackNavigator<RootStackParamList>();

SplashScreen.preventAutoHideAsync();

const Layout = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  const { colors } = useThemeContext();
  const { i18n } = useTranslation();

  useEffect(() => {
    loadFonts({
      successful: async () => {
        await new Promise(resolve => setTimeout(resolve, 100))
      },
      error: (e) => {
        console.warn(e)
      },
      finallyCallback: async () => {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      },
    });
  }, []);

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
    SystemUI.setBackgroundColorAsync(colors.BgPrimary);
    NavigationBar.setBackgroundColorAsync(colors.BgPrimary);
  }

  function instanceOfScreensArray(object: any): object is ScreensArray {
    return object?.children;
  }

  function instanceOfScreenItem(object: any): object is ScreenItem {
    return object?.component;
  }

  if (!appIsReady) {
    return null;
  }

  return (
    <>
      <StatusBar
        barStyle={colors._theme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colors.BgPrimary}
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
            name={ROUTES.ROOT}
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />

          {screens.map(screen => {
            if (instanceOfScreensArray(screen)) {
              return (
                <Stack.Group
                  screenOptions={screen.options}
                  key={"groups"}
                >
                  {screen?.children.map(childScreen => (
                    <Stack.Screen
                      key={childScreen.name}
                      name={childScreen.name}
                      component={childScreen.component}
                      options={childScreen.options}
                    />
                  ))}
                </Stack.Group>
              )
            }

            if (instanceOfScreenItem(screen)) {
              return (  
                <Stack.Screen
                  key={screen.name}
                  name={screen.name}
                  component={screen.component}
                  options={screen.options}
                />
              )
            }
          })}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Layout;