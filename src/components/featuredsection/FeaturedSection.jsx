import React from "react";
import styles from "./featuredsection.module.css";
import Image from "next/image";
import Glow from "../glow/Glow";
import BASE_PATH from "../../../base";

const FeaturedSection = ({ theme }) => {
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
            Simple Ways to Inspire your inner Innovator.
          </h2>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            nostrum a, quibusdam, accusamus molestiae dolorem sed veniam animi,
            repudiandae amet veritatis ipsam! Fuga molestiae sed vero ad autem
            accusantium nam id, obcaecati quisquam aut saepe neque tempora
            veritatis sunt ducimus?
          </p>
          <button className={styles.readMore}>Read More</button>
        </div>

        <div
          className={styles.sectionItem}
          style={{ "--featured-bg": `url("${BASE_PATH}/p1.jpeg")` }}
        >
          <Image
            className={styles.img}
            src={`${BASE_PATH}/p1.jpeg`}
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
