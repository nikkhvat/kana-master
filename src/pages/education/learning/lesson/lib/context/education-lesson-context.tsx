import React, { createContext, FC, PropsWithChildren, useContext } from "react";

import { ILetter } from "@/shared/data/lettersTable";


interface EducationLessonContextValue {
  init: (letters: ILetter[]) => void;
}

export const EducationLessonContext =
  createContext<EducationLessonContextValue>({
    init: () => {},
  });

export const useEducationLessonContext = () =>
  useContext(EducationLessonContext);

export const EducationPracticeContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const init = (letters: ILetter[]) => {
    console.log("INIT", letters);
  };

  return (
    <EducationLessonContext.Provider
      value={{
        init,
      }}
    >
      {children}
    </EducationLessonContext.Provider>
  );
};
