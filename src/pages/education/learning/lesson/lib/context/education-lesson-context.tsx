import React, { createContext, FC, PropsWithChildren, useContext, useState } from "react";

import { AnyLesson, LessonScreen } from "@/shared/constants/lessons";
import { ILetter } from "@/shared/data/lettersTable";


interface EducationLessonContextValue {
  init: (letters: ILetter[]) => void;
  next: (hasError?: boolean) => void,
  retry: () => void,
  screens: AnyLesson[]
  currentScreen: AnyLesson | null
  screen: number
}

export const EducationLessonContext =
  createContext<EducationLessonContextValue>({
    init: () => { },
    next: (hasError?: boolean) => { },
    retry: () => { },
    screens: [],
    currentScreen: null,
    screen: 0,
  });

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function generateScreens(letters: ILetter[]): AnyLesson[] {
  const screens: AnyLesson[] = [];

  const addedLetters = [];

  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    addedLetters.push(letter);

    screens.push({ name: LessonScreen.Symbol, symbol: letter });
    screens.push({ name: LessonScreen.Draw, symbol: letter });

    if (addedLetters.length % 2 === 0) {
      screens.push({
        name: LessonScreen.MatchSymbols,
        symbols: [letter, letters[i - 1]]
      });
    }
    if (addedLetters.length % 3 === 0) {
      screens.push({ name: LessonScreen.SelectSymbol, 
        symbols: shuffleArray([
          letters[i],
          letters[i - 1],
          letters[i - 2],
        ])
      });
      screens.push({
        name: LessonScreen.MatchSymbols,
        symbols: [letter, letters[i - 1]]
      });
    }
    
    if (letters.length -1 === i) {
      screens.push({ name: LessonScreen.SelectSymbol, symbols: shuffleArray(letters).slice(0, 3) });
      screens.push({ name: LessonScreen.SelectSymbol, symbols: shuffleArray(letters).slice(0, 3) });
      screens.push({ name: LessonScreen.MatchSymbols, symbols: shuffleArray(letters).slice(0, 3) });
      screens.push({ name: LessonScreen.MatchSymbols, symbols: shuffleArray(letters).slice(0, 3) });
    }
  }

  screens.push({ name: LessonScreen.SelectSequenceLetters, sequence: shuffleArray(letters) });
  screens.push({ name: LessonScreen.SelectSequenceLetters, sequence: shuffleArray(letters) });
  screens.push({ name: LessonScreen.BuildWord, sequence: shuffleArray(letters) });
  screens.push({ name: LessonScreen.BuildWord, sequence: shuffleArray(letters) });
  screens.push({ name: LessonScreen.Finish });

  return screens;
}

export const useEducationLessonContext = () =>
  useContext(EducationLessonContext);

export const EducationPracticeContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [screens, setScreens] = useState([] as AnyLesson[]);
  const [screen, setScreen] = useState(0);

  const init = (letters: ILetter[]) => {
    const screens = generateScreens(letters);
    setScreens(screens);
  };

  const next = (hasError?: boolean) => {
    if (hasError) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((screens[screen] as any).retry !== 2) {
        setScreens(prev => [
          ...prev.slice(0, -1),
          { 
            ...screens[screen], 
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            retry: (screens[screen] as any)?.retry ? (screens[screen] as any)?.retry + 1 : 1
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          },
          { name: LessonScreen.Finish }
        ]);
      }
    }

    if (screen + 1 !== screens.length) {
      setScreen(prev => prev + 1);
    }
  };

  const retry = () => {
    setScreen(0);
  };

  return (
    <EducationLessonContext.Provider
      value={{
        init,
        next,
        retry,
        screens,
        screen,
        currentScreen: screens[screen]
      }}
    >
      {children}
    </EducationLessonContext.Provider>
  );
};
