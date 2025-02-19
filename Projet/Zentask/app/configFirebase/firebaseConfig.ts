// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAy33P_VbRHwWfwiVoeB-pQr6KCGu-1KDc",
  authDomain: "zentask-774fc.firebaseapp.com",
  projectId: "zentask-774fc",
  storageBucket: "zentask-774fc.firebasestorage.app",
  messagingSenderId: "896700785289",
  appId: "1:896700785289:web:90c584382d2ac71f425c58"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };