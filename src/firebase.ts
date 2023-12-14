import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyATs-55B6C3G-AAmIT3_k-dGQ8Q6fsZiEM",
  authDomain: "react-dictionary-travos.firebaseapp.com",
  projectId: "react-dictionary-travos",
  storageBucket: "react-dictionary-travos.appspot.com",
  messagingSenderId: "338381542016",
  appId: "1:338381542016:web:bbfa85236901482a384c65",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const imagesDB = getStorage(app);
