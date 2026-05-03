// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0tRLYpE1TUXpwcSyrlKOAOXaGcV8qoi8",
  authDomain: "home-nest-baa1f.firebaseapp.com",
  projectId: "home-nest-baa1f",
  storageBucket: "home-nest-baa1f.firebasestorage.app",
  messagingSenderId: "350092209153",
  appId: "1:350092209153:web:1fe6e738e507f047fda400"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);