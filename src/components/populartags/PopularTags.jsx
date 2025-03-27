import React from "react";
import styles from "./populartags.module.css";
import Image from "next/image";
import Link from "next/link";
import Glow from "../glow/Glow";
import BASE_PATH from "../../../base";

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

const PopularTags = async () => {
  const tags = await getData();
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
        {tags?.map(({ id, slug, title, image, color }) => (
          <Link
            key={id}
            scroll={true}
            href={`/category/${slug}`}
            className={`${styles.tagItem}`}
            style={{border: `2px solid ${color}`}}
          >
            <div style={{ width: '90px', height: '50px', position: "relative" }}>
             {image && <Image
                fill
                src={image}
                alt={title}
                style={{ objectFit: "cover", borderRadius: "100px", }}
              />}
            </div>
            <p>{title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularTags;
