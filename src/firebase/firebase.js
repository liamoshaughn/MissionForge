// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFlUbFOrJxFZfBzW0nEMqt2PbNS0eHfYk",
  authDomain: "warhammerdraw-52bd6.firebaseapp.com",
  projectId: "warhammerdraw-52bd6",
  storageBucket: "warhammerdraw-52bd6.appspot.com",
  messagingSenderId: "65532195891",
  appId: "1:65532195891:web:26c2f0b5dab1a662e55f46",
  measurementId: "G-P8SY7PGDTL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);