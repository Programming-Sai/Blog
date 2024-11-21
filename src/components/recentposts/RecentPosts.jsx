import React from "react";
import styles from "./recentposts.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import Glow from "../glow/Glow";
import Link from "next/link";

const getData = async (page) => {
  const result = await fetch(`/api/posts?page=${page}`);

  if (!result.ok) {
    throw new Error("Failed to get posts");
  }
  return result.json();
};

const RecentPosts = async ({ page, width }) => {
  const postsData = await getData(page);

  console.log(page);
  return (
    <div className={styles.container} style={{ width: width }} id="recentPost">
      <h1>Recent Posts</h1>
      <div className={styles.recentPostsContainer}>
        <Glow
          top="30%"
          left="20%"
          width={600}
          height={600}
          color="#00A3FF"
          mtop="35%"
          mleft="0"
        />

        {postsData.paginatedPosts.map((post) => (
          <div className={styles.item} key={post._id}>
            <div className={styles.imgContainer}>
              <Image
                src={post?.image}
                alt={post.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className={styles.post}>
              <p className={styles.timeTag}>
                <span className={styles.time}>
                  {new Date(post?.createdAt)
                    .toISOString()
                    .substring(0, 10)
                    .replace(/-/g, " • ")}
                </span>{" "}
                - {post?.catSlug.toUpperCase()}
              </p>
              <h3>{post.title}</h3>
              <p className={styles.desc}>{post.desc}</p>
              <div className={styles.dateRead}>
                <Link href={`/${post.slug}`} className={styles.read}>
                  Read More
                </Link>
                <div className={`${styles.readingTime} ${styles.time}`}>
                  <FontAwesomeIcon icon={faClock} />
                  <p>{post.readingTime}min(s) read</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;
