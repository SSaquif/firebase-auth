import React, { useState } from "react";
import styled from "styled-components";

import { firestore } from "../firebase";

const BlogForm = () => {
  const [blogTitle, setBlogTitle] = useState("Title");
  const [blogContent, setblogContent] = useState("What's on your mind");

  const handleChange = (ev, setState) => {
    setState(ev.target.value);
  };

  const handleClear = (ev) => {
    setBlogTitle("");
    setblogContent("");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const post = { title: blogTitle, content: blogContent };
    const docRef = await firestore.collection("posts").add(post);
    console.log(docRef);
  };

  return (
    <>
      <FormWrapper onSubmit={handleSubmit}>
        <TitleInput
          onChange={(ev) => handleChange(ev, setBlogTitle)}
          value={blogTitle}
        />
        <BodyInput
          onChange={(ev) => handleChange(ev, setblogContent)}
          value={blogContent}
        />
        <ButtonWrapper>
          <FormSubmitButton type="submit">Submit</FormSubmitButton>
          <FormClearButton type="reset" onClick={handleClear}>
            Clear
          </FormClearButton>
        </ButtonWrapper>
      </FormWrapper>
    </>
  );
};

const FormWrapper = styled.form`
  background-color: green;
  display: flex;
  flex-direction: column;
`;

const TitleInput = styled.input`
  color: green;
`;
const BodyInput = styled.textarea`
  color: green;
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const FormSubmitButton = styled.button`
  padding: 7px 10px;
  margin: 7px 10px 7px 0;
`;
const FormClearButton = styled.button`
  padding: 7px 10px;
  margin: 7px 10px 7px 0;
`;

export default BlogForm;
