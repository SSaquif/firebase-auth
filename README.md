# Firebase Auth

:exclamation: :exclamation: Please DO NOT copy and paste code. Very Important you understand what's going on. :exclamation: :exclamation:

:exclamation: :exclamation: :exclamation: :exclamation:
I have updated this repo on August 24 10:00 PM.

1.  onAuthStateChanged() is now only called in the useEffect, it is unnecessary to have anywhere else as that listener will trigger anytime a signIn or a signOut happens

2.  added express server and mongodb. So when user signs in using google, and if it's the first time then their info is stored in the mongoDB database.

3.  The Readme still has not been updated to reflect this changes

:exclamation: :exclamation: exclamation: :exclamation:

Please follow [Scott's Repo](https://github.com/cb-i-4/m6-3-dbs--firebase) on how to first configure [firebase](https://firebase.google.com/) through your browser and receive your config info, if u haven't already.

_This is basically my flow when I work with firebase auth. So there could be issues I have not faced :stuck_out_tongue_closed_eyes:_

## Contents

- [Set Up Configuration](#Set-Up-Configuration)
- [Setting up CurrentUserContext](#Setting-Up-CurrentUserContext)
- [Getting Started with Auth](#Getting-Started-with-Auth)
  - [Signing In](#Signing-In)
  - [Signing Out](#Signing-Out)
  - [Some Persistance](#Some-Persistance)
- [What's Next](#What's-Next)
- [Notes](#Notes)

## Set Up Configuration

Create a **firebaseConfig.js** file and put your firebase configurations there and export it. Add this file to .gitignore. [But google tells me it's safe to not hide your API keys for firebase](https://stackoverflow.com/questions/37482366/is-it-safe-to-expose-firebase-apikey-to-the-public). So you might not actually have to put it in .gitignore, but just to be safe. You also might not need all of these properties.

```javascript
const firebaseConfig = {
  apiKey: "__________________",
  authDomain: "__________________",
  databaseURL: "__________________",
  projectId: "__________________",
  storageBucket: "__________________",
  messagingSenderId: "__________________",
  appId: "__________________",
  measurementId: "__________________",
};

export default firebaseConfig;
```

In your **firebase.js** now we import firebase, firebase auth and set up all the other things. See the file **firebase.js**

```javascript
// Import firebase and firebase auth
import firebase from "firebase/app";
import "firebase/auth";
//Import firebaseConfig from our hidden file
import firebaseConfig from "./firebaseConfig";

//Initialize firebase
firebase.initializeApp(firebaseConfig);

//Set firebase auth and export it
export const auth = firebase.auth();
//Get google auth provider (There are simialr ones for fb, github etc), export it
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
//export firebase
export default firebase;
```

## Setting Up CurrentUserContext

_You could use Redux or any othe state management library as well_

I am using a reducer to handle my currentUser state. There are three cases right now.
See the **CurrentUserContext.js** file.

1. signing in
2. signing out
3. app refresh (we need this for some persistance, you dont want to have to log in every single time you leave and come back)

## Getting Started with Auth

Next we need 2 functions, one for signing in and another for signing out. Then we will pass them through our context provider, so that our Sign In and Sign Out buttons located elsewhere can use them.

### Signing In

So here we will use 2 functions from firebase auth.

1. **signInWithPopup(googleAuthProvider):** We pass it the googleAuthProvider that we import at the begining. This shows the pop up on the screen. The once you choose your account, that's it you are signed in.

2. **onAuthStateChanged(callback):** This function is basically where the magic happens. This function is kind of like an Event Listener, in that it is listening for changes in the authentication state. In the callback of this function, you have access to the user object generated when you sign in or sign out. Everytime a sign in or sign out event occurs, this function runs. It returns a user object with a lot of properties (not all of them useful, but **DEFINITELY** check it out) when you sign in. It returns **null** when the user signs out. We store this user object or null in our React state by doing a dispatch to the reducer. Next we move back to the home page using history.push('/').

```javascript
const signInWithGoogle = async (ev) => {
  ev.preventDefault();
  try {
    await auth.signInWithPopup(googleAuthProvider);

    auth.onAuthStateChanged((user) => {
      console.log("Auth state changed", user);
      if (user) {
        dispatchCurrentUser({ type: "sign-in", payload: { user } });
      } else {
        dispatchCurrentUser({ type: "sign-out", payload: { user } });
      }
      history.push("/");
    });
  } catch (err) {
    console.log(err);
  }
};
```

Next we just use the sign out function where we need it. In this cause the Sign In button on the NavBar component. See **SignIn.js**

```javascript
<SignInWithGoogleButton onClick={signInWithGoogle}>
```

### Signing Out

We will use our third function from firebase auth when signing out.

3. **signOut()**: As the name suggests, it signs you out and triggers the **callback of onAuthStateChanged()**, causing the user to become null. As seen above.

```javascript
const handleSignOut = async (ev) => {
  ev.preventDefault();
  auth.signOut();
  history.push("/");
};
```

We then call it on the sign out button in the **Navbar** component. See **Navbar.js**

```javascript
<SignOutButton onClick={handleSignOut}>Sign Out</SignOutButton>
```

### Some Persistance

You don't want to have to sign in a million times a day. Therefore we want some persistance. If we leave the page and comback, the app will render again. So we will fire up an **useEffect()** back in our context. See **CurrentUserContext.js**

In the useEffect() we will once again use the auth.onAuthStateChanged() function and this time store it's result in a variable (named unlisten in this case). onAuthStateChanged() returns a function , which we clear when our Context Provider unmounts. So we call unlisten() in the return of our useEffect() and clean up our listener and prevent any memory leak.

```javascript
useEffect(() => {
  const unlisten = auth.onAuthStateChanged((user) => {
    console.log(user);
    dispatchCurrentUser({ type: "app-refresh", payload: { user } });
  });

  return () => {
    unlisten();
  };
}, []);
```

## What's Next

Now our React State will update everytime the user logs in or out. We can use this information in other components to render them accordingly. See Navbar, Profile, even the redirection in SignIn and SignOut

When the user is logged in, we should be able to access some unique information about said user. For example the email and uid (I beleive this is unique, not sure if it changes). And perhaps this user wants to make a HTTP request (fetch) to the backend server, perhaps to retrieve some info from your mongo database. But maybe you want to make sure that the user actually has the right to retrieve that information. So when someone first make a post etc that adds/updates something in the database you also probably want to store the uid/email along with it. Next time you retrieve it, in your fetch you should also include this information and check against the database to make sure if you can send back that information.

## Notes

You can run this app after to **add a firebaseConfig.js file in the src folder**, and find out who you are thanks to google :grin:

The sign in and sign up using email doesn't work. If you want you can play around with that, but I suggest you work on the project.
