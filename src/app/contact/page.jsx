import React from 'react'
import styles from './contact.module.css';
import Wrapper from '@/components/pagewrapper/Wrapper';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';


const Contact = ({ slug }) => {
  return (
    <>
        <Navbar />
        <Wrapper>
            <div className={styles.container} style={{zIndex: 1}}>
                Contact
            </div>
        </Wrapper>
        <Footer />
    </>
    
  )

}

export default Contact
