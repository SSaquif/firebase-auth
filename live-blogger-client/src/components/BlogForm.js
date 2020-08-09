import React, { useState, useContext } from "react";
import styled from "styled-components";
import { PostContext } from "./contexts/PostContext";

const BlogForm = () => {
  const { posts, setPosts } = useContext(PostContext);

  const [blogTitle, setBlogTitle] = useState("Title");
  const [blogBody, setBlogBody] = useState("What's on your mind");

  const handleChange = (ev, setState) => {
    setState(ev.target.value);
  };

  const handleClear = (ev) => {
    setBlogTitle("");
    setBlogBody("");
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const newPosts = [...posts];
    newPosts.push({ title: blogTitle, body: blogBody });
    console.log(newPosts);
    setPosts(newPosts);
  };

  return (
    <>
      <FormWrapper onSubmit={handleSubmit}>
        <TitleInput
          onChange={(ev) => handleChange(ev, setBlogTitle)}
          value={blogTitle}
        />
        <BodyInput
          onChange={(ev) => handleChange(ev, setBlogBody)}
          value={blogBody}
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
