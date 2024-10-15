import React from 'react'
import styles from './authlinks.module.css'
import Link from 'next/link';


const AuthLinks = () => {
  const status = 'unauthenticated';
  return (
    <li className={styles.authlink}>
      <Link href='/login'>{status == 'authenticated' ? "Logout" : "Login"}</Link>
    </li>
  )
}

export default AuthLinks
