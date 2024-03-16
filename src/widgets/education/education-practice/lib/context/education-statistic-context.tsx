import React, { createContext, FC, PropsWithChildren, useContext, useState } from "react";

import { CardMode, Kana } from "@/shared/constants/kana";
import { ILetter } from "@/shared/data/lettersTable";


interface StatsItem {
  time: number
  correctAnswer: boolean
  kana: Kana
  question: ILetter,
  pickedAnswer?: ILetter
  mode: CardMode
}

interface PickAnswerProps {
  correctAnswer: boolean
  kana: Kana
  question: ILetter
  last?: boolean
  pickedAnswer?: ILetter
  mode: CardMode
}

export type ResultInfo = {
  type: "RESULT_PRACTICE",
  alphabets: Kana[]
  fastesAnswer: { answer: ILetter, time: number, type: CardMode },
  slowestAnswer: { answer: ILetter, time: number, type: CardMode },
  incorrect: { kana: Kana, letter: ILetter, mode: CardMode }[],
  totalQuestions: number,
  correctQuestions: number
  totalTime: number
  avgTime: number
}

interface EducationStatisticContextValue {
  items: StatsItem[]
  init: () => void;
  pickAnswer: (data: PickAnswerProps) => void;
  getResult: () => ResultInfo;
}

export const EducationStatisticContext = createContext<EducationStatisticContextValue>({
  init: () => {},
  pickAnswer: () => {},
  getResult: () => ({}) as ResultInfo,
  items: []
});

export const useEducationStatisticContext = () => useContext(EducationStatisticContext);

export const EducationStatisticContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [items, setItems] = useState<StatsItem[]>([]);
  const [time, setTime] = useState<number>(0);


  const init = () => {
    const now = new Date().getTime();
    setTime(now);
  };

  const pickAnswer = ({
    correctAnswer,
    kana,
    question,
    last,
    pickedAnswer,
    mode,
  }: PickAnswerProps) => {
    const now = new Date().getTime();
    setItems(prev => [...prev, {
      time: now - time,
      correctAnswer,
      kana,
      question,
      pickedAnswer,
      mode
    }]);

    if (last) {
      setTime(now);
    }
  };

  const findFastesAnswer = (items: StatsItem[]): StatsItem => {
    let largest = items[0];

    for (let i = 0; i < items.length; i++) {
      if (items[i].time < largest.time) {
        largest = items[i];
      }
    }
    
    return largest;
  };
  
  const findSlowestsAnswer = (items: StatsItem[]): StatsItem => {
    let largest = items[0];

    for (let i = 0; i < items.length; i++) {
      if (items[i].time > largest.time) {
        largest = items[i];
      }
    }
    
    return largest;
  };

  const getResult = (): ResultInfo => {
    const fastesAnswer = findFastesAnswer(items);
    const slowestAnswer = findSlowestsAnswer(items);

    const incorrect = items
      .filter(item => (!item.correctAnswer && item.pickedAnswer !== undefined))
      .map(item => {

        console.log("item", item);

        return {
          kana: item.kana,
          letter: item!.pickedAnswer as ILetter,
          mode: item.mode
        };
      });

    console.log("incorrect ->>>",incorrect);
    

    const totalTime = items.reduce((accumulator, currentValue) => accumulator + currentValue.time, 0);

    const data: ResultInfo = {
      type: "RESULT_PRACTICE",
      alphabets: [] as Kana[],
      fastesAnswer: { 
        answer: fastesAnswer.question, 
        time: fastesAnswer.time, 
        type: fastesAnswer.mode
      },
      slowestAnswer: { 
        answer: slowestAnswer.question, 
        time: slowestAnswer.time, 
        type: fastesAnswer.mode
      },
      incorrect,
      totalQuestions: items.length,
      correctQuestions: items.filter(item => item.correctAnswer).length,
      totalTime,
      avgTime: totalTime / items.length
    };

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      const kana = item.kana;

      if (!data.alphabets.includes(kana)) {
        data.alphabets.push(kana);
      }
    }

    return data;
  };

  return (
    <EducationStatisticContext.Provider
      value={{
        init,
        pickAnswer,
        getResult,
        items,
      }}
    >
      {children}
    </EducationStatisticContext.Provider>
  );
};