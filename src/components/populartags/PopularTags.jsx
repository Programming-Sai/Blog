import React from 'react'
import styles from './populartags.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Glow from '../glow/Glow';


const PopularTags = () => {
  return (
    <div className={styles.container}>
      <Glow 
            top='-100%' 
            left='-40%' 
            width={600} 
            height={600} 
            color='#890A8C'
            mtop='35%'
            mleft='0'
      />
      <h1>Popular Tags</h1>
      <div className={styles.tagContainer}>

       <Link href='/blog/sports' className={`${styles.tagItem} ${styles.sports}`}>
          <Image width={50} height={50} src='/style.png' className={styles.img}/>
          <p>Sports</p>
        </Link>

        <Link href='/' className={`${styles.tagItem} ${styles.news}`}>
          <Image width={50} height={50} src='/fashion.png' className={styles.img}/>
          <p>News</p>
        </Link>

        <Link href='/' className={`${styles.tagItem} ${styles.lifeStyle}`}>
          <Image width={50} height={50} src='/travel.png' className={styles.img}/>
          <p>Lifestyle</p>
        </Link>

        <Link href='/' className={`${styles.tagItem} ${styles.music}`}>
          <Image width={50} height={50} src='/culture.png' className={styles.img}/>
          <p>Music</p>
        </Link>

        <Link href='/' className={`${styles.tagItem} ${styles.movie}`}>
          <Image width={50} height={50} src='/food.png' className={styles.img}/>
          <p>Movies</p>
        </Link>

      </div>
    </div>
  )
}

export default PopularTags
