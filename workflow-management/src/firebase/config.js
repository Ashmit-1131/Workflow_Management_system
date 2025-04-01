// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID",
// };

const firebaseConfig = {
    apiKey: "AIzaSyACsI4yk53LmWuWHfAGvqEpPmEgwe0qP0o",
    authDomain: "workflow-manager-2be07.firebaseapp.com",
    projectId: "workflow-manager-2be07",
    storageBucket: "workflow-manager-2be07.firebasestorage.app",
    messagingSenderId: "919094217477",
    appId: "1:919094217477:web:e64057e1fbbca9ad8d056c",
    measurementId: "G-HYCGC9QF2X"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase authentication and Firestore instances
export const auth = getAuth(app);
export const db = getFirestore(app);
