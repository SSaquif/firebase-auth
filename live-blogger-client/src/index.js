import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import PostContextProvider from "./components/contexts/PostContext";
import CurrentUserContextProvider from "./components/contexts/CurrentUserContext";
console.log(process.env.NODE_ENV);

ReactDOM.render(
  <CurrentUserContextProvider>
    <PostContextProvider>
      <App />
    </PostContextProvider>
  </CurrentUserContextProvider>,
  document.getElementById("root")
);
