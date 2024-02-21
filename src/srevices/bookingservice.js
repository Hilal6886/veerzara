import { db } from '../firebase';
import { collection, getDocs,onSnapshot } from "firebase/firestore";

export const getAllBookings = async () => {
  const bookings = [];
  try {
    const querySnapshot = await getDocs(collection(db, "bookings"));
    querySnapshot.forEach((doc) => {
      bookings.push({ id: doc.id, ...doc.data() });
    });
  } catch (error) {
    console.error("Error getting bookings: ", error);
  }
  return bookings;
};

export const listenForAdmissionUpdates = (callback) => {
  const admissionsCollection = collection(db, "bookings");
  return onSnapshot(admissionsCollection, (snapshot) => {
    const admissionsData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(admissionsData);
  });
};
