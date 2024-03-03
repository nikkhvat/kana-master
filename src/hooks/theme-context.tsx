import React, { createContext, useContext, ReactNode, useState, FunctionComponent } from "react";

import { Appearance } from "react-native";

import { Theme } from "@/shared/constants/profile";
import { darkTheme } from "@/shared/themes/dark";
import { lightTheme } from "@/shared/themes/light";

type Colors = typeof darkTheme

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
  updateTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

const getColors = (theme: Theme) => {
    if (theme === Theme.Dark) {
      return colors["dark"];
    }

  if (theme === Theme.Light) {
      return colors["ligth"];
    }

  if (theme === Theme.Auto) {

    const themeDetected = Appearance.getColorScheme();

    if (themeDetected === null || themeDetected === undefined) return colors["ligth"];

    if (themeDetected === "dark") return colors["dark"];
    if (themeDetected === "light") return colors["ligth"];
  }

  return colors["ligth"];
};

// Создаем провайдер контекста
export const ThemeProvider: FunctionComponent<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(Theme.Light);

  // Функция для обновления компонента в контексте
  const updateTheme = (theme: Theme) => {
    setTheme(theme);
  };

  const colors = getColors(theme);

  const themeString = theme === Theme.Auto ? "auto" : theme === Theme.Dark ? "dark" : "light";

  return (
    <ThemeContext.Provider value={{ updateTheme, colors, theme, themeString: themeString }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Хук для использования контекста
export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  return context;
};

