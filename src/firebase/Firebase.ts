import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDojU4QJveI5J-XoMLbrzpDsoQaJl-Yln8",
  authDomain: "social-media-manage-3a16d.firebaseapp.com",
  projectId: "social-media-manage-3a16d",
  storageBucket: "social-media-manage-3a16d.appspot.com",
  messagingSenderId: "366523069778",
  appId: "1:366523069778:web:f8e554291029cbc0c7768b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
