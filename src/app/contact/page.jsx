import React from "react";
import styles from "./contact.module.css";
import Wrapper from "@/components/pagewrapper/Wrapper";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import PopularPosts from "@/components/popularposts/PopularPosts";
import ContactHeroSection from "@/components/contactheorsection/ContactHeroSection";
import ContactContentSection from "@/components/contactcontentsection/ContactContentSection";

const Contact = () => {
  return (
    <>
      <Navbar />
      <Wrapper>
        <div className={styles.container} style={{ zIndex: 1 }}>
          <ContactHeroSection />
          <div className={styles.flexWrapper}>
            <ContactContentSection className={styles.itemOne} />
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

export default Contact;
