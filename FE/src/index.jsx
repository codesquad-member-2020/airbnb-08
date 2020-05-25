import ReactDOM from "react-dom";
import React from "react";
import App from "@/App";

import { createStore } from "redux";
import { Provider } from "react-redux";
import { guestCountReducer } from "@/reducers/reducers";

const rootElement = document.getElementById("root");

const store = createStore(guestCountReducer);

// import(/*webpackChunkName: 'app' */ "@/App").then(({ default: App }) =>
//   ReactDOM.render(<App />, rootElement)
// );

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
