import { db } from "../firebase"; // Import Firebase config
import { collection, addDoc, getDoc, updateDoc, doc } from "firebase/firestore";

// Add a new package
export const addPackage = async (packageData) => {
  const packagesCollection = collection(db, "packages");
  const docRef = await addDoc(packagesCollection, packageData);
  return docRef.id;
};

// Get a package by ID
export const getPackageById = async (id) => {
  const docRef = doc(db, "packages", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    throw new Error("Package not found!");
  }
};

// Update a package
export const updatePackage = async (id, updatedData) => {
  const docRef = doc(db, "packages", id);
  await updateDoc(docRef, updatedData);
};
