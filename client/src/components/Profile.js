import React, { useContext, useState } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "./contexts/CurrentUserContext";
import who from "../assets/who-even-are-you.jpg";

function Profile() {
  const { currentUser } = useContext(CurrentUserContext);
  console.log(currentUser);

  return (
    <>
      {currentUser.userInfo ? (
        <>
          {" "}
          <ProfilePic src={currentUser.userInfo.user.photoURL} />
        </>
      ) : (
        <ProfilePic src={who} style={{ width: "35%" }} />
      )}
    </>
  );
}

const ProfilePic = styled.img`
  border-radius: 50%;
  display: flex;
  margin: 2.5% auto;
  border: 4px solid green;
`;
export default Profile;
