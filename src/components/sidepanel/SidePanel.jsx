'use client'
import React, { useContext, useEffect } from 'react'
import { usePathname } from 'next/navigation'; // Import usePathname for route change detection
import styles from '../sidepanel/sidepanel.module.css'
import Link from 'next/link'
import AuthLinks from '../authlinks/AuthLinks'
import { ThemeContext } from '@/context/ThemeContext';

const SidePanel = () => {
  const { toggleSidePane, setToggleSidePane } = useContext(ThemeContext);
  const pathname = usePathname(); // Get current path

  // Close side panel on route change
  useEffect(() => {
    setToggleSidePane(false); // Close the side panel when the route changes
  }, [pathname, setToggleSidePane]); // Dependency array includes pathname to track route changes

  return (
    <div>
      
      <p className={styles.button} onClick={(event) => {
        event.stopPropagation(); // Prevent event propagation issues
        setToggleSidePane(!toggleSidePane);
      }}>☰</p>


      <div 
        className={`${styles.mobile} ${toggleSidePane ? styles.mobileOpen : styles.mobileClose }`} 
        // onFocus={()=>{setToggleSidePane(!toggleSidePane)}} 
        tabIndex={2}
      >
        <div className={styles.mobileLayer}>
            <div className={styles.mobileHeader}>
                <div className={`${styles.logo} ${styles.mobileLogo}`}>Logo</div>
                <p className={styles.button} onClick={()=>{
                    setToggleSidePane(!toggleSidePane)
                }}>✕</p>
            </div>
            <hr/>
            <p className={styles.subHeader}>Main Menu</p>
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
            <hr />
            <p className={styles.subHeader}>Poplular Categories</p>
            <ul>
                <li>
                    <Link href='/'>Topic 1</Link>
                </li>
                <li>
                    <Link href='/'>Topic 2</Link>
                </li>
                <li>
                    <Link href='/'>Topic 3</Link>
                </li>
            </ul>
        </div>
      </div>
      
    </div>
  )
}

export default SidePanel
