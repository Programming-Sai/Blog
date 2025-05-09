import React from "react";
import styles from "./featuredsection.module.css";
import Image from "next/image";
import Glow from "../glow/Glow";
import BASE_PATH from "../../../base";
import Link from "next/link";

async function getData() {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/featuredPost`,
      { next: { revalidate: 2 * 3600 } } // Corrected bracket placement
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

const FeaturedSection = async ({ theme }) => {
  const featuredPost = await getData() || {};

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {/* Hey <b>{"<< Name >>"}</b> here, Discover my stories and creative ideas. */}
        <br/>
      </h1>
      <div className={styles.section}>
        <div className={styles.sectionItem}>
          <Glow
            top="-60%"
            left="80%"
            width={500}
            height={500}
            color={theme === "light" ? "#11F027" : "#D4AF37"}
            mtop="0%"
            mleft="30%"
          />
          <h2 className={styles.subtitle}>{featuredPost.title}</h2>
          <p className={styles.desc}>
            {featuredPost.desc?.slice(0, 500) + "..."}
          </p>
          <Link href={`/${featuredPost.slug}`} className={styles.readMore}>
            Read More
          </Link>
        </div>

        <div
          className={styles.sectionItem}
          style={{
            "--featured-bg": `url("${featuredPost.image || '/coding.png'}")`,
          }}
        >
          <Image
            className={styles.img}
            src={`${featuredPost.image || '/coding.png'}`}
            priority
            fill
            alt="Featured Image"
          />
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;
