import React, { createContext, useReducer, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { useHistory } from "react-router-dom";

export const CurrentUserContext = createContext(null);

const initialState = {
  loading: true,
  userInfo: null,
};

const reducer = (state, { type, payload }) => {
  const newState = { ...state };

  switch (type) {
    case "sign-in":
      newState.userInfo = payload;
      newState.loading = false;
      break;

    case "sign-out":
      newState.userInfo = null;
      newState.loading = false;
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
    //When the App loads I will attach my onAuthStateChanged Observers
    const unlisten = auth.onAuthStateChanged(async (user) => {
      console.log("Auth state changed", user);
      if (user) {
        const response = await fetch("/api/auth/googleSignIn", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(user),
        });

        const userInfoFromMongoDB = await response.json();
        console.log(userInfoFromMongoDB);

        dispatchCurrentUser({ type: "sign-in", payload: { user } });
      } else {
        console.log(
          "Observer still fires with unlisten() below when I sign out"
        );
        dispatchCurrentUser({ type: "sign-out", payload: { user } });
      }
    });

    return () => {
      unlisten();
    };
  }, []);

  const signInWithGoogle = async (ev) => {
    ev.preventDefault();
    try {
      // auth.signInWithPopup() will trigger the callback of onAuthStateChanged()
      // on the useEffect
      await auth.signInWithPopup(googleAuthProvider);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignOut = (ev) => {
    ev.preventDefault();
    // auth.signOut() will trigger the callback of onAuthStateChanged()
    // on the useEffect
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
