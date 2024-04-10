// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApaPwcaKEgRJYDJV0FwWTsrOMRWAkGM38",
  authDomain: "abe-s-standards.firebaseapp.com",
  projectId: "abe-s-standards",
  storageBucket: "abe-s-standards.appspot.com",
  messagingSenderId: "57578780132",
  appId: "1:57578780132:web:d13b5998bfe478b5f983f1",
  measurementId: "G-S8DMZFXXP5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, analytics};
