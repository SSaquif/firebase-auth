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
      console.log("The use effect one fires");
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

      const unlisten = auth.onAuthStateChanged(async (user) => {
        console.log("Auth state changed", user);
        if (user) {
          //check in my mongo db if the user exists, if not create new one
          const response = await fetch("/api/auth/googleSignIn", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(user),
          });

          const userInfoFromMongoDB = await response.json();
          console.log(userInfoFromMongoDB);

          dispatchCurrentUser({ type: "sign-in", payload: { user } });
        } else {
          // Thanks to the unlisten, I never actually get inside this else
          // its the listener on useEffect that takes care of the sign out
          console.log(
            "Observer still fires with unlisten() below when I sign out"
          );
          dispatchCurrentUser({ type: "sign-out", payload: { user } });
        }
        history.push("/");
        unlisten();
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
