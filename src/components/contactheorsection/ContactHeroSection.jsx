import React from 'react'
import styles from './contactherosection.module.css';
import Image from 'next/image';
import Glow from '../glow/Glow';

const ContactHeroSection = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles.item} ${styles.heroImgContainer}`}>
        <Image fill src='/heroAnimation.gif' className={styles.img} />
      </div>
      <Glow
        top='50%' 
        left='20%' 
        width={500} 
        height={500} 
        color='purple'
        mtop='50%'
        mleft='-10%'
      />
      <Glow
        top='0%' 
        left='80%' 
        width={500} 
        height={500} 
        color='gold'
        mtop='0%'
        mleft='0%'
      />
      <div className={`${styles.item} ${styles.heroTextContainer}`}>
        <h3>Feel free to reach out to us with any questions or feedback using the form below!</h3>
      </div>
    </div>
  )
}

export default ContactHeroSection
