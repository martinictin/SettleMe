// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqBlxP35uEtc6Vb-GxPIqDe4HMo0MAAuc",
  authDomain: "settleme-e4d99.firebaseapp.com",
  projectId: "settleme-e4d99",
  storageBucket: "settleme-e4d99.appspot.com",
  messagingSenderId: "219423936459",
  appId: "1:219423936459:web:3e1147bf7bc55f5268f04e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
