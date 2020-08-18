import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { CurrentUserContext } from "./contexts/CurrentUserContext";

const Navbar = () => {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <>
      <NavWrapper>
        <Left>
          <NavItems to="/">SS-Blog</NavItems>
        </Left>
        <Right>
          {currentUser.signedIn ? (
            <>Profile</>
          ) : (
            <>
              <NavItems to="/login">Log In</NavItems>
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

const NavItems = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  margin: 0.5%;
`;

export default Navbar;
