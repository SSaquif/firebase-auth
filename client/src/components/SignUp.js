import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { CurrentUserContext } from "./contexts/CurrentUserContext";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { currentUser } = useContext(CurrentUserContext);

  const handleChange = (state, setState) => {
    console.log(state);
    setState(state);
  };

  return (
    <>
      {currentUser.userInfo ? (
        <Redirect to="/" />
      ) : (
        <>
          {" "}
          <SignUpForm>
            <SignUpEmail
              type="email"
              placeholder="Email"
              value={email}
              onChange={(ev) => {
                handleChange(ev.target.value, setEmail);
              }}
            ></SignUpEmail>
            <SignUpPass
              type="password"
              placeholder="Password"
              value={password}
              onChange={(ev) => {
                handleChange(ev.target.value, setPassword);
              }}
            ></SignUpPass>
            <SignUpPass
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(ev) => {
                handleChange(ev.target.value, setConfirmPassword);
              }}
            ></SignUpPass>
            <SignUpButton>Sign Up</SignUpButton>
          </SignUpForm>
        </>
      )}
    </>
  );
};

const SignUpForm = styled.form`
  border: 2px solid green;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2.5%;
`;
const SignUpEmail = styled.input`
  width: 50%;
  border: 2px solid red;
  padding: 0.5%;
  margin: 1%;
`;
const SignUpPass = styled.input`
  width: 50%;
  padding: 0.5%;
  margin: 1%;
`;
const SignUpButton = styled.button`
  width: 10%;
`;

export default SignUp;
