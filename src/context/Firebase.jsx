import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyBgZZDn5B4dECeOUsGCdL9kGRJJYMDXKdI",
  authDomain: "bookify-712d1.firebaseapp.com",
  projectId: "bookify-712d1",
  storageBucket: "bookify-712d1.firebasestorage.app",
  messagingSenderId: "599559109980",
  appId: "1:599559109980:web:09c66f7461197cee301599",
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFirebase = () => useContext(FirebaseContext);

// eslint-disable-next-line no-unused-vars
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {
  const signupUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

  const signInWithEmailAndPass = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);

  const signinwithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);

  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        signInWithEmailAndPass,
        signinwithGoogle,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
