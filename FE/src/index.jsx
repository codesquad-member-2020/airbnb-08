import ReactDOM from "react-dom";
import React from "react";

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { guestCountReducer } from "@/reducers/guestCountReducer";
import { datePickerReducer } from "@/reducers/datePickerReducer";

const rootElement = document.getElementById("root");

const rootReducer = combineReducers({ guestCountReducer, datePickerReducer });
const store = createStore(rootReducer);
console.log(store.getState());

import(/*webpackChunkName: 'app' */ "@/App").then(({ default: App }) =>
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootElement
  )
);
