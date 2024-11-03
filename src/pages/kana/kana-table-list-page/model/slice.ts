import { createSlice } from "@reduxjs/toolkit";

import { InitialState, RecalculateAction, StatisticLevel, } from "./types";

const initialState: InitialState = {
  rawStatistics: {
    hiragana: {},
    katakana: {},
  },
  statistics: {
    hiragana: {},
    katakana: {},
  },
  isEnabled: true
};

const calculateSum = (values: number[]) => values.reduce((acc, val) => acc + val, 0);

export const statisticsSlice = createSlice({
  name: "kana",
  initialState,
  reducers: {
    recalculate: (state, action: RecalculateAction) => {
      const { data } = action.payload;

      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        const values = state.rawStatistics[element.chapter][element.id] ? state.rawStatistics[element.chapter][element.id].values : [];
        const newValue = element.isCorrect ? 100 : 0;
        values.push(newValue);
        const sum = calculateSum(values);
        const average = sum / values.length;
        
        let level;

        if (average >= 81) {
          level = StatisticLevel.Green;
        } else if (average >= 51) {
          level = StatisticLevel.Yellow;
        } else {
          level = StatisticLevel.Red;
        }

        state.rawStatistics[element.chapter][element.id] = {values};

        if (!state.statistics[element.chapter][element.id] || state.statistics[element.chapter][element.id]?.level !== level) {
          state.statistics[element.chapter][element.id] = {level};
        }
      }
    },
    toggleStatistics: (state) => {
      state.isEnabled = !state.isEnabled;
    },
    clearStateStatistics: () => initialState,
  },
});

export const { recalculate, toggleStatistics, clearStateStatistics } = statisticsSlice.actions;

export default statisticsSlice.reducer;