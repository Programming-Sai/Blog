import React from "react";
import styles from "./privacypolicy.module.css";
import Wrapper from "@/components/pagewrapper/Wrapper";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import PopularPosts from "@/components/popularposts/PopularPosts";
import PrivacyPolicyContent from "@/components/privacypolicycontent/PrivacyPolicyContent";
import PrivacyPolicyHeroSection from "@/components/privacypolicyherosection/PrivacyPolicyHeroSection";

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />
      <Wrapper>
        <div className={styles.container} style={{ zIndex: 1 }}>
          <PrivacyPolicyHeroSection />
          <div className={styles.flexWrapper}>
            <PrivacyPolicyContent className={styles.itemOne} />
            <PopularPosts
              className={styles.itemTwo}
              glow={true}
              borderRad="20px"
              marginBlock="0%"
              isOutline="2px"
            />
          </div>
        </div>
      </Wrapper>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
