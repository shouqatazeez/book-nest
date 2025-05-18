import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import axios from "axios";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyBgZZDn5B4dECeOUsGCdL9kGRJJYMDXKdI",
  authDomain: "bookify-712d1.firebaseapp.com",
  projectId: "bookify-712d1",
  storageBucket: "bookify-712d1.firebasestorage.app",
  messagingSenderId: "599559109980",
  appId: "1:599559109980:web:09c66f7461197cee301599",
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestorage = getFirestore(firebaseApp);
const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  const signupUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

  const signInWithEmailAndPass = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);

  const signinwithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);

  const handleCreateNewListing = async (name, isbn, price, coverFile) => {
    try {
      const formData = new FormData();
      formData.append("file", coverFile);
      formData.append("upload_preset", "bookcovers");
      formData.append("folder", "samples/ecommerce");
      const cloudinaryRes = await axios.post(
        "https://api.cloudinary.com/v1_1/djewtls9w/image/upload",
        formData
      );

      const imageUrl = cloudinaryRes.data.secure_url;

      // Step 2: Store listing data in Firestore
      await addDoc(collection(firestorage, "books"), {
        name,
        isbn,
        price,
        imageUrl,
        createdBy: user?.uid || "anonymous",
        createdAt: new Date(),
      });

      alert("✅ Book listing created successfully!");
    } catch (error) {
      console.error("❌ Error creating listing:", error);
      alert("Something went wrong while creating the listing.");
    }
  };

  const isLoggedIn = !!user;

  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        signInWithEmailAndPass,
        signinwithGoogle,
        handleCreateNewListing,
        isLoggedIn,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
