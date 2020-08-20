import React, { createContext, useReducer, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { useHistory } from "react-router-dom";

export const CurrentUserContext = createContext(null);

const initialState = {
  userInfo: null,
};

const reducer = (state, { type, payload }) => {
  const newState = { ...state };

  switch (type) {
    case "app-refresh":
      if (payload.user) {
        newState.userInfo = payload;
      } else {
        newState.userInfo = null;
      }
      break;

    case "sign-in":
      newState.userInfo = payload;
      break;

    case "sign-out":
      newState.userInfo = null;
      break;

    default:
      break;
  }
  console.log(newState);
  return newState;
};

export const CurrentUserContextProvider = ({ children }) => {
  let history = useHistory();
  const [currentUser, dispatchCurrentUser] = useReducer(reducer, initialState);

  useEffect(() => {
    const unlisten = auth.onAuthStateChanged((user) => {
      console.log(user);
      dispatchCurrentUser({ type: "app-refresh", payload: { user } });
    });

    return () => {
      unlisten();
    };
  }, []);

  const signInWithGoogle = async (ev) => {
    ev.preventDefault();
    try {
      await auth.signInWithPopup(googleAuthProvider);

      auth.onAuthStateChanged((user) => {
        console.log("Auth state changed", user);
        if (user) {
          dispatchCurrentUser({ type: "sign-in", payload: { user } });
        } else {
          dispatchCurrentUser({ type: "sign-out", payload: { user } });
        }
        history.push("/");
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignOut = async (ev) => {
    ev.preventDefault();
    auth.signOut();
    history.push("/");
  };

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        dispatchCurrentUser,
        signInWithGoogle,
        handleSignOut,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContextProvider;
