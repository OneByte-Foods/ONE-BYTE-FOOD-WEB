// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getDatabase } from "firebase/database";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { cookies } from "next/headers";

import { loginSuccess } from "../../redux/features/auth-slice";
import { setUser } from "../../redux/features/users-slice";

const firebaseConfig = {
  apiKey: "AIzaSyCBT_nA3MaVqdH0wejdtqlGAGuW0m6uXxg",
  authDomain: "one-bytes-backend.firebaseapp.com",
  databaseURL:
    "https://one-bytes-backend-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "one-bytes-backend",
  storageBucket: "one-bytes-backend.appspot.com",
  messagingSenderId: "971806294877",
  appId: "1:971806294877:web:8f77ef032d6cb1aa911eb4",
  measurementId: "G-2R5MFJDZ2Q",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);

const auth = getAuth(app);

const realDb = getDatabase(app);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;

    // Check if user document already exists in Firestore
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);

    // If user document doesn't exist, add it to Firestore
    if (docs.docs.length === 0) {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        username: user.displayName,
        imageUrl: user.photoURL,
        email: user.email,
        roles: ["user"],
      });
    }
    return user;
  } catch (err: any) {
    return err.message;
  }
};

const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      email: user.email,
      username: name,
      imageUrl: `https://ui-avatars.com/api/?name=${name}`,
      uid: user.uid,
      roles: ["user"],
    });
    return user;
  } catch (err: any) {
    return err.message;
  }
};

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;
    return user;
  } catch (err: any) {
    return err.message;
  }
};

const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  signOut(auth);
};

export {
  app,
  auth,
  db,
  realDb,
  registerWithEmailAndPassword,
  signInWithGoogle,
  logInWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
