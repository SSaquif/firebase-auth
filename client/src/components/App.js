import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "./Navbar";
import MulterFileUpload from "./MulterFileUpload";
import GridFileUpload from "./GridFileUpload";
import Profile from "./Profile";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { CurrentUserContext } from "./contexts/CurrentUserContext";

const App = () => {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <>
      {!currentUser.loading ? (
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
            <Route path="/multerFileUpload">
              <MulterFileUpload />
            </Route>
            <Route path="/multerGridFileUpload">
              <GridFileUpload />
            </Route>
          </Switch>
        </>
      ) : (
        <>Loading</>
      )}
    </>
  );
};

export default App;
