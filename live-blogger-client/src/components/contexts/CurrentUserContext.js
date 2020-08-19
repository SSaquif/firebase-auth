import React, { createContext, useReducer } from "react";

export const CurrentUserContext = createContext(null);

const initialState = {
  userInfo: null,
};

const reducer = (state, { type, payload }) => {
  const newState = { ...state };
  switch (type) {
    case "sign-in":
      newState.userInfo = payload;
      break;

    case "sign-out":
      newState.userInfo = payload.user;
      break;

    default:
      // console.log("here");
      break;
  }
  console.log(newState);
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
