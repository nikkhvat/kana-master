import { createSlice } from "@reduxjs/toolkit";

import { InitialState } from "./types";

const initialState: InitialState = {
  drawLine: 14,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateDrawLine: (state, action) => {
      state.drawLine = action.payload;
    }
  },
});

export const { updateDrawLine } = profileSlice.actions;

export default profileSlice.reducer;