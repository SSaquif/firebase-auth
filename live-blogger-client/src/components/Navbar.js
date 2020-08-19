import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { CurrentUserContext } from "./contexts/CurrentUserContext";
import { auth } from "../firebase";

const Navbar = () => {
  const { currentUser, dispatchCurrentUser } = useContext(CurrentUserContext);

  const handleSignOut = async (ev) => {
    ev.preventDefault();
    console.log("hello");
    const result = auth.signOut();
    console.log(result);
  };

  console.log(currentUser.userInfo);
  return (
    <>
      <NavWrapper>
        <Left>
          <NavItems to="/">SS-Blog</NavItems>
        </Left>
        <Right>
          {currentUser.userInfo ? (
            <>
              <p>Hi {currentUser.userInfo.user.displayName}</p>
              <NavItems to="/">Profile</NavItems>
              <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
            </>
          ) : (
            <>
              <NavItems to="/login">Sign In</NavItems>
              <NavItems to="/SignUp">Sign Up</NavItems>
            </>
          )}
        </Right>
      </NavWrapper>
    </>
  );
};

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Left = styled.div`
  color: red;
  flex: 1;
`;

const Right = styled.div`
  color: blue;
  flex: 1;
  display: flex;
  justify-content: flex-end;
  border: 2px solid red;
`;

const SignOutButton = styled.button`
  all: unset;
  color: inherit;
  -webkit-text-fill-color: inherit;
  margin: 0.5%;
  cursor: pointer;
`;

const NavItems = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  margin: 1%;
  cursor: pointer;
`;

export default Navbar;
