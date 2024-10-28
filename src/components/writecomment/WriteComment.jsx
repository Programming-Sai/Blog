import React from 'react';
import styles from './writecomment.module.css';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const WriteComment = () => {
  const status = 'unauthenticated';

  return (
    <div className={styles.container}>
      <h2>Comments</h2>

      {status === 'authenticated' ? (

          <div className={styles.comment}>
            <input placeholder='Write Your thoughts here...' className={styles.input} />
            <button className={styles.send}>
                <FontAwesomeIcon icon={ faPaperPlane } />
            </button>
          </div>

      ) : (
        <Link href='/login' >Please Login to Write A Comment</Link>
      )}
      

    </div>
  )
}

export default WriteComment
