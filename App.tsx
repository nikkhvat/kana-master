import React from "react";
import { Provider } from "react-redux";
import { makeStore } from "./src/store/store";
import Layout from "./src/layout";

import { SafeAreaProvider } from "react-native-safe-area-context";

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
