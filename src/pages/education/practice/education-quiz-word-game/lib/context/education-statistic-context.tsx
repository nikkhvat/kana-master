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


export interface RegistrationErrorProps {
  type: typeof QuestionTypeFindPairWord | typeof QuestionTypeBuildingWord | typeof QuestionTypeChooseWord,
  pair: string[];
}

interface EducationStatisticContextValue {
  items: StatsItem[]
  init: () => void;
  pickAnswer: (data: PickAnswerProps) => void;
  getResult: () => ResultInfoWordGame;
  registrError: (data: RegistrationErrorProps) => void;
}

export const EducationStatisticContext = createContext<EducationStatisticContextValue>({
  init: () => {},
  pickAnswer: () => {},
  getResult: () => ({}) as ResultInfoWordGame,
  registrError: () => {},
  items: []
});


export const useEducationStatisticContext = () => useContext(EducationStatisticContext);

let items: StatsItem[] = [];

export const EducationStatisticContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [errors, setErrors] = useState<RegistrationErrorProps[]>([]);
  const [time, setTime] = useState<number>(0);


  const init = () => {
    items = [];
    const now = new Date().getTime();
    setTime(now);
  };

  const pickAnswer = ({ correctAnswer }: PickAnswerProps) => {
    const now = new Date().getTime();

    items.push({
      time: now - time,
      correctAnswer,
    });

    setTime(now);
  };

  const registrError = (data: RegistrationErrorProps) => {
    setErrors(prev => [...prev, data]);
  };

  function removeDuplicates(arr: string[][]): string[][] {
    const uniqueMap: Map<string, boolean> = new Map();
    const result: string[][] = [];

    arr.forEach(innerArr => {
      const key = innerArr[0];
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, true);
        result.push(innerArr);
      }
    });

    return result;
  }


  const getResult = (): ResultInfoWordGame => {
    const totalTime = items.reduce((accumulator, currentValue) => accumulator + currentValue.time, 0);

    const totalQuestions = items.length;
    let correctQuestions = 0;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      
      if (item.correctAnswer) {
        correctQuestions++;
      }
    }

    const data: ResultInfoWordGame = {
      type: "RESULT_WORD_GAME",
      totalQuestions: totalQuestions,
      correctQuestions: correctQuestions,
      totalTime,
      avgTime: totalTime / items.length,
      incorrectWordBuilding: removeDuplicates(errors.filter(prev => prev.type === "building-word").map(item => ([item.pair[0], item.pair[1]]))),
      incorrectFindThePair: removeDuplicates(errors.filter(prev => prev.type === "find-pair-word").map(item => ([item.pair[0], item.pair[1]]))),
      incorrectChoice: removeDuplicates(errors.filter(prev => prev.type === "choose-word").map(item => ([item.pair[0], item.pair[1]]))),
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