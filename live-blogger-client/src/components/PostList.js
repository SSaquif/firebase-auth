import React, { useContext } from "react";
import { PostContext } from "../components/contexts/PostContext";
import Post from "./Post";

function PostList() {
  const { posts } = useContext(PostContext);
  console.log(posts);

  return (
    <>
      {posts ? (
        posts.map((post, index) => {
          return <Post key={post.id} post={post} />;
        })
      ) : (
        <>Loading</>
      )}
    </>
  );
}

export default PostList;
