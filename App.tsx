import React from "react";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

import Layout from "@/layout";
import { makeStore } from "@/store/store";


const App = () => {
  return (
    <Provider store={makeStore()}>
      <SafeAreaProvider>
        <Layout />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
