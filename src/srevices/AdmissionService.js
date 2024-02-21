import { db } from "../firebase";
import { collection, getDocs,onSnapshot } from "firebase/firestore";

// Function to retrieve all admission form data from Firestore
export const getAllAdmissions = async () => {
  const admissionsCollection = collection(db, "admissions");
  const admissionsSnapshot = await getDocs(admissionsCollection);
  const admissionsData = admissionsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return admissionsData;
};

export const listenForAdmissionUpdates = (callback) => {
    const admissionsCollection = collection(db, "admissions");
    return onSnapshot(admissionsCollection, (snapshot) => {
      const admissionsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(admissionsData);
    });
  };