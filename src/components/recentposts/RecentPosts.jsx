import React from 'react';
import styles from './recentposts.module.css';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons';
import Glow from '../glow/Glow';


const RecentPosts = ({ width }) => {
  return (
    <div className={styles.container} style={{width: width}}>
      <h1>Recent Posts</h1>
      <div className={styles.recentPostsContainer}>
        
        <Glow 
            top='30%' 
            left='20%' 
            width={600} 
            height={600} 
            color='#00A3FF'
            mtop='35%'
            mleft='0'
        />

        <div className={styles.item}>
            <div className={styles.imgContainer}>
                <Image src='/fashion.png' alt='fashion' layout='fill' objectFit='cover'/>
            </div>
            <div className={styles.post}>
                <p className={styles.timeTag}>
                    <span className={styles.time}>25-09-2024</span> - LIFESTYLE
                </p>
                <h3>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, repellendus!</h3>
                <p className={styles.desc}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam consequatur doloribus corporis at corrupti ratione molestiae fuga unde. Cum, placeat.
                </p>
                <div className={styles.dateRead}>
                    <button className={styles.read}>Read More</button>
                    <div className={`${styles.readingTime} ${styles.time}`}>
                        <FontAwesomeIcon icon={ faClock }/>
                        <p>3min read</p>
                    </div>
                </div>
            </div>
        </div>
     
        <div className={styles.item}>
            <div className={styles.imgContainer}>
                <Image src='/food.png' alt='food' layout='fill' objectFit='cover'/>
            </div>
            <div className={styles.post}>
                <p className={styles.timeTag}>
                    <span className={styles.time}>25-09-2024</span> - LIFESTYLE
                </p>
                <h3>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, repellendus!</h3>
                <p className={styles.desc}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam consequatur doloribus corporis at corrupti ratione molestiae fuga unde. Cum, placeat.
                </p>
                <div className={styles.dateRead}>
                    <button className={styles.read}>Read More</button>
                    <div className={`${styles.readingTime} ${styles.time}`}>
                            <FontAwesomeIcon icon={ faClock }/>
                            <p>3min read</p>
                        </div>
                </div>
            </div>
        </div>
     

        <div className={styles.item}>
            <div className={styles.imgContainer}>
                <Image src='/coding.png' alt='coding' layout='fill' objectFit='cover'/>
            </div>
            <div className={styles.post}>
                <p className={styles.timeTag}>
                    <span className={styles.time}>25-09-2024</span> - LIFESTYLE
                </p>
                <h3>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, repellendus!</h3>
                <p className={styles.desc}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam consequatur doloribus corporis at corrupti ratione molestiae fuga unde. Cum, placeat.
                </p>
                <div className={styles.dateRead}>
                    <button className={styles.read}>Read More</button>
                    <div className={`${styles.readingTime} ${styles.time}`}>
                            <FontAwesomeIcon icon={ faClock }/>
                            <p>3min read</p>
                        </div>
                </div>
            </div>
        </div>
     

        <div className={styles.item}>
            <div className={styles.imgContainer}>
                <Image src='/culture.png' alt='culture' layout='fill' objectFit='cover'/>
            </div>
            <div className={styles.post}>
                <p className={styles.timeTag}>
                    <span className={styles.time}>25-09-2024</span> - LIFESTYLE
                </p>
                <h3>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, repellendus!</h3>
                <p className={styles.desc}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam consequatur doloribus corporis at corrupti ratione molestiae fuga unde. Cum, placeat.
                </p>
                <div className={styles.dateRead}>
                    <button className={styles.read}>Read More</button>
                    <div className={`${styles.readingTime} ${styles.time}`}>
                            <FontAwesomeIcon icon={ faClock }/>
                            <p>3min read</p>
                        </div>
                </div>
            </div>
        </div>
     

        <div className={styles.item}>
            <div className={styles.imgContainer}>
                <Image src='/travel.png' alt='travel' layout='fill' objectFit='cover'/>
            </div>
            <div className={styles.post}>
                <p className={styles.timeTag}>
                    <span className={styles.time}>25-09-2024</span> - LIFESTYLE
                </p>
                <h3>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam, repellendus!</h3>
                <p className={styles.desc}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam consequatur doloribus corporis at corrupti ratione molestiae fuga unde. Cum, placeat.
                </p>
                <div className={styles.dateRead}>
                    <button className={styles.read}>Read More</button>
                    <div className={`${styles.readingTime} ${styles.time}`}>
                            <FontAwesomeIcon icon={ faClock }/>
                            <p>3min read</p>
                        </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  )
}

export default RecentPosts
