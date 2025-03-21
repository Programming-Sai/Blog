"use client";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./imageuploader.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { handleImageUpload, handleImageDelete } from "@/utils/imageHandler";


const ImageUploader = ({ image, setImage, media, setMedia }) => {
  const [uploading, setUploading] = useState(false);



  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
  
      console.log("Reading File:", file);
  
      if (!(file instanceof File)) {
        reject(new Error("Invalid file type"));
        return;
      }
  
      reader.readAsDataURL(file);
    });
  };
  

  const onDrop = async (acceptedFiles) => {
    if (!acceptedFiles || acceptedFiles.length === 0) {
      console.error("No files received.");
      return;
    }
  
    setUploading(true);
    const selectedFile = acceptedFiles[0];
  
    console.log("Received File:", selectedFile);
    console.log("File Type:", typeof selectedFile);
    console.log("File Instance Check:", selectedFile instanceof File); // Should be true
    console.log("Blob Instance Check:", selectedFile instanceof Blob); // Should also be true
  
    try {

      if (image && media && media.length > 0) {
        // Find the media object for the currently displayed image
        const currentMedia = media.find((item) => item.url === image);
        if (currentMedia) {
          console.log("Deleting current image:", currentMedia);
          await handleImageDelete(currentMedia.publicId);
          // Remove it from the media array and clear the image state
          setMedia((prev) =>
            prev.filter((item) => item.publicId !== currentMedia.publicId)
          );
          setImage(null);
        }
      }


      // ✅ Confirm the file is valid
      if (!(selectedFile instanceof File)) {
        throw new Error("Selected file is not a valid File object.");
      }
  
      const base64 = await convertFileToBase64(selectedFile);
      console.log("Base64 Conversion Success:", base64.slice(0, 50) + "..."); // Log first 50 chars to confirm
  
      if (!base64) {
        console.error("Failed to convert file to base64.");
        return;
      }

      
      // ✅ Upload to Cloudinary
      const { url: newImageUrl, publicId: newPublicId } = await handleImageUpload(selectedFile, "thumbnails");
      console.log("Upload Success:", newImageUrl);
  
      setImage(newImageUrl);
      setMedia((prev) => [...prev, { url: newImageUrl, publicId: newPublicId }]);

      // setMedia((prev) => [...prev, newImageUrl]);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };
  
 

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps({ className: styles.image })}>
      <input {...getInputProps()} />
      {image ? (
        <Image src={image} fill className={styles.img} alt="Uploaded" />
      ) : (
        <div className={styles.default}>
          <FontAwesomeIcon icon={faCloudArrowUp} className={styles.icon} />
          Upload Blog Thumbnail Here.
          {isDragActive && <div className={styles.overlay} />}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
