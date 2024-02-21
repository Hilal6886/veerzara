

import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const fetchFaqs = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'faqs'));
    const faqs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log('Fetched faqs:', faqs); // Add this line for debugging
    return faqs;
  } catch (error) {
    console.error('Error fetching faqs:', error);
    throw error;
  }
};
export const updateFaq = async (faqId, newData) => {
    try {
      const faqRef = doc(collection(db, 'faqs'), faqId);
      await updateDoc(faqRef, newData);
      console.log('FAQ updated successfully');
    } catch (error) {
      console.error('Error updating FAQ:', error);
      throw error;
    }
  };






