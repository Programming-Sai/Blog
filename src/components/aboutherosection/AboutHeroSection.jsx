import React from "react";
import styles from "./aboutherosection.module.css";
import BASE_PATH from "../../../base";
import Link from "next/link";


async function getData() {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/editorPick`
    );
    if (!result.ok) {
      throw new Error("Failed to fetch featured post");
    }
    const data = await result.json();
    return data;
  } catch (error) {
    console.log("Failed to fetch featured post", error);
  }
}


  
const AboutHeroSection = async () => {
  const topPosts = await getData() || {};
  const styleList = [styles.S, styles.N, styles.L, styles.M, styles.U]

  return (
    <div className={styles.container}>
      {topPosts?.map((post, idx) => {
        return (
            <Link 
              href={`${process.env.NEXT_PUBLIC_BASE_URL}${post.slug}`} 
              key={post.id} 
              className={`${styles.item} ${styleList[idx]}`} 
              style={{ "--img": `url("${BASE_PATH}${post.image}")` }}
            />
          
        );
      })}


    </div>
  );
};

export default AboutHeroSection;