import React from "react";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./src/store/store";

import Layout from "@/layout";

import "./src/libs/i18n/index"; 

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
