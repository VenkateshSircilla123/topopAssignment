// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAaWLEUH3xoud-JigrMfOgDVzyBhJJpBs",
  authDomain: "topop-assignment.firebaseapp.com",
  projectId: "topop-assignment",
  storageBucket: "topop-assignment.appspot.com",
  messagingSenderId: "256648278429",
  appId: "1:256648278429:web:5c7de8e93014d38f453f74",
  measurementId: "G-JWR97YXJES",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);
const auth = getAuth(app);

export { database, auth };
