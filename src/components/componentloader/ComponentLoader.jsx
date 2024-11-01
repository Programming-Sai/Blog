import React from "react";
import styles from "./componentloader.module.css";

const ComponentLoader = () => {
  return (
    <div className={styles.container}>
      <svg>
        <filter id="gooey">
          <feGaussianBlur in="SourceGraphic" stdDeviation={10} />
          <feColorMatrix
            values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 20 -10
          "
          />
        </filter>
      </svg>
      <div className={styles.loader}>
        {Array.from({ length: 8 }, (_, i) => (
          <span key={i} style={{ "--i": i }}></span>
        ))}
        {Array.from({ length: 5 }, (_, i) => (
          <span className={styles.rotate} key={i} style={{ "--j": i }}></span>
        ))}
      </div>
    </div>
  );
};

export default ComponentLoader;
