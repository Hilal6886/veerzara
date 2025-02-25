

// ImageGallery.js
import React, { useEffect, useState } from 'react';
import { fetchImagesFromFirestore } from 'srevices/imageService';
const Allimages = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        console.log('Before fetching images');
        const fetchedImages = await fetchImagesFromFirestore();
        console.log('Fetched images:', fetchedImages);
        setImages(fetchedImages);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
  
    fetchImages();
  }, []);
  
  

  return (
    <section className="lg:mt-[5rem] justify-center p-8">
        <div className="text-center lg:mb-[4rem]">
        <h1 className="text-4xl text-[#3D2117] font-extrabold leading-tight mb-4 text-center">
        Gallary
      </h1>
      <p className="text-lg text-gray-400 mb-8 text-center">
      Capturing Moments Step into Our customer Gallery.
      </p>
     
      </div>
          <div className=" mt-[6rem] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image) => (
        <div key={image.id} className="relative overflow-hidden rounded-md">
          <img
            src={image.url}
            alt={image.alt}
            className="w-full h-full object-cover transition-transform transform hover:scale-105"
          />
        </div>
      ))}
    </div>
    </section>
  
  );
};




export default Allimages;
