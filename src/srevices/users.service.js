import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import {
  collection,
  getFirestore,
  addDoc,
  getDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { app } from '../firebase';

// Initialize Firebase authentication and Firestore database
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

let isPopupOpen = false; // Flag to prevent multiple popup requests

// Function to sign in with Google
const signInWithGoogle = async () => {
  if (isPopupOpen) return; // Prevent multiple popups

  try {
    isPopupOpen = true; // Set the flag before opening the popup
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;

    // Reference to the Firestore user document
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    // If user does not exist in Firestore, create a new document
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
    }
  } catch (error) {
    if (error.code === 'auth/popup-blocked') {
      alert('Popup was blocked by the browser. Please allow popups and try again.');
    } else {
      console.error(error);
      alert(error.message);
    }
  } finally {
    isPopupOpen = false; // Reset the flag after the operation is complete
  }
};

// Function to log in with email and password
const logInWithEmailAndPassword = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // Reference to the Firestore user document
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    // If user does not exist in Firestore, create a new document
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// Function to register a new user with email and password
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // Reference to the Firestore user document
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    // If user does not exist in Firestore, create a new document
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        displayName: name,  // Use the provided name for displayName
        email: user.email,
        photoURL: user.photoURL,
      });
    }

    return res;  // Return the user credential
  } catch (err) {
    console.error(err);
    alert(err.message);
    throw err;  // Re-throw the error to handle it in the calling code
  }
};

// Function to send password reset email
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// Function to sign out the user
const logout = () => {
  signOut(auth);
};

// Export the authentication and Firestore functions
export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  sendEmailVerification,
};
