import React from "react";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Wrapper from "@/components/pagewrapper/Wrapper";
import FeaturedSection from "@/components/featuredsection/FeaturedSection";
import EditorPick from "@/components/editorpick/EditorPick";
import PopularTags from "@/components/populartags/PopularTags";
import PopularPosts from "@/components/popularposts/PopularPosts";
import styles from "../components/Home/home.module.css";
import RecentPostsWrapper from "@/components/recentpostwrapper/RecentPostsWrapper";

export default async function Home({ theme }) {
  return (
    <div>
      <Navbar />
      <Wrapper>
        <FeaturedSection theme={theme} />
        <EditorPick />
        <PopularTags />

        <div className={styles.lower}>
          <RecentPostsWrapper theme={theme} className={styles.itemOne} />
          <PopularPosts
            className={styles.itemTwo}
            borderRad="20px"
            marginBlock="5%"
            isOutline="2px"
          />
        </div>
      </Wrapper>
      <Footer />
    </div>
  );
}
