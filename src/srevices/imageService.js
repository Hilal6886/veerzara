// ImageService.js
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust the import path based on your actual structure

export const fetchImagesFromFirestore = async () => {
  try {
    const imagesCollection = collection(db, 'campus gallary'); // Use db instead of firestore
    const querySnapshot = await getDocs(imagesCollection);

    const images = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        url: data.url,
        createdAt: data.createdAt.toDate(),
      };
    });

    return images;
  } catch (error) {
    console.error('Error fetching images from Firestore:', error);
    return [];
  }
};
