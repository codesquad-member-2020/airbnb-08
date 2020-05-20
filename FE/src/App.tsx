import React from "react";
import testImg from "./test.png";

const App = () => {
  return (
    <div>
      <h1>{process.env.TEST}</h1>
      <img src={testImg} />
    </div>
  );
};

export default App;
