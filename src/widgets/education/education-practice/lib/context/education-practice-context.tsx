import React, { createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useState } from "react";

import * as Haptics from "expo-haptics";

import { AnyQuestion } from "@/shared/types/questions";

interface EducationPracticeContextValue {
  init: (questions: AnyQuestion[]) => void;
  submit: (
    trueSelected: boolean,
    callback?: (onFinishPractice: boolean, trueAnswer: boolean) => void
  ) => void;
  questions: AnyQuestion[]
  currentIndex: number
}

export const EducationPracticeContext = createContext<EducationPracticeContextValue>({
  init: () => {},
  submit: () => {},
  questions: [],
  currentIndex: 0
});

export const useEducationPracticeContext = () => useContext(EducationPracticeContext);

export const EducationPracticeContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currentIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<AnyQuestion[]>([]);

  // Когда отвечаешь на вопрос вызываеться эта функция
  // параметр trueSelected: правильный ли ответ
  // callback передаёться
  // > onFinishPractice - true если вопросы закончились
  // > trueAnswer - true если вопросы был правильный 
  const submit = (
    trueSelected: boolean, 
    callback?: (onFinishPractice: boolean, trueAnswer: boolean) => void
  ) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    if (currentIndex === questions.length - 1) {
      callback?.(true, trueSelected);
    } else {
      setQuestionIndex((prev) => prev + 1);
      callback?.(false, trueSelected);
    }
  };

  // Передаёться масив вопросов 
  const init = (questions: AnyQuestion[]) => {
    console.log("INIT questions",questions);
    setQuestions(questions);
  };

  return (
    <EducationPracticeContext.Provider
      value={{
        init,
        submit,
        questions,
        currentIndex
      }}
    >
      {children}
    </EducationPracticeContext.Provider>
  );
};
