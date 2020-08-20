import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import CurrentUserContextProvider from "./components/contexts/CurrentUserContext";
import { BrowserRouter } from "react-router-dom";

console.log(process.env.NODE_ENV);

ReactDOM.render(
  <BrowserRouter>
    <CurrentUserContextProvider>
      <App />
    </CurrentUserContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
