// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwv596nWkRSkeECn8r7qLRVoOcUj_KHN0",
  authDomain: "bsa-events-72324.firebaseapp.com",
  projectId: "bsa-events-72324",
  storageBucket: "bsa-events-72324.firebasestorage.app",
  messagingSenderId: "51319498636",
  appId: "1:51319498636:web:37df7eaac94cf1c5c598a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };