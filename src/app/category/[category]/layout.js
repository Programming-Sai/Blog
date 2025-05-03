import React from "react"; // Import useEffect for side effects
import { notFound } from "next/navigation";
import styles from "./category.module.css";
import Wrapper from "@/components/pagewrapper/Wrapper";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import RecentPostsWrapper from "@/components/recentpostwrapper/RecentPostsWrapper";
import PopularPostsWrapper from "@/components/homewrappers/PopularPostsWrapper";



const getCategories = async () => {
  try{
    const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/categories`);

    if (!result.ok){
      throw new Error(`${result.message || result.statusText || "Something went wrong."}`)
    }

    const data = await result.json();
    return data;
}
catch (e){
  console.log(e.message);
}
}



const fetchColor = async () => {
  try{
      const data = await getCategories()
      let validCategories = {}
      data.forEach(({slug, color}) => {
        validCategories[slug.replace('/', '')] = {color: color}
      });
     
      return validCategories;
  }
  catch (e){
    console.log(e.message);
  }
}


export async function generateMetadata({ params }) {
  const { category } = params;
  const normalizedCategory = category.toLowerCase();

  const categories = await getCategories();
  if (!categories) return notFound();

  const categoryData = categories.find(({ slug }) => slug.replace("/", "") === normalizedCategory);
  if (!categoryData) return notFound();

  return {
    title: `${categoryData.title} Blogs `,
    description: categoryData.description || `Explore the latest ${categoryData.title} blogs on Ghtrendz.`,
    openGraph: {
      title: `${categoryData.title} Blogs`,
      description: categoryData.description || `Explore the latest ${categoryData.title} blogs on Ghtrendz.`,
      type: "website",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}category/${categoryData.slug}`,
      images: [
        {
          url: categoryData.image || `${process.env.NEXT_PUBLIC_BASE_URL}/default-og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `${categoryData.title} Category Blogs`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${categoryData.title} Blogs`,
      description: categoryData.description || `Explore the latest ${categoryData.title} blogs on Ghtrendz.`,
      images: [
        categoryData.image || `${process.env.NEXT_PUBLIC_BASE_URL}/default-og-image.jpg`,
      ],
    },
  };
}



const BlogCategoryLayout = async ({ children, params }) => {
  const { category } = params;

  const validCategories = await fetchColor();

  const normalizedCategory = category.toLowerCase();

  if (!(normalizedCategory in validCategories)) {
    return notFound();
  }

  return (
    <>
      <Navbar />
      <Wrapper>
        <div className={styles.container}>
          {children}
          <h1
            className={styles.title}
            style={{ "--bg-color": validCategories[normalizedCategory].color }}
          >
            {normalizedCategory.charAt(0).toUpperCase() +
              normalizedCategory?.slice(1)}{" "}
            Related Blogs
          </h1>
          <div className={styles.content}>
            <div className={styles.blog}>
              <RecentPostsWrapper
                cat={normalizedCategory}
                className={styles.itemOne}
              />
            </div>
            <PopularPostsWrapper
              className={styles.itemTwo}
              borderRad="20px"
              marginBlock="5%"
              isOutline="2px"
            />
          </div>
        </div>
      </Wrapper>
      <Footer />
    </>
  );
};

export default BlogCategoryLayout;

// TODO: MAke sure to set up loagic to place paginated data on the page if and only if it is in that category given
