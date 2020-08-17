import React, { useState, useEffect, createContext } from "react";
import allPosts from "../../data/posts";
import { firestore } from "../../firebase";

export const PostContext = createContext(null);

const PostContextProvider = ({ children }) => {
  const [posts, setPosts] = useState(null);
  const [toggleRefetch, setToggleRefetch] = useState(false);

  useEffect(() => {
    firestore
      .collection("posts")
      .get()
      .then((querySnapshot) => {
        console.log("QuerySnapshot", querySnapshot);

        const posts = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });

        console.log(posts);

        setPosts(posts);
      });
  }, [toggleRefetch]);

  return (
    <>
      <PostContext.Provider
        value={{ posts, setPosts, toggleRefetch, setToggleRefetch }}
      >
        {children}
      </PostContext.Provider>
    </>
  );
};

export default PostContextProvider;
