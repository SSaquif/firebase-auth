import React from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Profile from "./Profile";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Profile />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
      </Switch>
    </>
  );
};

export default App;