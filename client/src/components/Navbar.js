import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { CurrentUserContext } from "./contexts/CurrentUserContext";

const Navbar = () => {
  const { currentUser, handleSignOut } = useContext(CurrentUserContext);

  console.log(currentUser.userInfo);

  return (
    <>
      <NavWrapper>
        <Left>
          <NavItems to="/">Firebase Auth</NavItems>
        </Left>
        <Right>
          {currentUser.userInfo ? (
            <>
              <NavItems to="/">
                Hi, {currentUser.userInfo.user.displayName}
              </NavItems>
              <SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
            </>
          ) : (
            <>
              <NavItems to="/signin">Sign In</NavItems>
              <NavItems to="/signup">Sign Up</NavItems>
            </>
          )}
          <NavItems to="/multerFileUpload">Multer</NavItems>
          <NavItems to="/multerGridFileUpload">Multer+Grid</NavItems>
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
  border: 2px solid cyan;
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
  margin: 1%;
  cursor: pointer;
`;

const NavItems = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  margin: 1%;
  cursor: pointer;
`;

export default Navbar;
