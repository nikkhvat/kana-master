import React, { createContext, FC, PropsWithChildren, useContext } from "react";

interface EducationLessonContextValue {
  init: () => void;
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
  const init = () => {
    console.log("INIT");
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
