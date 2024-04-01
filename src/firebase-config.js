// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgk5Qv6lnIUXxlwQEJ8PZu_Q5gdx0MXBE",
  authDomain: "sistema-presenca-mack.firebaseapp.com",
  projectId: "sistema-presenca-mack",
  storageBucket: "sistema-presenca-mack.appspot.com",
  messagingSenderId: "898672488940",
  appId: "1:898672488940:web:74c8ba60a470ba08bcd0c9",
  measurementId: "G-Y77SW5PQT4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
