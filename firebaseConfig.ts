// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "XXXXX",
  authDomain: "XXXX",
  projectId: "XXXX",
  storageBucket: "XXXXX",
  messagingSenderId: "XXXXX",
  appId: "XXXX",
  measurementId: "XXXXX",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
