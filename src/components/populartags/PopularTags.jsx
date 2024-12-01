import React from "react";
import styles from "./populartags.module.css";
import Image from "next/image";
import Link from "next/link";
import Glow from "../glow/Glow";
import BASE_PATH from "../../../base";

const PopularTags = ({ tags }) => {
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
        {tags.map(({ id, slug, title, image }) => (
          <Link
            key={id}
            scroll={true}
            href={`/category/${slug}`}
            className={`${styles.tagItem} ${styles[slug]}`}
          >
            <Image
              width={50}
              height={50}
              src={image}
              className={styles.img}
              alt={title}
            />
            <p>{title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularTags;
