import React from "react";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./src/app/store";

import Layout from "@/app/layout";
import { ThemeProvider } from "@/features/settings/settings-theme/theme-context";

import "@/shared/lib/i18n/index"; 
// eslint-disable-next-line import/order
import { View } from "react-native";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <ThemeProvider>
            <Layout />
          </ThemeProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
