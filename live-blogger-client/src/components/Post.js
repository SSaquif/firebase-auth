import React from "react";
import styled from "styled-components";

const Post = ({ post }) => {
  return (
    <>
      <PostWrapper>
        <PostTitle>{post.title}</PostTitle>
        <PostBody>{post.body}</PostBody>
      </PostWrapper>
    </>
  );
};

const PostWrapper = styled.div`
  padding: 10px 50px;
`;

const PostTitle = styled.div`
  font-size: 2.5em;
`;

const PostBody = styled.div`
  border: 2px solid blue;
`;

export default Post;
