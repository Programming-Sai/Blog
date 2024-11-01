import React from "react";
import styles from "./editorpick.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Glow from "../glow/Glow";
import BASE_PATH from "../../../base";

const editorPicks = [
  {
    tag: "Travel",
    readTime: "3min read",
    title: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium dolorem officia, amet suscipit doloribus accusantium animi qui odio est! Nemo!",
    date: "25 Nov 2024",
    imageSrc: `${BASE_PATH}/fashion.png`,
  },
  {
    tag: "Travel",
    readTime: "3min read",
    title: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium dolorem officia, amet suscipit doloribus accusantium animi qui odio est! Nemo!",
    date: "25 Nov 2024",
    imageSrc: `${BASE_PATH}/food.png`,
  },
  {
    tag: "Travel",
    readTime: "3min read",
    title: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium dolorem officia, amet suscipit doloribus accusantium animi qui odio est! Nemo!",
    date: "25 Nov 2024",
    imageSrc: `${BASE_PATH}/coding.png`,
  },
  {
    tag: "Travel",
    readTime: "3min read",
    title: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium dolorem officia, amet suscipit doloribus accusantium animi qui odio est! Nemo!",
    date: "25 Nov 2024",
    imageSrc: `${BASE_PATH}/culture.png`,
  },
  {
    tag: "Travel",
    readTime: "3min read",
    title: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium dolorem officia, amet suscipit doloribus accusantium animi qui odio est! Nemo!",
    date: "25 Nov 2024",
    imageSrc: `${BASE_PATH}/travel.png`,
  },
];

const EditorPick = () => {
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
          {editorPicks.map((pick, index) => (
            <div className={styles.item} key={index}>
              <div className={styles.innerContainer}>
                <Image
                  src={pick.imageSrc}
                  fill
                  alt="img"
                  className={styles.img}
                />
              </div>
              <div className={styles.innerContainer}>
                <div className={styles.postTagTime}>
                  <p className={styles.tag}>{pick.tag}</p>
                  <div className={styles.time}>
                    <FontAwesomeIcon icon={faClock} />
                    <p>{pick.readTime}</p>
                  </div>
                </div>
                <h2>{pick.title}</h2>
                <p className={styles.desc}>{pick.description}</p>
                <div className={styles.dateRead}>
                  <p className={styles.date}>{pick.date}</p>
                  <button className={styles.read}>Read More</button>
                </div>
              </div>
            </div>
          ))}
        </div>

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
