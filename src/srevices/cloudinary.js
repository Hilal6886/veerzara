// src/cloudinary.js

export const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
  
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
  
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error.message);
      }
      return data.secure_url; // Returns the uploaded image URL
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      return null;
    }
  };
  