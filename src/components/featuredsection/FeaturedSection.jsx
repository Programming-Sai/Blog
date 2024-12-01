import React from "react";
import styles from "./featuredsection.module.css";
import Image from "next/image";
import Glow from "../glow/Glow";
import BASE_PATH from "../../../base";
import Link from "next/link";

const FeaturedSection = ({ featuredPost, theme }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Hey <b>{"<< Name >>"}</b> here, Discover my stories and creative ideas.
      </h1>
      <div className={styles.section}>
        <div className={styles.sectionItem}>
          <Glow
            top="-60%"
            left="80%"
            width={500}
            height={500}
            color={theme === "light" ? "#11F027" : "#D4AF37"}
            mtop="-40%"
            mleft="30%"
          />
          <h2 className={styles.subtitle}>{featuredPost.title}</h2>
          <p className={styles.desc}>
            {featuredPost.desc.slice(0, 500) + "..."}
          </p>
          <Link href={`/${featuredPost.slug}`} className={styles.readMore}>
            Read More
          </Link>
        </div>

        <div
          className={styles.sectionItem}
          style={{
            "--featured-bg": `url("${featuredPost.image}")`,
          }}
        >
          <Image
            className={styles.img}
            src={`${featuredPost.image}`}
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
