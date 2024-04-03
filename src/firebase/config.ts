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
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { cookies } from "next/headers";

const firebaseConfig = {
  apiKey: "AIzaSyCBT_nA3MaVqdH0wejdtqlGAGuW0m6uXxg",
  authDomain: "one-bytes-backend.firebaseapp.com",
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

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    localStorage.setItem("user", JSON.stringify(user));
    const q = query(
      collection(db, "Google_Account_Users"),
      where("uid", "==", user.uid)
    );
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "Google_Account_Users"), {
        uid: user.uid,
        username: user.displayName,
        imageUrl: user.photoURL,
        isAdmin: false,
        email: user.email,
      });
    }
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

    await addDoc(collection(db, "Random_Signin_Users"), {
      email: user.email,
      username: name,
      isAdmin: false,
      imageUrl: `https://ui-avatars.com/api/?name=${name}`,
      uid: user.uid,
    });
  } catch (err: any) {
    return err.message;
  }
};

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;
    localStorage.setItem("user", JSON.stringify(user));
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
  registerWithEmailAndPassword,
  signInWithGoogle,
  logInWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
