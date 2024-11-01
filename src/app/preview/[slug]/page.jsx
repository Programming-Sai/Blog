import React from "react";
import PreviewWrapper from "@/components/previewpagewrapper/PreviewPageWrapper";
import useLocalStorage from "@/components/UseLocalStorage";

const temporarySlugs = [
  "understanding-react-hooks",
  "css-grid-layout-guide",
  "building-a-nextjs-blog",
  "introduction-to-typescript",
  "optimizing-performance-in-react",
];

export async function generateStaticParams() {
  return temporarySlugs.map((slug) => ({
    slug, // Matches the [slug] parameter in the URL
  }));
}

const PreviewPage = () => {
  const [lsPreviewData, setLsPreviewData] = useLocalStorage("previewData", "");

  return <PreviewWrapper lsPreviewData={lsPreviewData} />;
};

export default PreviewPage;
