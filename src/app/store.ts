import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

import lessonsSlice from "@/pages/education/learning/model/slice";
import profileSlice from "@/pages/settings/model/slice";
import statisticsSlice from "@/pages/kana/kana-table-list-page/model/slice";
import kanaSlice from "@/pages/kana/kana-table-choice-letters-page/model/slice";

const rootReducer = combineReducers({
  kana: kanaSlice,
  statistics: statisticsSlice,
  lessons: lessonsSlice,
  profile: profileSlice,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
          warnAfter: 128
        },
        immutableCheck: { warnAfter: 128 },
      }),
  });
};

export const store = makeStore();
export const persistor = persistStore(store);

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
