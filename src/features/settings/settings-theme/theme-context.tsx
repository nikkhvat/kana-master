import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  FunctionComponent,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appearance } from "react-native";

import { Theme } from "@/shared/constants/theme";
import { darkTheme } from "@/shared/themes/dark";
import { lightTheme } from "@/shared/themes/light";

type Colors = typeof darkTheme;

const colors = {
  dark: darkTheme,
  light: lightTheme,
};

interface ThemeContextType {
  colors: Colors;
  theme: Theme;
  themeString: string;
  updateTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  colors: colors.light,
  theme: Theme.Light,
  themeString: "light",
  updateTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

const getColors = (theme: Theme) => {
  if (theme === Theme.Dark) return colors["dark"];
  if (theme === Theme.Light) return colors["light"];

  if (theme === Theme.Auto) {
    const themeDetected = Appearance.getColorScheme();
    if (themeDetected === null || themeDetected === undefined)
      return colors["light"];
    if (themeDetected === "dark") return colors["dark"];
    if (themeDetected === "light") return colors["light"];
  }

  return colors["light"];
};

export const ThemeProvider: FunctionComponent<ThemeProviderProps> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(Theme.Light);

  useEffect(() => {
    const loadThemeFromStorage = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem("app_theme");
        if (storedTheme) {
          setTheme(JSON.parse(storedTheme));
          Appearance.setColorScheme(
            storedTheme === Theme.Auto
              ? null
              : storedTheme === Theme.Dark
                ? "dark"
                : "light",
          );
        }
      } catch (error) {
        return error;
      }
    };

    loadThemeFromStorage();
  }, []);

  const updateTheme = (newTheme: Theme) => {
    console.log("CHENGE THEME ON: ", newTheme);

    let activeTheme: "dark" | "light" =
      newTheme === Theme.Dark ? "dark" : "light";

    if (theme === Theme.Auto) {
      const themeDetected = Appearance.getColorScheme();
      if (themeDetected === "dark") {
        activeTheme = "dark";
      }

      if (
        themeDetected === "light" ||
        themeDetected === null ||
        themeDetected === undefined
      ) {
        activeTheme = "light";
      }
    }

    Appearance.setColorScheme(activeTheme);
    AsyncStorage.setItem("app_theme", JSON.stringify(newTheme));

    setTheme(newTheme);
  };

  const colors = getColors(theme);

  const themeString =
    theme === Theme.Auto ? "auto" : theme === Theme.Dark ? "dark" : "light";

  return (
    <ThemeContext.Provider
      value={{ updateTheme, colors, theme, themeString: themeString }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  return context;
};
