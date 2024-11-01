import React from "react";
import styles from "./aboutherosection.module.css";
import BASE_PATH from "../../../base";

const AboutHeroSection = () => {
  return (
    <div className={styles.container}>
      <div
        style={{ "--img": `url("${BASE_PATH}/food.png")` }}
        className={`${styles.item} ${styles.S}`}
      />
      <div
        style={{ "--img": `url("${BASE_PATH}/fashion.png")` }}
        className={`${styles.item} ${styles.N}`}
      />
      <div
        style={{ "--img": `url("${BASE_PATH}/travel.png")` }}
        className={`${styles.item} ${styles.L}`}
      />
      <div
        style={{ "--img": `url("${BASE_PATH}/style.png")` }}
        className={`${styles.item} ${styles.M}`}
      />
      <div
        style={{ "--img": `url("${BASE_PATH}/culture.png")` }}
        className={`${styles.item} ${styles.U}`}
      />
    </div>
  );
};

export default AboutHeroSection;
