import React from 'react'
import styles from './authlinks.module.css'
import Link from 'next/link';


  const AuthLinks = ({ currentRoute }) => {
  // let isAdmin = false;
  let isAdmin = true;
  const status = 'unauthenticated';
  return (
    <>
      <li className={styles.authlink}>
        <Link href='/login'>{status == 'authenticated' ? "Logout" : "Login"}</Link>
      </li>
      {
      isAdmin && 
        <li className={`${styles.authlink} ${styles.last}`}>
          <Link href='/admin'>Admin</Link>
        </li>
      }
    </>
  )
}

export default AuthLinks
