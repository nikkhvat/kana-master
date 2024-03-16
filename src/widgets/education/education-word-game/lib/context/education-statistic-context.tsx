import React, { createContext, FC, PropsWithChildren, useContext, useState } from "react";

import { QuestionTypeBuildingWord, QuestionTypeChooseWord, QuestionTypeFindPairWord } from "@/shared/constants/kana";

interface StatsItem {
  time: number
  correctAnswer: boolean
}

interface PickAnswerProps {
  correctAnswer: boolean
  last?: boolean
}

export type ResultInfoWordGame = {
  type: "RESULT_WORD_GAME",
  totalQuestions: number,
  correctQuestions: number
  totalTime: number
  avgTime: number
  incorrectWordBuilding: string[][]
  incorrectFindThePair: string[][]
  incorrectChoice: string[][]
}


export interface RegistErrorProps {
  type: typeof QuestionTypeFindPairWord | typeof QuestionTypeBuildingWord | typeof QuestionTypeChooseWord,
  pair: string[];
}

interface EducationStatisticContextValue {
  items: StatsItem[]
  init: () => void;
  pickAnswer: (data: PickAnswerProps) => void;
  getResult: () => ResultInfoWordGame;
  registrError: (data: RegistErrorProps) => void;
}

export const EducationStatisticContext = createContext<EducationStatisticContextValue>({
  init: () => {},
  pickAnswer: () => {},
  getResult: () => ({}) as ResultInfoWordGame,
  registrError: () => {},
  items: []
});


export const useEducationStatisticContext = () => useContext(EducationStatisticContext);

export const EducationStatisticContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [items, setItems] = useState<StatsItem[]>([]);
  const [errors, setErrors] = useState<RegistErrorProps[]>([]);
  const [time, setTime] = useState<number>(0);


  const init = () => {
    const now = new Date().getTime();
    setTime(now);
  };

  const pickAnswer = ({
    correctAnswer,
    last,
  }: PickAnswerProps) => {
    const now = new Date().getTime();
    setItems(prev => [...prev, {
      time: now - time,
      correctAnswer,
    }]);

    if (last) {
      setTime(now);
    }
  };

  const registrError = (data: RegistErrorProps) => {
    setErrors(prev => [...prev, data]);
  };

  const getResult = (): ResultInfoWordGame => {
    const totalTime = items.reduce((accumulator, currentValue) => accumulator + currentValue.time, 0);

    const data: ResultInfoWordGame = {
      type: "RESULT_WORD_GAME",
      totalQuestions: items.length,
      correctQuestions: items.filter(item => item.correctAnswer).length,
      totalTime,
      avgTime: totalTime / items.length,
      incorrectWordBuilding: errors.filter(prev => prev.type === "building-word").map(item => ([item.pair[0], item.pair[1]])),
      incorrectFindThePair: errors.filter(prev => prev.type === "find-pair-word").map(item => ([item.pair[0], item.pair[1]])),
      incorrectChoice: errors.filter(prev => prev.type === "choose-word").map(item => ([item.pair[0], item.pair[1]])),
    };


    return data;
  };

  return (
    <EducationStatisticContext.Provider
      value={{
        init,
        pickAnswer,
        getResult,
        registrError,
        items,
      }}
    >
      {children}
    </EducationStatisticContext.Provider>
  );
};