

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
        <h2 className="text-2xl md:text-3xl hed lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-6">
         <span className="text-blue-500 hed">Cumpus</span> Gallary
        </h2>
        <p className="text-lg md:text-xl lg:text-2xl text-Heart-800 text-center mb-4">
        Capturing Moments Step into Our Campus Gallery.
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
