import React from "react";
import PreviewWrapper from "@/components/previewpagewrapper/PreviewPageWrapper";

const slugs = [
  "understanding-react-hooks",
  "css-grid-layout-guide",
  "building-a-nextjs-blog",
  "introduction-to-typescript",
  "optimizing-performance-in-react",
];

export async function generateStaticParams() {
  return slugs.map((slug) => ({
    slug, // Matches the [slug] parameter in the URL
  }));
}

const PreviewPage = () => {
  return <PreviewWrapper />;
};

export default PreviewPage;
