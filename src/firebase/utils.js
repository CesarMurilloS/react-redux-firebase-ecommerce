import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(GoogleProvider);

export const handleUserProfile = async (userAuth, additionalData) => {
  //Takes the userAuth object
  if (!userAuth) return;
  //Get the user id
  const { uid } = userAuth;

  //Checks if the user exists in our users collection in our users firebase
  const userRef = firestore.doc(`users/${uid}`);
  const snapshot = await userRef.get();

  //If user doesnt exists
  if (!snapshot.exists) {
      const { displayName, email } = userAuth;
      const timestamp = new Date();

      //We register them, we create a new document in our users collection
      try {
        //Store the user information
      await userRef.set({
          displayName,
          email,
          createdDate: timestamp,
          ...additionalData
      });
      } catch(err) {
      // console.log(err);
      }
  }
  //Regardless of the registration, we return the userRef document that we can use to store user information to actually sign them in
  return userRef;
};