import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBtN5xFsKvcf1aRgRESoewmPOVS5h6GGUU",
  authDomain: "vumo-movie.firebaseapp.com",
  projectId: "vumo-movie",
  storageBucket: "vumo-movie.appspot.com",
  messagingSenderId: "787012225149",
  appId: "1:787012225149:web:e22237232c84ec0cde4914",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { db, auth };
