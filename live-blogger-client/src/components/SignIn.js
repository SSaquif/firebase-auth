import React, { useState, useContext } from "react";
import { CurrentUserContext } from "./contexts/CurrentUserContext";
import styled from "styled-components";
import { auth, googleAuthProvider } from "../firebase";
// import { signInWithGoogle } from "../firebase";

const SignIn = () => {
  const { dispatchCurrentUser } = useContext(CurrentUserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (state, setState) => {
    console.log(state);
    setState(state);
  };

  const signInWithGoogle = async (ev) => {
    // I am handling this myself, ie. by keep track of Login/Logout
    // Alternatively could use onAuthStateChanged(callback)
    // See my notes on Steve Kinney's firebase workshop
    // The function fires every time use logs IN/Logs out
    // So I could lift this function up to CurrentUsercontext, (I think)
    // Switched to Alternate option: More Elegant
    ev.preventDefault();
    try {
      const result = await auth.signInWithPopup(googleAuthProvider);
      const token = result.credential.accessToken;

      //Alternate option
      auth.onAuthStateChanged((user) => {
        console.log("Auth changed", user);
        if (user) {
          dispatchCurrentUser({ type: "sign-in", payload: { token, user } });
        } else {
          dispatchCurrentUser({ type: "sign-out", payload: { user } });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <SignInForm>
        <SignInEmail
          type="email"
          placeholder="Email"
          value={email}
          onChange={(ev) => {
            handleChange(ev.target.value, setEmail);
          }}
        ></SignInEmail>
        <SignInPass
          type="password"
          placeholder="Password"
          value={password}
          onChange={(ev) => {
            handleChange(ev.target.value, setPassword);
          }}
        ></SignInPass>
        <ButtonWrapper>
          <SignInButton>Log In</SignInButton>
          <SignInWithGoogleButton onClick={signInWithGoogle}>
            Sign In with Google
          </SignInWithGoogleButton>
        </ButtonWrapper>
      </SignInForm>
    </>
  );
};

const SignInForm = styled.form`
  border: 2px solid green;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2.5%;
`;

const SignInEmail = styled.input`
  width: 50%;
  border: none;
  border-bottom: 2px solid red;
  padding: 0.5%;
  margin: 1%;
`;

const SignInPass = styled.input`
  width: 50%;
  border: none;
  border-bottom: 2px solid red;
  padding: 0.5%;
  margin: 1%;
`;

const ButtonWrapper = styled.div`
  display: flex;
`;
const SignInButton = styled.button`
  flex-basis: 50%;
`;

const SignInWithGoogleButton = styled.button`
  flex-basis: 50%;
`;

export default SignIn;
