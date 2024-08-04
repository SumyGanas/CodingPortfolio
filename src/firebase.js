import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyAyVHWeBUKUD7LV6MsVwCnyVR4lzFFvNHk",
    authDomain: "alpine-figure-414421.firebaseapp.com",
    projectId: "alpine-figure-414421",
    storageBucket: "alpine-figure-414421.appspot.com",
    messagingSenderId: "65938638422",
    appId: "1:65938638422:web:ae908d6502ff09f0a75df7",
    measurementId: "G-XTD0RPBS3N"
  };  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default db;

