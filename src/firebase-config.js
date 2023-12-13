
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfUEDExvbVE-QpqgWVE5kZCblzHsfTuKQ",
  authDomain: "chatapp-64627.firebaseapp.com",
  projectId: "chatapp-64627",
  storageBucket: "chatapp-64627.appspot.com",
  messagingSenderId: "519369387737",
  appId: "1:519369387737:web:65894da7767cb3ea4918c8"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);