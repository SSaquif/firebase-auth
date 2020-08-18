import React, { createContext, useReducer } from "react";

export const CurrentUserContext = createContext(null);

const initialState = {
  signedIn: false,
};

const reducer = (state, { type, payload }) => {
  const newState = { ...state };
  switch (type) {
    case "log-in":
      break;
    case "log-out":
      break;
    default:
      break;
  }
  return newState;
};

export const CurrentUserContextProvider = ({ children }) => {
  const [currentUser, dispatchCurrentUser] = useReducer(reducer, initialState);

  return (
    <CurrentUserContext.Provider value={{ currentUser, dispatchCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContextProvider;
