import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const getAllOffers = async () => {
  const offersCollection = collection(db, "offers");
  const snapshot = await getDocs(offersCollection);
  const offers = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return offers;
};
