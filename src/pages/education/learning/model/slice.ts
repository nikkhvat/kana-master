import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { InitialState } from "./types";
import { getChapters } from "./api";

const initialState: InitialState = {
  completedLesson: [],
  chapters: [],
  lang: "en",
  lastUpdate: 0,
};

export const updateLessons = createAsyncThunk("LESSONS/UPDATE_LESSONS",
  async ({ lang }: { lang: string }) => {
    try {
      const { data, status } = await getChapters(lang);

      if (status === 200) {
        return {
          ok: true,
          chapters: data.chapters,
          lang: lang
        }
      }
    } catch (error) {
      console.error(error)
    }

    return {
      ok: false,
      chapters: [],
      lang: lang
    }
  }
);

export const lessonsSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {
    clearStateLessons: () => initialState,
    completeLesson: (state, action) => {
      state.completedLesson = [...state.completedLesson, action.payload];
    },
    setChapters: (state, action) => {
      state.chapters = action.payload.chapters
      state.lang = action.payload.lang
      state.lastUpdate = +new Date()
    }
  },
  extraReducers: (builder) => {
    builder.addCase(updateLessons.fulfilled, (state, action) => {
      if (action.payload?.ok) {
        state.chapters = action.payload?.chapters
        state.lastUpdate = +new Date()
        state.lang = action.payload.lang as "en"
      }
    })
  }
});

export const { completeLesson, setChapters, clearStateLessons } = lessonsSlice.actions;

export default lessonsSlice.reducer;