import React, { useContext, useState } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "./contexts/CurrentUserContext";
import who from "../assets/who-even-are-you.jpg";

function Profile() {
  const { currentUser } = useContext(CurrentUserContext);
  console.log(currentUser);
  const [file1, setfile1] = useState(null);
  const [text, setText] = useState("");

  const handleChange = (state, setState) => {
    setState(state);
  };

  const submitFiles = (ev) => {
    ev.preventDefault();
    const formData = new FormData();
    console.log(file1);
    formData.append("file1", file1);
    formData.append("text", text);

    for (let key of formData.entries()) {
      console.log(key);
      console.log(key[0] + ", " + key[1]);
    }

    fetch("/api/profile/updateProfile", {
      method: "POST",
      body: formData,
    });
  };

  const handleFileUpload = (ev) => {
    ev.preventDefault();
    console.log(ev.target.files[0]);
    setfile1(ev.target.files[0]);
  };

  return (
    <>
      {currentUser.userInfo ? (
        <>
          {" "}
          <ProfilePic src={currentUser.userInfo.user.photoURL} />
          <form encType="multipart/form-data" onSubmit={submitFiles}>
            <input type="file" name="file1" onChange={handleFileUpload} />
            <input
              type="tex"
              value={text}
              onChange={(ev) => handleChange(ev.target.value, setText)}
            />
            <button type="submit">Submit</button>
          </form>
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
