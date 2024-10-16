'use client'
import React, { useContext, useEffect } from 'react'
import { usePathname } from 'next/navigation'; // Import usePathname for route change detection
import styles from '../sidepanel/sidepanel.module.css'
import Link from 'next/link'
import AuthLinks from '../authlinks/AuthLinks'
import { ThemeContext } from '@/context/ThemeContext';

const SidePanel = () => {
  const { toggleSidePane, setToggleSidePane } = useContext(ThemeContext);
  const pathname = usePathname(); 

  useEffect(() => {
    setToggleSidePane(false); 
  }, [pathname, setToggleSidePane]); 

  return (
    <div>
      
      <p className={`${styles.button} ${styles.open}`} onClick={(event) => {
        event.stopPropagation(); // Prevent event propagation issues
        setToggleSidePane(!toggleSidePane);
      }}>☰</p>


      <div 
        className={`${styles.mobile} ${toggleSidePane ? styles.mobileOpen : styles.mobileClose }`} 
        tabIndex={2}
      >
        <div className={styles.mobileLayer}>
            <div className={styles.mobileHeader}>
                <div className={`${styles.logo} ${styles.mobileLogo}`}>Logo</div>
                <p className={styles.button} onClick={()=>{
                    setToggleSidePane(!toggleSidePane)
                }}>✕</p>
            </div>
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
                    <AuthLinks currentRoute={pathname }/>
            </ul>
        </div>
      </div>
      
    </div>
  )
}

export default SidePanel
