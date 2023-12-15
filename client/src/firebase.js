// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "donermeg.firebaseapp.com",
  projectId: "donermeg",
  storageBucket: "donermeg.appspot.com",
  messagingSenderId: "309969071743",
  appId: "1:309969071743:web:106641cf6ae9e868b6994a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);