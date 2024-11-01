import React from "react";
import styles from "./populartags.module.css";
import Image from "next/image";
import Link from "next/link";
import Glow from "../glow/Glow";
import BASE_PATH from "../../../base"; // Ensure BASE_PATH is imported

const PopularTags = () => {
  // Sample tag data with names and image paths
  const tags = [
    { name: "Sports", path: "/category/sports", img: "/style.png" },
    { name: "News", path: "/category/news", img: "/fashion.png" },
    { name: "Lifestyle", path: "/category/lifestyle", img: "/travel.png" },
    { name: "Music", path: "/category/music", img: "/culture.png" },
    { name: "Movies", path: "/category/movies", img: "/food.png" },
  ];

  return (
    <div className={styles.container}>
      <Glow
        top="-100%"
        left="-40%"
        width={600}
        height={600}
        color="#890A8C"
        mtop="35%"
        mleft="0"
      />
      <h1>Categories / Tags</h1>
      <div className={styles.tagContainer}>
        {tags.map(({ name, path, img }) => (
          <Link
            key={name}
            scroll={true}
            href={path}
            className={`${styles.tagItem} ${styles[name.toLowerCase()]}`}
          >
            <Image
              width={50}
              height={50}
              src={`${BASE_PATH}${img}`}
              className={styles.img}
              alt={name}
            />
            <p>{name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularTags;
