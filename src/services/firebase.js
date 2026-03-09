import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyASqrCukypOUHg4ihHNF8IdPFLkArNWGio",
  authDomain: "ai-summarizer-24ad2.firebaseapp.com",
  projectId: "ai-summarizer-24ad2",
  storageBucket: "ai-summarizer-24ad2.firebasestorage.app",
  messagingSenderId: "675353776677",
  appId: "1:675353776677:web:e5dd0e373672434603a5cc",
  measurementId: "G-G63935KCWF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };