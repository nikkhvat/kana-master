import React from "react";

import { SafeAreaProvider } from "react-native-safe-area-context";
// eslint-disable-next-line import/order
import { Provider } from "react-redux";

// import { makeStore } from "@/store/store";

import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./src/store/store";

import Layout from "@/layout";


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
