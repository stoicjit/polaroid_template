import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBi8vmnzItX6TODb0EkVcH-6LJVDjO8axE",
  authDomain: "wedding-memory-app-46ee4.firebaseapp.com",
  projectId: "wedding-memory-app-46ee4",
  storageBucket: "wedding-memory-app-46ee4.firebasestorage.app",
  messagingSenderId: "566067509613",
  appId: "1:566067509613:web:7f791b2ca2494126990264",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
