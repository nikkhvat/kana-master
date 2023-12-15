import React from "react";
import { Provider } from "react-redux";
import { makeStore } from "./shared/store/store";
import Layout from "./layout";

const App = () => {
  return (
    <Provider store={makeStore()}>
      <Layout />
    </Provider>
  );
};

export default App;
