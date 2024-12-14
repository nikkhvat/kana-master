import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  FunctionComponent,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appearance, useColorScheme } from "react-native";
import { Theme } from "@/shared/constants/theme";
import { darkTheme } from "@/shared/themes/dark";
import { lightTheme } from "@/shared/themes/light";
import { useTranslation } from "react-i18next";

type Colors = typeof darkTheme;

const colors = {
  dark: darkTheme,
  light: lightTheme,
};

interface ThemeContextType {
  colors: Colors;
  theme: Theme;
  themeString: string;
  themeLocalized: string;
  updateTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  colors: colors.light,
  theme: Theme.Light,
  themeString: "light",
  themeLocalized: "light",
  updateTheme: () => { },
});

interface ThemeProviderProps {
  children: ReactNode;
}

const getColors = (theme: Theme) => {
  if (theme === Theme.Dark) return colors.dark;
  if (theme === Theme.Light) return colors.light;

  const themeDetected = Appearance.getColorScheme();
  return themeDetected === "dark" ? colors.dark : colors.light;
};

export const ThemeProvider: FunctionComponent<ThemeProviderProps> = ({
  children,
}) => {
  const { t } = useTranslation();
  const [isAuto, setIsAuto] = useState(false);
  const theme = useColorScheme() as Theme;

  useEffect(() => {
    const loadThemeFromStorage = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem("app_theme");
        if (storedTheme) {
          const parsedTheme = JSON.parse(storedTheme) as Theme;
          updateTheme(parsedTheme);
        }
      } catch (error) {
        console.error("Failed to load theme from storage:", error);
      }
    };

    loadThemeFromStorage();
  }, []);

  const updateTheme = (newTheme: Theme) => {
    AsyncStorage.setItem("app_theme", JSON.stringify(newTheme));

    if (newTheme !== Theme.Auto) {
      Appearance.setColorScheme(newTheme === Theme.Light ? "light" : "dark");
      setIsAuto(false);
    } else {
      setIsAuto(true);
      Appearance.setColorScheme(null)
    }
  };

  const colors = getColors(theme);

  const themeString =
    (theme === Theme.Auto || !theme || isAuto === true) ? "auto" : theme === Theme.Dark ? "dark" : "light";

  const themeLocalized =
    (theme === Theme.Auto || !theme || isAuto === true) ? t('settings.theme.auto') : theme === Theme.Dark ? t('settings.theme.dark') : t('settings.theme.light');

  return (
    <ThemeContext.Provider
      value={{ updateTheme, colors, theme, themeString, themeLocalized }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);