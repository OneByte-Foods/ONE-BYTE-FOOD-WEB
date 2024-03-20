// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCH85ap4XtQ4r_vVLgNM45vjcPv8468D4Y",
  authDomain: "onebyte-food.firebaseapp.com",
  projectId: "onebyte-food",
  storageBucket: "onebyte-food.appspot.com",
  messagingSenderId: "858217290562",
  appId: "1:858217290562:web:bcb449c894b851ce07c6db",
  
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);

export {app, auth}