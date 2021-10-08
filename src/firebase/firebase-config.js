// Import the functions you need from the SDKs you need
import { GoogleAuthProvider } from "@firebase/auth";
import {initializeApp} from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// import 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuxRmQhKOtzEMjvW0yMBZg2W-myH-Nlk0",
  authDomain: "react-journal-app-24cbb.firebaseapp.com",
  projectId: "react-journal-app-24cbb",
  storageBucket: "react-journal-app-24cbb.appspot.com",
  messagingSenderId: "900783424987",
  appId: "1:900783424987:web:08a92d9795d7dcba1093fe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

const googleAuthProvider = new GoogleAuthProvider();

export {
    db, googleAuthProvider
};