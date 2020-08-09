import React, { useContext } from "react";
import BlogForm from "./BlogForm";
import Post from "./Post";
import { PostContext } from "../components/contexts/PostContext";

const App = () => {
  const { posts } = useContext(PostContext);
  return (
    <>
      <BlogForm />
      {posts.map((post, index) => {
        return <Post post={post} key={index} />;
      })}
    </>
  );
};

export default App;
