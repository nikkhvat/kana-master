import { createSlice } from "@reduxjs/toolkit";

import { InitialState } from "./types";

const initialState: InitialState = {
  completedLesson: [],
};

export const lessonsSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {
    completeLesson: (state, action) => {
      state.completedLesson = [...state.completedLesson, action.payload];
    },
  },
});

export const { completeLesson } = lessonsSlice.actions;

export default lessonsSlice.reducer;