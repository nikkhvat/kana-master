import { createSlice } from "@reduxjs/toolkit";

import { InitialState } from "./types";

const initialState: InitialState = {
  draw: {
    lineWidth: 14,

    isShowBorder: true,
    isShowLetter: true,
  }
};

const check = (state: any) => {
  if (!state.draw) {
    state.draw = {
      lineWidth: 14,

      isShowBorder: true,
      isShowLetter: true,
    }
  }
}

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateDrawLine: (state, action) => {
      check(state);

      state.draw.lineWidth = action.payload;
    },
    toggleShowBorder: (state, action) => {
      check(state);

      state.draw.isShowBorder = !state.draw.isShowBorder;
    },
    toggleShowLetter: (state, action) => {
      check(state);

      state.draw.isShowLetter = !state.draw.isShowLetter;
    }
  },
});

export const { updateDrawLine, toggleShowBorder, toggleShowLetter } = profileSlice.actions;

export default profileSlice.reducer;