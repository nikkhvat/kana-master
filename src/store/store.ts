import { configureStore } from '@reduxjs/toolkit';

import kanaSlice from './features/kana/slice';
import profileSlice from './features/profile/slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      kana: kanaSlice,
      profile: profileSlice
    }
  });
};

export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']