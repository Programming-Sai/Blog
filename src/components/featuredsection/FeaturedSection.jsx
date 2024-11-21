import React from "react";
import styles from "./featuredsection.module.css";
import Image from "next/image";
import Glow from "../glow/Glow";
import BASE_PATH from "../../../base";
import Link from "next/link";

const getData = async () => {
  const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`);

  if (!result.ok) {
    throw new Error("Failed to get posts");
  }
  return result.json();
};

const FeaturedSection = async ({ theme }) => {
  const data = await getData();
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
          <h2 className={styles.subtitle}>
            {/* Simple Ways to Inspire your inner Innovator. */}
            {data.featuredPost.title}
          </h2>
          <p className={styles.desc}>
            {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            nostrum a, quibusdam, accusamus molestiae dolorem sed veniam animi,
            repudiandae amet veritatis ipsam! Fuga molestiae sed vero ad autem
            accusantium nam id, obcaecati quisquam aut saepe neque tempora
            veritatis sunt ducimus? */}
            {data.featuredPost.desc}
          </p>
          <Link href={`/${data.featuredPost.slug}`} className={styles.readMore}>
            Read More
          </Link>
        </div>

        <div
          className={styles.sectionItem}
          // style={{ "--featured-bg": `url("${BASE_PATH}/p1.jpeg")` }}
          style={{ "--featured-bg": `url("${data.featuredPost.image}")` }}
        >
          <Image
            className={styles.img}
            src={`${data.featuredPost.image}`}
            // src={`${BASE_PATH}/p1.jpeg`}
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
