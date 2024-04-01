// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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

export { app, auth, db };
