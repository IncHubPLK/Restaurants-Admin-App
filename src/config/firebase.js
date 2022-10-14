// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAE-D6AKLx5JA2b_HOddjzXwwg3cALNzLc",

  authDomain: "authreactnative-6ac92.firebaseapp.com",

  projectId: "authreactnative-6ac92",

  storageBucket: "authreactnative-6ac92.appspot.com",

  messagingSenderId: "440450292411",

  appId: "1:440450292411:web:1309e4f1179eeb76a0279e",

  measurementId: "G-2SCDC337CE"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)
const analytics = getAnalytics(app);
const storage = getStorage(app)

export {auth,db,storage,analytics}