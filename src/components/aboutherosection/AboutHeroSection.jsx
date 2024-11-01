import React from "react";
import styles from "./aboutherosection.module.css";

const AboutHeroSection = () => {
  return (
    <div className={styles.container}>
      <div
        style={{ "--img": `url("/food.png")` }}
        className={`${styles.item} ${styles.S}`}
      />
      <div
        style={{ "--img": `url("/fashion.png")` }}
        className={`${styles.item} ${styles.N}`}
      />
      <div
        style={{ "--img": `url("/travel.png")` }}
        className={`${styles.item} ${styles.L}`}
      />
      <div
        style={{ "--img": `url("/style.png")` }}
        className={`${styles.item} ${styles.M}`}
      />
      <div
        style={{ "--img": `url("/culture.png")` }}
        className={`${styles.item} ${styles.U}`}
      />
    </div>
  );
};

export default AboutHeroSection;
