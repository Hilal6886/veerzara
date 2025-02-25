import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { firestore } from '../firebase'; // Firestore still in use
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { uploadToCloudinary } from '../srevices/cloudinary'; // Import your Cloudinary function

const ImageUploadGallery = () => {
  const [uploading, setUploading] = useState(false);

  // Reference to your Firestore collection (for image metadata)
  const firestoreCollection = collection(firestore, 'campus gallary');

  const saveImageToFirestore = async (downloadURL) => {
    try {
      await addDoc(firestoreCollection, { url: downloadURL, createdAt: serverTimestamp() });
    } catch (error) {
      console.error('Error saving image to Firestore:', error);
    }
  };

  // Use Dropzone for file selection
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    onDrop: async (acceptedFiles) => {
      console.log('Accepted Files:', acceptedFiles);
      setUploading(true);
      // Loop through each selected file and upload to Cloudinary
      for (const file of acceptedFiles) {
        try {
          const downloadURL = await uploadToCloudinary(file);
          console.log('Uploaded file URL:', downloadURL);
          await saveImageToFirestore(downloadURL);
        } catch (error) {
          console.error('Error processing file:', file, error);
        }
      }
      setUploading(false);
    },
  });

  return (
    <div className="min-h-screen flex p-8 items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <div className="mt-8 p-8 bg-gray-100 max-w-2xl mx-auto rounded-lg shadow-xl">
        <h3 className="text-center text-gray-400 mb-[2rem] text-lg">
          Add Customer Gallery
        </h3>
        <div
          {...getRootProps()}
          className="dropzone border-dashed border-2 border-gray-400 p-8 text-center bg-white rounded-lg"
        >
          <input {...getInputProps()} />
          <p className="text-gray-600">
            Drag & drop some files here, or click to select files
          </p>
        </div>
        {uploading && <p className="mt-4 text-gray-800">Uploading...</p>}
      </div>
    </div>
  );
};

export default ImageUploadGallery;
