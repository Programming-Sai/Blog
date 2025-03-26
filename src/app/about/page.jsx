import React from "react";
import styles from "./about.module.css";
import Wrapper from "@/components/pagewrapper/Wrapper";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import AboutHeroSection from "@/components/aboutherosection/AboutHeroSection";
import AboutContent from "@/components/aboutcontent/AboutContent";
import PopularPosts from "@/components/popularposts/PopularPosts";



export const metadata = {
  title: "About"
};



const About = ({ page }) => {
  return (
    <>
      <Navbar />
      <Wrapper>
        <div className={styles.container} style={{ zIndex: 1 }}>
          <AboutHeroSection />
          <div className={styles.flexWrapper}>
            <AboutContent className={styles.itemOne} />
            <PopularPosts
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

export default About;
