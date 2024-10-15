import React from 'react'
import styles from './about.module.css';
import Wrapper from '@/components/pagewrapper/Wrapper';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';


const About = ({ slug }) => {
  return (
    <>
        <Navbar />
        <Wrapper>
            <div className={styles.container} style={{zIndex: 1}}>
                About
            </div>
        </Wrapper>
        <Footer />
    </>

  )

}

export default About
