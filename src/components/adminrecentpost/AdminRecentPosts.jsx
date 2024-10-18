import React from 'react'
import styles from './adminrecentpost.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarChart, faClock, faComment, faEye, faGear, faPencil, faShare } from '@fortawesome/free-solid-svg-icons'

const AdminRecentPosts = () => {
  return (
    <div className={styles.container} style={{'--img': "url('/culture.png')"}}>
      <div className={styles.sliderItem}>
        
        <div className={styles.top}>
          <div className={styles.itemsContainer}>
            <div className={styles.button}>
              <FontAwesomeIcon icon={faPencil}/>
            </div>

            <div className={styles.button}>
              <FontAwesomeIcon icon={faGear}/>
            </div>

            <div className={styles.button}>
              <FontAwesomeIcon icon={faBarChart}/>
            </div>
          </div>
        </div>

        <div className={styles.textContainer}>
            <p>LATEST POSTS</p>
            <h4>20 Best Travel Tips After 5 Years Of Traveling The World</h4>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <FontAwesomeIcon className={styles.icon} icon={ faEye }/>
                <p>12K Views</p>
              </div>
              <div className={styles.stat}>
                <FontAwesomeIcon className={styles.icon} icon={faShare} />
                <p>234 Shares</p>
              </div>
              <div className={styles.stat}>
                <FontAwesomeIcon className={styles.icon} icon={faComment} />
                <p>44 Comments</p>
              </div>
              <div className={styles.stat}>
                <FontAwesomeIcon className={styles.icon} icon={faClock} />
                <p>Released 3d ago</p>
              </div>
            </div>
        </div>
      </div>
      <div className={styles.dashes}>
        <div className={styles.dash} />
        <div className={styles.dash} />
        <div className={styles.dash} />
      </div>
    </div>
  )
}

export default AdminRecentPosts
