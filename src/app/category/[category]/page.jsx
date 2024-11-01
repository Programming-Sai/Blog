import React from "react";

export async function generateStaticParams() {
  const categories = ["sports", "news", "lifestyle", "music", "movies"]; // Define your valid categories here
  return categories.map((category) => ({
    category, // This matches the [category] parameter in the URL
  }));
}

const BlogCategoryPage = () => {
  return <></>;
};

export default BlogCategoryPage;
