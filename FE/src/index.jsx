import ReactDOM from "react-dom";
import React from "react";
import App from "@/App";
const rootElement = document.getElementById("root");

// import(/*webpackChunkName: 'app' */ "@/App").then(({ default: App }) =>
//   ReactDOM.render(<App />, rootElement)
// );

ReactDOM.render(<App />, rootElement);
