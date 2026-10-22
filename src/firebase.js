
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBotMJltd-7GYkiCT9_l2nSK0FaP9cT8AI",
  authDomain: "all-star-united-cricket.firebaseapp.com",
  projectId: "all-star-united-cricket",
  storageBucket: "all-star-united-cricket.firebasestorage.app",
  messagingSenderId: "102256545172",
  appId: "1:102256545172:web:13e4f1e7c031cab33d5381",
  measurementId: "G-MFLFMRQMP8"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
