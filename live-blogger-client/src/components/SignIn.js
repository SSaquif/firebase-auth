import React, { useState } from "react";
import styled from "styled-components";
import { signInWithGoogle } from "../firebase";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (state, setState) => {
    console.log(state);
    setState(state);
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
