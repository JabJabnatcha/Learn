// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore,enableIndexedDbPersistence } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7aoWa8JDNfgUES-QFZCRkPMLDb22lIvg",
  authDomain: "dnd-react-93168.firebaseapp.com",
  projectId: "dnd-react-93168",
  storageBucket: "dnd-react-93168.firebasestorage.app",
  messagingSenderId: "355509900268",
  appId: "1:355509900268:web:dd86c5204af0814a0fe6c9",
  measurementId: "G-KZ24BH0LXN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firestore
export const db = getFirestore(app);

// เปิด Offline Persistence
// enableIndexedDbPersistence(db).catch((err) => {
//   console.log("Offline persistence failed:", err.code);
// });