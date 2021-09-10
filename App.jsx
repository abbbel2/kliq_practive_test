import React from "react";
import Navigation from "./src/navigations";
import { Provider } from "react-redux";
import store from "./src/redux/store";

export default function App() {
  /**
   * Passed in the redux store to the whole app
   */
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
