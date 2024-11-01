// /src/app/preview/[slug]/PreviewWrapper.jsx
"use client"; // Mark this as a Client Component

import React, { useEffect, useState } from "react";
import ComponentLoader from "@/components/componentloader/ComponentLoader";
import PreviewContentPage from "@/components/previewcontentpage/PreviewContentPage";

const PreviewWrapper = ({ lsPreviewData }) => {
  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    if (lsPreviewData) {
      setBlogData(JSON.parse(lsPreviewData));
    }
  }, [lsPreviewData]);

  return blogData ? (
    <PreviewContentPage blogData={blogData} />
  ) : (
    <ComponentLoader />
  );
};

export default PreviewWrapper;
