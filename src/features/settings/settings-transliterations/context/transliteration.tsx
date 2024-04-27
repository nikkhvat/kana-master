import React, { createContext, useContext, ReactNode, useState, useEffect, FunctionComponent } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

export enum Transliterations {
  HEP = 0,
  KUN = 1,
  NIH = 2,
  RUS = 3,
}

interface TransliterationsContextType {
  transliterations: Transliterations;
  updateTransliterations: (transliterations: Transliterations) => void;
}

const TransliterationsContext = createContext<TransliterationsContextType>({
  transliterations: Transliterations.HEP,
  updateTransliterations: () => {},
});

interface TransliterationsProviderProps {
  children: ReactNode;
}


export const TransliterationsProvider: FunctionComponent<TransliterationsProviderProps> = ({ children }) => {
  const [transliterations, setTransliterations] = useState<Transliterations>(Transliterations.HEP);

  useEffect(() => {
    const loadTransliterationsFromStorage = async () => {
      try {
        const storedTransliterations = await AsyncStorage.getItem("transliteration");
        if (storedTransliterations) {
          setTransliterations(JSON.parse(storedTransliterations));
        }
      } catch (error) {
        return error;
      }
    };

    loadTransliterationsFromStorage();
  }, []);

  const updateTransliterations = (newTransliterations: Transliterations) => {
    AsyncStorage.setItem("transliteration", JSON.stringify(newTransliterations));
    setTransliterations(newTransliterations);
  };

  return (
    <TransliterationsContext.Provider 
      value={{ 
        updateTransliterations,
        transliterations,
      }}>
      {children}
    </TransliterationsContext.Provider>
  );
};

export const useTransliterationsContext = () => {
  const context = useContext(TransliterationsContext);

  return context;
};
