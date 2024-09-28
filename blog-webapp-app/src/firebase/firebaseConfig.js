import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5ZdjalrnwZFyEvt-3nv50rtRR5Aj2-n8",
  authDomain: "blogapp-18b25.firebaseapp.com",
  projectId: "blogapp-18b25",
  storageBucket: "blogapp-18b25.appspot.com",
  messagingSenderId: "531456512903",
  appId: "1:531456512903:web:174690f2307003639cb922",
  measurementId: "G-E10FF4P61W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };