import React from "react";
import styles from "./popularposts.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import Glow from "../glow/Glow";
import BASE_PATH from "../../../base"; // Ensure BASE_PATH is imported
import Link from "next/link";

const getData = async () => {
  const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`);

  if (!result.ok) {
    throw new Error("Failed to get posts");
  }
  return result.json();
};

const PopularPosts = async ({
  glow,
  width,
  className,
  borderRad,
  marginBlock,
  isOutline,
}) => {
  const posts = await getData();

  return (
    <div
      className={`${styles.container} ${className}`}
      style={{
        width: width,
        "--borderRad": borderRad,
        "--marginBlock": marginBlock,
        "--outline": isOutline,
      }}
    >
      <h2>Popular Posts</h2>
      <div className={styles.postsContainer}>
        {posts.topPosts.map(
          ({ slug, _id, image, title, readingTime, createdAt }) => (
            <Link href={`/${slug}`} key={_id} className={styles.item}>
              <div className={styles.imgContainer}>
                <Image
                  src={image}
                  fill
                  className={styles.img}
                  alt={title}
                  objectFit="cover"
                />
              </div>
              <div className={styles.post}>
                <h4>{title}</h4>
                <div className={styles.timeDate}>
                  <div className={styles.readingTime}>
                    <FontAwesomeIcon icon={faClock} />
                    <p>{readingTime} min(s) read</p>
                  </div>
                  {"  |"}
                  <p>
                    {new Date(createdAt)
                      .toISOString()
                      .substring(0, 10)
                      .replace(/-/g, " • ")}
                  </p>
                </div>
              </div>
            </Link>
          )
        )}
        {glow && (
          <Glow
            top="100%"
            left="50%"
            width={500}
            height={500}
            color="#09D5B0"
            mtop="90%"
            mleft="50%"
          />
        )}
      </div>
    </div>
  );
};

export default PopularPosts;
