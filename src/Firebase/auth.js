import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { createDocumentOnUserSignUp } from "./firestore.js";

const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  const auth = getAuth();
  await signInWithPopup(auth, provider)
    .then(async ({ user }) => {
      await createDocumentOnUserSignUp(user);
      return user;
    })
    .catch((error) => {
      console.error(error.message);
    });
  return null;
};
const signInWithEmail = async (email, password) => {
  const auth = getAuth();
  await signInWithEmailAndPassword(auth, email, password)
    .then(({ user }) => {
      return user;
    })
    .catch((error) => {
      console.error(error.message);
    });
  return null;
};
const signUpWithEmail = async (email, password, callbackUserExist) => {
  const auth = getAuth();
  await createUserWithEmailAndPassword(auth, email, password)
    .then(async ({ user }) => {
      await createDocumentOnUserSignUp(user);
      return user;
    })
    .catch((error) => {
      if (error.code == "auth/email-already-in-use") callbackUserExist();
      else {
        console.log(error.nessage);
      }
    });
  return null;
};
const signOut = async () => {
  const auth = getAuth();
  await auth.signOut();
};

export { signInWithGoogle, signInWithEmail, signUpWithEmail, signOut };
