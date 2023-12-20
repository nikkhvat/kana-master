import { useState, useCallback, useEffect } from "react";

import { CardMode, Kana } from "@/constants/kana";

interface AnswerStats {
  time: number;
  letter: string | null;
}

export interface Stats {
  totalQuestions: number;
  correctAnswers: number;
  totalDuration: number;
  averageTimePerQuestion: number;
  fastestAnswer: AnswerStats | null;
  slowestAnswer: AnswerStats | null;
  incorrectAnswers: string[];
  alphabets: Kana[]
}

const useStats = (extra: {
  cardModeState?: CardMode[]
}) => {
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [fastestAnswer, setFastestAnswer] = useState<AnswerStats | null>(null);
  const [slowestAnswer, setSlowestAnswer] = useState<AnswerStats | null>(null);
  const [incorrectAnswers, setIncorrectAnswers] = useState<string[]>([]);
  const [alphabets, setAlphabet] = useState<Kana[]>([]);

  useEffect(() => {
    if (!extra.cardModeState || !extra) return; 

    const data = [];

    if (
        extra.cardModeState?.includes(CardMode.hiraganaToKatakana) ||
        extra.cardModeState?.includes(CardMode.hiraganaToRomaji) ||
        extra.cardModeState?.includes(CardMode.romajiToHiragana) ||
        extra.cardModeState?.includes(CardMode.katakanaToHiragana)
    ) {
      data.push(Kana.Hiragana);
    }

    if (
        extra.cardModeState?.includes(CardMode.hiraganaToKatakana) ||
        extra.cardModeState?.includes(CardMode.katakanaToHiragana) ||
        extra.cardModeState?.includes(CardMode.katakanaToRomaji) ||
        extra.cardModeState?.includes(CardMode.romajiToKatakana)
    ) {
      data.push(Kana.Katakana);
    }

    setAlphabet(data);
  }, []);

  const startTimer = useCallback(() => {
    setStartTime(new Date());
  }, []);

  const endTimer = useCallback(() => {
    setEndTime(new Date());
  }, []);

  const recordAnswer = useCallback((isCorrect: boolean, responseTime: number, letter: string) => {
    setTotalQuestions(prev => prev + 1);
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    } else {
      setIncorrectAnswers(prev => [...prev, letter]);
    }

    if (!fastestAnswer || responseTime < fastestAnswer.time) {
      setFastestAnswer({ time: responseTime, letter });
    }

    if (!slowestAnswer || responseTime > slowestAnswer.time) {
      setSlowestAnswer({ time: responseTime, letter });
    }
  }, [fastestAnswer, slowestAnswer]);

  const getStats = useCallback((): Stats => {
    const totalDuration = endTime && startTime ? (endTime.getTime() - startTime.getTime()) / 1000 : 0;
    const averageTimePerQuestion = totalQuestions > 0 ? totalDuration / totalQuestions : 0;

    return {
      totalQuestions,
      correctAnswers,
      totalDuration,
      averageTimePerQuestion,
      fastestAnswer,
      slowestAnswer,
      incorrectAnswers,
      alphabets,
    };
  }, [totalQuestions, correctAnswers, startTime, endTime, fastestAnswer, slowestAnswer, incorrectAnswers]);

  return {
    startTimer,
    endTimer,
    recordAnswer,
    getStats
  };
};

export default useStats;
