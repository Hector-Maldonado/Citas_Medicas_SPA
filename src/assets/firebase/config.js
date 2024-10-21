// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsB-scfpZCyG-z8tHIxkvZm5p2IvfGlF8",
  authDomain: "medical-appointments-8507b.firebaseapp.com",
  projectId: "medical-appointments-8507b",
  storageBucket: "medical-appointments-8507b.appspot.com",
  messagingSenderId: "314698996393",
  appId: "1:314698996393:web:7944ae2574137bd4dae7b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);