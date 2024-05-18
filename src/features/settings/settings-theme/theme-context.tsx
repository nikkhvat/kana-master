import React, { createContext, useContext, ReactNode, useState, useEffect, FunctionComponent } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appearance, useColorScheme } from "react-native";

import { Theme } from "@/shared/constants/theme";
import { darkTheme } from "@/shared/themes/dark";
import { lightTheme } from "@/shared/themes/light";

type Colors = typeof darkTheme;

const colors = {
  "dark": darkTheme,
  "ligth": lightTheme,
};

interface ThemeContextType {
  colors: Colors;
  theme: Theme;
  themeString: string;
  updateTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  colors: colors.ligth,
  theme: Theme.Light,
  themeString: "light",
  updateTheme: () => { },
});

interface ThemeProviderProps {
  children: ReactNode;
}

const getColors = (theme: Theme) => {
  if (theme === Theme.Dark) return colors["dark"];
  if (theme === Theme.Light) return colors["ligth"];

  if (theme === Theme.Auto) {
    const themeDetected = Appearance.getColorScheme();
    if (themeDetected === null || themeDetected === undefined) return colors["ligth"];
    if (themeDetected === "dark") return colors["dark"];
    if (themeDetected === "light") return colors["ligth"];
  }

  return colors["ligth"];
};

export const ThemeProvider: FunctionComponent<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(Theme.Light);

  useEffect(() => {
    const loadThemeFromStorage = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem("app_theme");
        if (storedTheme) {
          setTheme(JSON.parse(storedTheme));
        }
      } catch (error) {
        return error;
      }
    };

    loadThemeFromStorage();
  }, []);

  const updateTheme = (newTheme: Theme) => {
    AsyncStorage.setItem("app_theme", JSON.stringify(newTheme));
    setTheme(newTheme);
  };

  const colors = getColors(theme);

  const autoTheme = useColorScheme()

  const themeString = theme === Theme.Auto ? "auto" : autoTheme === "dark" ? "dark" : "light";

  return (
    <ThemeContext.Provider value={{ updateTheme, colors, theme, themeString: themeString }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  return context;
};
