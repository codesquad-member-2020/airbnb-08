import ReactDOM from "react-dom";
import React from "react";

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { guestCountReducer } from "@/reducers/guestCountReducer";
import { datePickerReducer } from "@/reducers/datePickerReducer";
import { priceRangeReducer } from "@/reducers/priceRangeReducer";
import { searchReducer } from "@/reducers/searchReducer";

const rootElement = document.getElementById("root");

const rootReducer = combineReducers({
  guestCountReducer,
  datePickerReducer,
  priceRangeReducer,
  searchReducer,
});
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

import(/*webpackChunkName: 'App' */ "@/App").then(({ default: App }) =>
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootElement
  )
);
