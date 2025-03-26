import React from "react";



async function getData() {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`
    );
    if (!result.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await result.json();
    return data;
  } catch (error) {
    console.log("Failed to fetch categories", error);
  }
}



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
