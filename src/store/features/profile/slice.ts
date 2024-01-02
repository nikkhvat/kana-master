import { createSlice } from "@reduxjs/toolkit";

import { InitialState } from "./types";

import { Theme } from "@/constants/profile";

const initialState: InitialState = {
  theme: Theme.Auto,
  language: "en"
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setLang: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setTheme, setLang } = profileSlice.actions;

export default profileSlice.reducer;