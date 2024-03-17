// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbhFdC9Dd0XqU8QgUAnHE7ShsYWr9uoVU",
  authDomain: "fusionhub-6d561.firebaseapp.com",
  projectId: "fusionhub-6d561",
  storageBucket: "fusionhub-6d561.appspot.com",
  messagingSenderId: "993047104533",
  appId: "1:993047104533:web:1ff4c7334fb473d6c1121c"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db };

export default firebaseApp;