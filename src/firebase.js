// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEctRQhs4JZg6Fh4XjgIZpRhYT_H-UYKk",
  authDomain: "restaurant-auth-c7ca9.firebaseapp.com",
  projectId: "restaurant-auth-c7ca9",
  storageBucket: "restaurant-auth-c7ca9.appspot.com",
  messagingSenderId: "1072968252296",
  appId: "1:1072968252296:web:d284fe8ee9e9328beb583d",
  measurementId: "G-B947YD2JEC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// export const database = getAuth(app);
// const firestore = getFirestore(app);

// export { auth, firestore };
