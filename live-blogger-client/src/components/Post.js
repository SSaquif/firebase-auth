import React from "react";
import styled from "styled-components";

const Post = ({ post: { id, title, content, user } }) => {
  const postDate = new Date().getDate();

  const handlePostDelete = () => {
    console.log(id);
  };

  return (
    <>
      <PostWrapper>
        {/* <PostDate>{postDate}</PostDate> */}
        <PostTitle>{title}</PostTitle>
        {user ? <PostAuthor>Author: {user.displayName}</PostAuthor> : <></>}
        <PostBody>{content}</PostBody>
        <ButtonWrapper>
          <PostStarButton>Star</PostStarButton>
          <PostDeleteButton onClick={handlePostDelete}>Delete</PostDeleteButton>
        </ButtonWrapper>
      </PostWrapper>
    </>
  );
};

const PostWrapper = styled.div`
  padding: 10px 50px;
  border: 2px solid purple;
`;

const PostDate = styled.div`
  padding: 10px 50px;
`;

const PostTitle = styled.div`
  font-size: 2.5em;
`;

const PostBody = styled.div`
  border: 2px solid blue;
`;

const PostAuthor = styled.div`
  color: red;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const PostStarButton = styled.button`
  padding: 7px 10px;
  margin: 7px 10px 7px 0;
`;

const PostDeleteButton = styled.button`
  padding: 7px 10px;
  margin: 7px 10px 7px 0;
`;

export default Post;
