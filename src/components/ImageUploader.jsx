import React, { useState, useEffect } from "react";
import useCloudinaryUpload from "../hooks/useCloudinaryUpload";
import { Icon } from '@iconify/react';
import '../styles/ImageUploader.css';

export default function ImageUploader({ onUploadSuccess, initialImageUrl = "" }) {
  const { uploadImage, uploading, error: uploadError } = useCloudinaryUpload();
  const [imageUrl, setImageUrl] = useState(initialImageUrl);

  // <-- Aquí sincronizamos imageUrl con initialImageUrl
  useEffect(() => {
    setImageUrl(initialImageUrl);
  }, [initialImageUrl]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = await uploadImage(file);
    if (url) {
      setImageUrl(url);
      if (onUploadSuccess) onUploadSuccess(url);
    }
  };

  const handleRemoveImage = () => {
    setImageUrl("");
    if (onUploadSuccess) onUploadSuccess("");
  };

  return (
    <div className="image-uploader-container">
      {!imageUrl ? (
        <>
          <label
            htmlFor="file"
            className={`image-upload-label ${uploading ? "uploading" : ""}`}
          >
            <div className="spacer"></div>
            <div className="icon-wrapper">
              {uploading ? (
                <Icon icon="line-md:uploading-loop" width="24" height="24" />
              ) : (
                <Icon icon="uil:image-upload" width="24" height="24" />
              )}
            </div>
            <input
              type="file"
              id="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              className="file-input"
            />
          </label>
          {uploadError && (
            <p className="upload-error">{uploadError}</p>
          )}
        </>
      ) : (
        <div className="image-preview-wrapper">
          <img
            src={imageUrl}
            alt="Preview subida"
            className="image-preview"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="remove-image-button"
            aria-label="Eliminar imagen"
            title="Eliminar imagen"
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
}
