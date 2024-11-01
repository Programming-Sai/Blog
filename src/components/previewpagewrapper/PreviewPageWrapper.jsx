"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import ComponentLoader from "@/components/componentloader/ComponentLoader";
import useLocalStorage from "@/components/UseLocalStorage";

const PreviewContentPage = dynamic(
  () => import("@/components/previewcontentpage/PreviewContentPage"),
  {
    ssr: false,
  }
);

const PreviewWrapper = () => {
  const [lsPreviewData, setLsPreviewData] = useLocalStorage("previewData", ""); // Initialize as an empty string
  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    if (lsPreviewData) {
      let parsedData;

      // Check if lsPreviewData is a string and parse it
      if (typeof lsPreviewData === "string") {
        try {
          parsedData = JSON.parse(lsPreviewData); // Safely parse the string
        } catch (error) {
          console.error("Failed to parse lsPreviewData:", error);
          parsedData = null; // Handle the error case
        }
      } else {
        parsedData = lsPreviewData; // Already an object
      }

      setBlogData(parsedData); // Set the blog data
    }
  }, [lsPreviewData]);

  return blogData ? (
    <PreviewContentPage blogData={blogData} />
  ) : (
    <ComponentLoader />
  );
};

export default PreviewWrapper;
