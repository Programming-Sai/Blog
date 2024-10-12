import React from 'react'
import styles from './authlinks.module.css'
import Link from 'next/link';


const AuthLinks = () => {
  const status = 'unauthenticated';
  return (
    <li className={styles.authlink}>
      <Link href='/'>{status == 'authenticated' ? "Logout" : "Login"}</Link>
    </li>
  )
}

export default AuthLinks
