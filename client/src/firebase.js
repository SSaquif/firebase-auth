// Your web app's Firebase configuration
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";

// if (process.env.NODE_ENV === "development") {
//   window.firebase = firebase;
// }

//Initialize firebase
firebase.initializeApp(firebaseConfig);

//Get Authentication
export const auth = firebase.auth();

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// FireStore Settings for correct dates
// PROBABLY DONT NEED THIS ANYMORE WITH NEWER VERSIONS
// firestore.settings = { timestampsInSnapshots: true };

export default firebase;
