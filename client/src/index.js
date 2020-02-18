import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import { theme, ThemeProvider, CSSReset } from "@chakra-ui/core";
import App from "./App";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <CSSReset />
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);
