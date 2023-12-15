import { createSlice } from "@reduxjs/toolkit";

import { InitialState } from ".";

const initialState: InitialState = {};

export const kanaSlice = createSlice({
  name: "kana",
  initialState,
  reducers: {},
});

export const {} = kanaSlice.actions;

export default kanaSlice.reducer;