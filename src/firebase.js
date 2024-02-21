 
import { initializeApp } from "firebase/app";


import { getAuth} from "firebase/auth";
import{getFirestore} from 'firebase/firestore';


import { getStorage, ref } from 'firebase/storage';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtjcb64zTEpV6_wfLXPvS1nyZFYiQ4sYg",
  authDomain: "sjtourand-travels.firebaseapp.com",
  projectId: "sjtourand-travels",
  storageBucket: "sjtourand-travels.appspot.com",
  messagingSenderId: "681241804837",
  appId: "1:681241804837:web:9062b392ecd0f0c0c67fcc",
  measurementId: "G-8WRW9TH0F1"
};


  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);
  const firestore = getFirestore(app);
  
  export { app, auth, db, storage, ref,firestore  };


 