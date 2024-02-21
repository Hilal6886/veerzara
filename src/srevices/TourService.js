

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const  getAllTours = async () => {
  const toursCollection = collection(db, "tours");
  const snapshot = await getDocs(toursCollection);
  const tours = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return tours;
};


