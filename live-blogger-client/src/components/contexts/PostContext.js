import React, { useState, useEffect, createContext } from "react";
import allPosts from "../../data/posts";
import { firestore } from "../../firebase";

export const PostContext = createContext(null);

const PostContextProvider = ({ children }) => {
  const [posts, setPosts] = useState(null);
  const [toggleRefetch, setToggleRefetch] = useState(false);

  // useEffect(() => {
  //   firestore
  //     .collection("posts")
  //     .get()
  //     .then((querySnapshot) => {
  //       console.log("QuerySnapshot", querySnapshot);

  //       const posts = querySnapshot.docs.map((doc) => {
  //         return { id: doc.id, ...doc.data() };
  //       });

  //       console.log(posts);

  //       setPosts(posts);
  //     });
  // }, [toggleRefetch]);

  //using onSnapshot() OVER get()
  //unlike get, callback of the onSnapshot() will run everytime firestore is updated
  //onSnapshot() returns a function we call to unsubscribe from listening to updates in firestore
  useEffect(() => {
    const unsubscribe = firestore
      .collection("posts")
      .onSnapshot((querySnapshot) => {
        //Inside callback we define,
        //What to do everytime the data changes in firestore
        const posts = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });

        setPosts(posts);
      });

    const componentWillUnmount = () => {
      unsubscribe();
    };

    return componentWillUnmount;
  }, []);

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
