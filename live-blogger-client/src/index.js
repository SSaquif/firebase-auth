import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import PostContextProvider from "./components/contexts/PostContext";

ReactDOM.render(
  <PostContextProvider>
    <App />
  </PostContextProvider>,
  document.getElementById("root")
);
