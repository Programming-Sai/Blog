import React from 'react'
import styles from './navbar.module.css'
import Link from 'next/link'
import AuthLinks from '../authlinks/AuthLinks'
import ThemeToggle from '../themetoggle/ThemeToggle'
import Searchbar from '../searchbar/Searchbar'
import SidePanel from '../sidepanel/SidePanel'


const Navbar = ({ disabled }) => {

   if (disabled) return null;

  return (
    <div className={styles.container} >
    <div className={styles.back} />
    <div className={styles.logo}>Logo</div>
    <div className={styles.header}>
        <Searchbar />
        <nav className={styles.nav}> 
            <ul>
                <li>
                    <Link href='/'>Home</Link>
                </li>
                <li>
                    <Link href='/about'>About</Link>
                </li>
                <li>
                    <Link href='/contact'>Contact</Link>
                </li>
                    <AuthLinks />
            </ul>
        </nav>
        <ThemeToggle />
        <SidePanel />
    </div>
     
    </div>
  )
}

export default Navbar


/* Add a search section to the navbar */
