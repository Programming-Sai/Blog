import React from 'react';
import styles from './popularposts.module.css';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import Glow from '../glow/Glow';

const PopularPosts = ({ width , className, borderRad, marginBlock, isOutline}) => {
  return (
    <div className={`${styles.container} ${className}`} style={ {width: width, '--borderRad': borderRad, '--marginBlock': marginBlock, '--outline': isOutline} }>
      <h2>Popular Posts</h2>
      <div className={styles.postsContainer}>
        
        <div className={styles.item}>
          <div className={styles.imgContainer}>
            <Image src='/culture.png' fill className={styles.img} alt='fashion' objectFit='cover' />
          </div>
          <div className={styles.post}>
            <h4>Lorem ipsum dolor sit amet consectetur amet .</h4>
            <div className={styles.timeDate}>
              <div className={styles.readingTime}>
                  <FontAwesomeIcon icon={ faClock }/>
                  <p>3min read</p>
              </div>
              <p>25 Nov 2025</p>
            </div>
          </div>
        </div>
     
        <div className={styles.item}>
          <div className={styles.imgContainer}>
            <Image src='/fashion.png' fill className={styles.img} alt='fashion' objectFit='cover' />
          </div>
          <div className={styles.post}>
            <h4>Lorem ipsum dolor sit amet consectetur amet .</h4>
            <div className={styles.timeDate}>
              <div className={styles.readingTime}>
                  <FontAwesomeIcon icon={ faClock }/>
                  <p>3min read</p>
              </div>
              <p>25 Nov 2025</p>
            </div>
          </div>
        </div>
     
        <div className={styles.item}>
          <div className={styles.imgContainer}>
            <Image src='/fashion.png' fill className={styles.img} alt='fashion' objectFit='cover' />
          </div>
          <div className={styles.post}>
            <h4>Lorem ipsum dolor sit amet consectetur amet .</h4>
            <div className={styles.timeDate}>
              <div className={styles.readingTime}>
                  <FontAwesomeIcon icon={ faClock }/>
                  <p>3min read</p>
              </div>
              <p>25 Nov 2025</p>
            </div>
          </div>
        </div>
     
        <div className={styles.item}>
          <div className={styles.imgContainer}>
            <Image src='/fashion.png' fill className={styles.img} alt='fashion' objectFit='cover' />
          </div>
          <div className={styles.post}>
            <h4>Lorem ipsum dolor sit amet consectetur amet .</h4>
            <div className={styles.timeDate}>
              <div className={styles.readingTime}>
                  <FontAwesomeIcon icon={ faClock }/>
                  <p>3min read</p>
              </div>
              <p>25 Nov 2025</p>
            </div>
          </div>
        </div>
     
        <div className={styles.item}>
          <div className={styles.imgContainer}>
            <Image src='/fashion.png' fill className={styles.img} alt='fashion' objectFit='cover' />
          </div>
          <div className={styles.post}>
            <h4>Lorem ipsum dolor sit amet consectetur amet .</h4>
            <div className={styles.timeDate}>
              <div className={styles.readingTime}>
                  <FontAwesomeIcon icon={ faClock }/>
                  <p>3min read</p>
              </div>
              <p>25 Nov 2025</p>
            </div>
          </div>
        </div>
        <Glow 
            top='150%' 
            left='50%' 
            width={500} 
            height={500} 
            color='#09D5B0'
            mtop='90%'
            mleft='50%'
          />
      </div>
    </div>
  )
}

export default PopularPosts


