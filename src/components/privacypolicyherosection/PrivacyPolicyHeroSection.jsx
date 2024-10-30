import React from "react";
import styles from "./privacypolicyherosection.module.css";
import Image from "next/image";
import Glow from "../glow/Glow";

const PrivacyPolicyHeroSection = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles.item} ${styles.heroImgContainer}`}>
        <Image fill src="/privacyheroanim.gif" className={styles.img} />
      </div>
      <Glow
        top="50%"
        left="20%"
        width={500}
        height={500}
        color="purple"
        mtop="50%"
        mleft="-10%"
      />
      <div className={`${styles.item} ${styles.heroTextContainer}`}>
        <h3>
          {/* Feel free to reach out to us with any questions or feedback using the
          form below! */}
        </h3>
      </div>
    </div>
  );
};

export default PrivacyPolicyHeroSection;
