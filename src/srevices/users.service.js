


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
  import { app } from '../firebase'

   

const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();


const signInWithGoogle = async () => {
  try {
  
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;

  
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

  
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
    }
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
const res= await signInWithEmailAndPassword(auth, email, password);
        
    console.log("signInWithEmailAndPassword",res)
    const user = res.user;
    
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
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
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

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

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};
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

                                                                                                                                                                                  