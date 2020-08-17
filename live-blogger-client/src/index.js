import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import PostContextProvider from "./components/contexts/PostContext";

console.log(process.env.NODE_ENV);

ReactDOM.render(
  <PostContextProvider>
    <App />
  </PostContextProvider>,
  document.getElementById("root")
);
