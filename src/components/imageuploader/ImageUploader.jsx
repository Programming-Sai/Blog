"use client";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./imageuploader.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { handleImageUpload, handleImageDelete } from "@/utils/imageHandler";


const ImageUploader = ({ image, setImage }) => {
  const [uploading, setUploading] = useState(false);



  const onDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles[0]) {
      
      console.log("File Received: ", acceptedFiles, acceptedFiles[0]); 

      const selectedImage = acceptedFiles[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result; // Base64 string
        setImage(imageUrl);
      };
      reader.readAsDataURL(selectedImage);
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
