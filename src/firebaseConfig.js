// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword  } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAy0YbwAESk1pkhjQMPPOAkET2Y4wH70OE",
  authDomain: "auctionex-62baa.firebaseapp.com",
  databaseURL: "https://auctionex-62baa-default-rtdb.firebaseio.com",
  projectId: "auctionex-62baa",
  storageBucket: "auctionex-62baa.appspot.com",
  messagingSenderId: "372065506219",
  appId: "1:372065506219:web:58980b1fdf730c5be4f8ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const storage = getStorage(app);
