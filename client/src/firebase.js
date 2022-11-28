// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnFzvQIrbpdEgxpIKMAi6pkAUpVMgZpZ0",
  authDomain: "video-18314.firebaseapp.com",
  projectId: "video-18314",
  storageBucket: "video-18314.appspot.com",
  messagingSenderId: "746362355288",
  appId: "1:746362355288:web:4a0d5772a528710ed5d42d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;