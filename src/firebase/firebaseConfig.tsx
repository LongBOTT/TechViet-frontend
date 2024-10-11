// firebaseConfig.tsx
import firebase from "firebase/compat/app";
import "firebase/compat/auth"

const firebaseConfig = {
  apiKey: "AIzaSyC7uRZpJMRMr_t0sLUNF8SfNXWv4O5lIek",
  authDomain: "techviet-8828c.firebaseapp.com",
  projectId: "techviet-8828c",
  storageBucket: "techviet-8828c.appspot.com",
  messagingSenderId: "130984826911",
  appId: "1:130984826911:web:53218db7387cf92bf95d2a",
  measurementId: "G-5JG3985Z0J",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
export default firebase;