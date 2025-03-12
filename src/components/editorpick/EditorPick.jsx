import React from "react";
import styles from "./editorpick.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Glow from "../glow/Glow";
import Link from "next/link";

async function getData() {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/editorPick`
    );
    if (!result.ok) {
      throw new Error("Failed to fetch editor's pick");
    }
    const data = await result.json();
    return data;
  } catch (error) {
    console.log("Failed to fetch editor's pick", error);
  }
}

const EditorPick = async () => {
  const editorPick = await getData();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Editor's Pick</h1>
      <div className={styles.editorsPickContainer}>
        <Glow
          top="0"
          left="0"
          width={500}
          height={500}
          color="gold"
          mtop="0"
          mleft="0"
        />
        <div className={styles.rowTwo}>
          {editorPick?.slice(0, 2).map((item, _) => (
            <div key={item._id} className={styles.item}>
              <div className={styles.innerContainer}>
                <Image
                  src={`${item.image || '/coding.png'}`}
                  fill
                  alt="img"
                  className={styles.img}
                />
              </div>
              <div className={styles.innerContainer}>
                <div className={styles.postTagTime}>
                  <p className={styles.tag}>{item.catSlug.toUpperCase()}</p>
                  <div className={styles.time}>
                    <FontAwesomeIcon icon={faClock} />
                    <p>{item.readingTime}min read</p>
                  </div>
                </div>
                <h2>{item.title}</h2>
                <p className={styles.desc}>{item.desc?.slice(0, 100) + "..."}</p>
                <div className={styles.dateRead}>
                  <p className={styles.date}>
                    {new Date(item.createdAt)
                      .toISOString()
                      .substring(0, 10)
                      .replace(/-/g, " • ")}
                  </p>
                  <Link href={`/${item.slug}`} className={styles.read}>
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.rowTwo}>
          {editorPick?.slice(2, 5).map((item, _) => (
            <div key={item._id} className={styles.item}>
              <div className={styles.innerContainer}>
                <Image
                  src={`${item.image || '/coding.png'}`}
                  fill
                  alt="img"
                  className={styles.img}
                />
              </div>
              <div className={styles.innerContainer}>
                <div className={styles.postTagTime}>
                  <p className={styles.tag}>{item.catSlug.toUpperCase()}</p>
                  <div className={styles.time}>
                    <FontAwesomeIcon icon={faClock} />
                    <p>{item.readingTime}min read</p>
                  </div>
                </div>
                <h2>{item.title}</h2>
                <p className={styles.desc}>{item.desc?.slice(0, 100) + "..."}</p>
                <div className={styles.dateRead}>
                  <p className={styles.date}>
                    {new Date(item.createdAt)
                      .toISOString()
                      .substring(0, 10)
                      .replace(/-/g, " • ")}
                  </p>
                  <Link href={`/${item.slug}`} className={styles.read}>
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>{" "}
        <Glow
          top="70%"
          left="80%"
          width={500}
          height={500}
          color="#11F027"
          mtop="90%"
          mleft="50%"
        />
        <Glow
          top="70%"
          left="80%"
          width={500}
          height={500}
          color="#11F027"
          mtop="90%"
          mleft="50%"
        />
      </div>
    </div>
  );
};

export default EditorPick;
