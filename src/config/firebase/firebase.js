// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD_iDkOEQigxi7fvqXhOwkXaTdixxx80FU",
    authDomain: "memorious-b42f0.firebaseapp.com",
    projectId: "memorious-b42f0",
    storageBucket: "memorious-b42f0.appspot.com",
    messagingSenderId: "206783941837",
    appId: "1:206783941837:web:915d9f1a1b6a2a63cfed84",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
