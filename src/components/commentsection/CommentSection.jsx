import React from 'react';
import styles from './commentsection.module.css';
import Image from 'next/image';
import Glow from '../glow/Glow';

const CommentSection = ({ width }) => {
  return (
    <div className={styles.container} style={ {width: width } }>
      <div className={styles.postsContainer}>
        
        <div className={styles.item}>
          <div className={styles.imgContainer}>
            <Image src='/fashion.png' fill className={styles.img} alt='fashion' objectFit='cover' />
          </div>
          <div className={styles.post}>
            <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias nam eaque aliquam quod recusandae ut culpa dicta pariatur incidunt id tempora, officia laudantium vel, ea omnis modi est! Nam, corrupti?</h4>
            <div className={styles.timeDate}>
              <p className={styles.username}>Jane Smith</p>
              <p>25 Nov 2025</p>
            </div>
          </div>
        </div>
     
        <div className={styles.item}>
          <div className={styles.imgContainer}>
            <Image src='/fashion.png' fill className={styles.img} alt='fashion' objectFit='cover' />
          </div>
          <div className={styles.post}>
            <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias nam eaque aliquam quod recusandae ut culpa dicta pariatur incidunt id tempora, officia laudantium vel, ea omnis modi est! Nam, corrupti?</h4>
            <div className={styles.timeDate}>
              <p className={styles.username}>Jane Smith</p>
              <p>25 Nov 2025</p>
            </div>
          </div>
        </div>
     
        <div className={styles.item}>
          <div className={styles.imgContainer}>
            <Image src='/fashion.png' fill className={styles.img} alt='fashion' objectFit='cover' />
          </div>
          <div className={styles.post}>
            <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias nam eaque aliquam quod recusandae ut culpa dicta pariatur incidunt id tempora, officia laudantium vel, ea omnis modi est! Nam, corrupti?</h4>
            <div className={styles.timeDate}>
              <p className={styles.username}>Jane Smith</p>
              <p>25 Nov 2025</p>
            </div>
          </div>
        </div>
     
        <div className={styles.item}>
          <div className={styles.imgContainer}>
            <Image src='/fashion.png' fill className={styles.img} alt='fashion' objectFit='cover' />
          </div>
          <div className={styles.post}>
            <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias nam eaque aliquam quod recusandae ut culpa dicta pariatur incidunt id tempora, officia laudantium vel, ea omnis modi est! Nam, corrupti?</h4>
            <div className={styles.timeDate}>
              <p className={styles.username}>Jane Smith</p>
              <p>25 Nov 2025</p>
            </div>
          </div>
        </div>
     
        <div className={styles.item}>
          <div className={styles.imgContainer}>
            <Image src='/fashion.png' fill className={styles.img} alt='fashion' objectFit='cover' />
          </div>
          <div className={styles.post}>
            <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias nam eaque aliquam quod recusandae ut culpa dicta pariatur incidunt id tempora, officia laudantium vel, ea omnis modi est! Nam, corrupti?</h4>
            <div className={styles.timeDate}>
              <p className={styles.username}>Jane Smith</p>
              <p>25 Nov 2025</p>
            </div>
          </div>
        </div>
        <Glow 
            top='-30%' 
            left='-10%' 
            width={500} 
            height={500} 
            color='#F0E711'
            mtop='-20%'
            mleft='20%'
          />
      </div>
    </div>
  )
}

export default CommentSection
