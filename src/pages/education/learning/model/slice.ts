import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { InitialState } from "./types";
import { chapters } from "@/shared/data/chapters";
import { getChapters, ping } from "./api";

const initialState: InitialState = {
  completedLesson: [],
  chapters: [],
  lang: "en",
  lastUpdate: 0,
};

export const updateLessons = createAsyncThunk("LESSONS/UPDATE_LESSONS",
  async ({ lang }: { lang: string }, { dispatch }) => {
    try {
      const isOk = await ping()

      if (!isOk) return

      const { data, status } = await getChapters(lang);

      if (status === 200) {
        return {
          ok: true,
          chapters: data.chapters,
          lang: lang
        }
      }

      return data
    } catch (error) {}
  }
);

export const lessonsSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {
    completeLesson: (state, action) => {
      state.completedLesson = [...state.completedLesson, action.payload];
    },
    init: (state, action) => {
      if (!state.chapters || state.chapters.length === 0 || state.lang !== action.payload) {
        state.chapters = chapters(action.payload)
        state.lang = action.payload
      }
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
      }
    })
  },
});

export const { completeLesson, init, setChapters } = lessonsSlice.actions;

export default lessonsSlice.reducer;