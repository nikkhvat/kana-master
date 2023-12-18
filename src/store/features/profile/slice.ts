import { createSlice } from '@reduxjs/toolkit';

import { InitialState } from './types';

import { Theme } from '@/constants/profile';

const initialState: InitialState = {
  theme: Theme.Auto,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    }
  },
});

export const { setTheme } = profileSlice.actions;

export default profileSlice.reducer;