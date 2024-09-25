// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "morning-bugs.firebaseapp.com",
  projectId: "morning-bugs",
  storageBucket: "morning-bugs.appspot.com",
  messagingSenderId: "628419589030",
  appId: "1:628419589030:web:7d1b57c960c6dfa5595567",
  measurementId: "G-EENX0SC9MJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);