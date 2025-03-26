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
  const categories = await getData();
  return categories.map((category) => category.slug.replace('/', ''));;
}

const BlogCategoryPage = () => {
  return <></>;
};

export default BlogCategoryPage;
