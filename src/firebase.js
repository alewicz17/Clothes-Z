// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBa_wvQXKC0WSJ4rtpiOC0rJ3ieiN2D6Ew",
  authDomain: "clothes-z.firebaseapp.com",
  projectId: "clothes-z",
  storageBucket: "clothes-z.appspot.com",
  messagingSenderId: "9091538088",
  appId: "1:9091538088:web:ba1ed63fb2fec8bdb3369d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth(app) 
export const googleProvider = new GoogleAuthProvider()
export const db= getFirestore(app)
export const storage = getStorage(app)