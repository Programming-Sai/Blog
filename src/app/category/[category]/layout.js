import React from "react"; // Import useEffect for side effects
import { notFound } from "next/navigation";
import styles from "./category.module.css";
import RecentPosts from "@/components/recentposts/RecentPosts";
import PopularPosts from "@/components/popularposts/PopularPosts";
import Pagination from "@/components/pagination/Pagination";
import Wrapper from "@/components/pagewrapper/Wrapper";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const validCategories = {
  sports: { color: "green" },
  news: { color: "red" },
  lifestyle: { color: "yellow" },
  music: { color: "#CC00FF" },
  movies: { color: "lightblue" },
};

const BlogCategoryLayout = ({ children, params }) => {
  const { category } = params;

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
              normalizedCategory.slice(1)}{" "}
            Related Blogs
          </h1>
          <div className={styles.content}>
            <div className={styles.blog}>
              <RecentPosts className={styles.itemOne} />
              <Pagination width={"100%"} className={styles.button} />
            </div>
            <PopularPosts
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
