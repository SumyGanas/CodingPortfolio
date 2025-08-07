import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAyVHWeBUKUD7LV6MsVwCnyVR4lzFFvNHk",
  authDomain: "alpine-figure-414421.firebaseapp.com",
  databaseURL: "https://alpine-figure-414421-default-rtdb.firebaseio.com",
  projectId: "alpine-figure-414421",
  storageBucket: "alpine-figure-414421.firebasestorage.app",
  messagingSenderId: "65938638422",
  appId: "1:65938638422:web:59cfdc6ea5ecba80a75df7",
  measurementId: "G-GZVSWFBF1G"
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

let db;
const getDb = () => {
  if (!db) {
    throw new Error("Firestore not initialized yet. Wait for sign-in.");
  }
  return db;
};

const auth = getAuth(firebaseApp);
signInAnonymously(auth)
  .then(() => {
    db = getFirestore(firebaseApp);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

const analytics = getAnalytics(firebaseApp);

export { auth, getDb };

