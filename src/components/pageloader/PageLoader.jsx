import React from "react";
import styles from "./pageloader.module.css";
import BASE_PATH from "../../../base";

const PageLoader = ({ widthOfSlice, slices, img, isBorderRadius }) => {
  if (!slices) {
    slices = 10;
  }

  if (!widthOfSlice) {
    widthOfSlice = 60;
  }

  if (!img) {
    img = "/favicon.ico";
  }

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div>
          {Array.from({ length: slices }, (_, i) => (
            <span
              key={i}
              style={{
                "--i": i,
                "--slices": slices,
                "--img": `url(${BASE_PATH}${img})`,
                "--width": `${widthOfSlice}px`,
                borderRadius: isBorderRadius ? "20px" : "0",
              }}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
