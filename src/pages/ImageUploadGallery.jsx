
import { getDownloadURL, uploadBytesResumable,} from "firebase/storage";
import React, { useState, } from 'react';
import { useDropzone } from 'react-dropzone';
import { storage, ref,firestore } from '../firebase'; // Adjust the import path based on your actual structure
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';


const ImageUploadGallery = () => {

  const [uploading, setUploading] = useState(false);

  const imagesRef = ref(storage, 'images');

  const firestoreCollection = collection(firestore, 'campus gallary'); // Replace 'your_collection_name' with your actual collection name



  const saveImageToFirestore = async (downloadURL) => {
    try {
      await addDoc(firestoreCollection, { url: downloadURL, createdAt: serverTimestamp() });
    } catch (error) {
      console.error('Error saving image to Firestore:', error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    onDrop: (acceptedFiles) => {
      console.log('Accepted Files:', acceptedFiles);
      setUploading(true);
      acceptedFiles.forEach((file) => {
        const storageRef = ref(imagesRef, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          },
          (error) => {
            console.error(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            saveImageToFirestore(downloadURL); // Save image metadata to Firestore
         
            setUploading(false);
          }
        );
      });
    },
  });

  return (
    <div className="min-h-screen flex p-8 items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <div className="mt-8 p-8 bg-gray-100 max-w-2xl mx-auto rounded-lg shadow-xl">
        <h3 className="text-center text-gray-400 mb-[2rem] text-lg"> Add Customer Gallery</h3>
        <div {...getRootProps()} className="dropzone border-dashed border-2 border-gray-400 p-8 text-center bg-white rounded-lg">
          <input {...getInputProps()} />
          <p className="text-gray-600">Drag & drop some files here, or click to select files</p>
        </div>
        {uploading && <p className="mt-4 text-gray-800">Uploading...</p>}
       
      </div>
    </div>
  );
};

export default ImageUploadGallery;



