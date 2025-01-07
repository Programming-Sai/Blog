import React from "react";
import styles from "./recentposts.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import Glow from "../glow/Glow";
import Link from "next/link";
import Pagination from "../pagination/Pagination";

async function getData() {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`
    );
    if (!result.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await result.json();
    return data;
  } catch (error) {
    console.log("Failed to fetch categories", error);
  }
}

const RecentPosts = ({
  paginatedPosts,
  POST_PER_PAGE,
  count,
  currentPage,
  cat,
  totalPages,
  onPageChange,
  theme,
}) => {
  return (
    <div className={styles.container} id="recentPost">
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
        {paginatedPosts.map((post) => (
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
              <p className={styles.desc}>{post.desc.slice(0, 150) + "..."}</p>
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
      <Pagination
        width="100%"
        page={currentPage}
        cat={cat}
        theme={theme}
        count={count}
        totalPages={totalPages}
        postsPerPage={POST_PER_PAGE}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default RecentPosts;
