import React, { useState, useEffect } from "react";
import FeaturedSection from "@/components/featuredsection/FeaturedSection";
import EditorPick from "../editorpick/EditorPick";
import PopularTags from "../populartags/PopularTags";
import RecentPosts from "../recentposts/RecentPosts";
import PopularPosts from "../popularposts/PopularPosts";
import styles from "./home.module.css";
import RecentPostsWrapper from "../recentpostwrapper/RecentPostsWrapper";
import FeaturedSectionWrapper from "../homewrappers/FeaturedSectionWrapper";
import EditorPickWrapper from "../homewrappers/EditorPickWrapper";
import PopularTagWrapper from "../homewrappers/PopularTagWrapper";
import PopularPostsWrapper from "../homewrappers/PopularPostsWrapper";

export default function Home({ theme }) {
  return (
    <div className={styles.container}>
      <FeaturedSectionWrapper theme={theme} />
      <EditorPickWrapper />
      <PopularTagWrapper />

      <div className={styles.lower}>
        <RecentPostsWrapper theme={theme} className={styles.itemOne} />
        <PopularPostsWrapper
          className={styles.itemTwo}
          borderRad="20px"
          marginBlock="5%"
          isOutline="2px"
        />
      </div>
    </div>
  );
}
