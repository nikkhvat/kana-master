import React from "react";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./store";

import Layout from "@/app/layout";
import { ThemeProvider } from "@/features/settings/settings-theme/theme-context";
import "@/shared/lib/i18n/index"; 
import { TransliterationsProvider } from "@/features/settings/settings-transliterations/context/transliteration";

import { ActionSheetProvider } from '@expo/react-native-action-sheet';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <ActionSheetProvider> 
            <ThemeProvider>
              <TransliterationsProvider>
                <Layout />
              </TransliterationsProvider>
            </ThemeProvider>
          </ActionSheetProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
