// hooks/useCloudinaryUpload.js
import { useState } from "react";

const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_UPLOAD_URL; 
const CLOUDINARY_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET; 

export default function useCloudinaryUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const uploadImage = async (file) => {
    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_PRESET); 
    try {
      const res = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.secure_url) {
        return data.secure_url;
      } else {
        throw new Error("No se pudo obtener la URL de la imagen");
      }
    } catch (err) {
      setError(err.message || "Error al subir imagen");
      return null;
    } finally {
      setUploading(false);
    }
  };

  return { uploadImage, uploading, error };
}
