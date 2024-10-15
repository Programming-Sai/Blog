import React from 'react'
import styles from './login.module.css';
import Image from 'next/image';
import Link from 'next/link';

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.back}>.</div>
      <div className={styles.overlay}>
        <div className={styles.loginContainer}>
          <h1>Sign In With</h1>
          <div className={styles.links}>
              
              <Link href='/login'>
                <Image className={styles.img} src='/facebook.png' width={90} height={90} />          
              </Link>
              <Link href='/login'>
                <Image className={styles.img} src='/X.png' width={90} height={90} />          
              </Link>
              <Link href='/login'>
                <Image className={styles.img} src='/Google.png' width={90} height={90} />          
              </Link>
              <Link href='/login'>
                <Image className={styles.img} src='/Github.png' width={90} height={90} />          
              </Link> 
              <Link href='/login'>
                <Image className={styles.img} src='/LinkedIn.png' width={90} height={90} />          
              </Link>
              
          </div>
         
        </div>
      </div>
    </div>
  )
}

export default Login
