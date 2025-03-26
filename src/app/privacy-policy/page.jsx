import React from "react";
import styles from "./privacypolicy.module.css";
import Wrapper from "@/components/pagewrapper/Wrapper";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import PopularPosts from "@/components/popularposts/PopularPosts";
import PrivacyPolicyContent from "@/components/privacypolicycontent/PrivacyPolicyContent";
import PrivacyPolicyHeroSection from "@/components/privacypolicyherosection/PrivacyPolicyHeroSection";



export const metadata = {
  title: "Privacy Policy"
};



const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />
      <Wrapper>
        <div className={styles.container} style={{ zIndex: 1 }}>
          <PrivacyPolicyHeroSection />
          <div className={styles.flexWrapper}>
            <PrivacyPolicyContent className={styles.itemOne} />
            <div className={styles.itemTwo}>
              <PopularPosts
                glow={true}
                borderRad="20px"
                marginBlock="0%"
                isOutline="2px"
              />
            </div>
          </div>
        </div>
      </Wrapper>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
