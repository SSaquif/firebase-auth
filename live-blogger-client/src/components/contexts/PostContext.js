import React, { useState, useEffect, createContext } from "react";
import allPosts from "../../data/posts";

export const PostContext = createContext(null);

const PostContextProvider = ({ children }) => {
  const [posts, setPosts] = useState(allPosts);

  useEffect(() => {}, []);

  return (
    <>
      <PostContext.Provider value={{ posts, setPosts }}>
        {children}
      </PostContext.Provider>
    </>
  );
};

export default PostContextProvider;
