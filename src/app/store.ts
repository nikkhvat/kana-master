import AsyncStorage from "@react-native-async-storage/async-storage"; // or your preferred storage engine
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

import lessonsSlice from "@/pages/education/learning/model/slice";
import statisticsSlice from "@/pages/kana/kana-list/model/slice";
import kanaSlice from "@/pages/kana/kana-quick-selection/model/slice";

const rootReducer = combineReducers({
  kana: kanaSlice,
  statistics: statisticsSlice,
  lessons: lessonsSlice,
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
        },
      }),
  });
};


export const store = makeStore();
export const persistor = persistStore(store);

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
