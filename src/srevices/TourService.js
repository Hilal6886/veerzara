import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

// Fetch all tours
export const getAllTours = async () => {
  const toursCollection = collection(db, "tours");
  const snapshot = await getDocs(toursCollection);
  const tours = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return tours;
};

// Fetch related tours (excluding the current one)
export const getRelatedTours = async (currentTourId) => {
  const toursCollection = collection(db, "tours");
  const snapshot = await getDocs(toursCollection);

  // Filter out the current tour
  const relatedTours = snapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .filter((tour) => tour.id !== currentTourId);

  return relatedTours;
};
