import React from "react";

import { SafeAreaProvider } from "react-native-safe-area-context";
// eslint-disable-next-line import/order
import { Provider } from "react-redux";

// import { makeStore } from "@/store/store";

import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./src/store/store";

import Layout from "@/layout";

import "./src/libs/i18n/index"; 

// import "@formatjs/intl-pluralrules/polyfill";
// import "@formatjs/intl-pluralrules/polyfill-locales";
// import "@formatjs/intl-pluralrules/locale-data/ru"; // Для русского языка
// import "@formatjs/intl-pluralrules/locale-data/en"; // Для русского языка

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <Layout />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
