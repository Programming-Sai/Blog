"use client";
import React from "react";
import { useDropzone } from "react-dropzone";
import styles from "./imageuploader.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const ImageUploader = ({ image, setImage }) => {
  const onDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles[0]) {
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
