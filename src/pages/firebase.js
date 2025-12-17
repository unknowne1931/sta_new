// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3u0UFeAhoAAnsaHzYHj6knVMDwn11OJk",
  authDomain: "stawro-storage.firebaseapp.com",
  projectId: "stawro-storage",
  storageBucket: "stawro-storage.appspot.com", // Corrected .app to .app**spot**.com
  messagingSenderId: "929500283784",
  appId: "1:929500283784:web:7c57263e278cec4dfdb03d",
  measurementId: "G-P5WVNCMEGX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Auth
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Export for use in Signup/Login
export { auth, provider, signInWithPopup };
