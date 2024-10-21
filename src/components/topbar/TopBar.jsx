'use client'
import React, { useContext, useEffect } from 'react'
import styles from './topbar.module.css';
import ThemeToggle from '@/components/themetoggle/ThemeToggle';
import { ThemeContext } from '@/context/ThemeContext'
import { usePathname } from 'next/navigation';


const TopBar = () => {
  const { setToggleSidePane, toggleSidePane } = useContext(ThemeContext);
  const route = usePathname().split('/')[2];

  let title = '';
  if ( route === 'dashboard'){
    title = 'Dashboard';
  }else if ( route === 'published-blogs'){
    title = 'Published Blogs';
  }else if ( route === 'editor'){
    title = 'Editor';
  }else if ( route === 'settings'){
    title = 'Settings';
  }else if ( route === 'drafts'){
    title = 'Drafts';
  } 


  useEffect(() => {
    window.addEventListener('keydown', handleKeyCombination);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyCombination);
    };
  }, []);


  const handleKeyCombination = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
      event.preventDefault(); 
      setToggleSidePane((prev) => !prev);
    }
  }


  
  return (
    <div className={`${styles.container} ${toggleSidePane ? styles.active : ''}`} style={toggleSidePane ? {'--left': '80px', zIndex:10} : {'--left': '250px', zIndex:10}}>
      
      
      <div className={styles.top}>
        <p className={`${styles.buton} ${styles.open}`} style={{zIndex:100}} onClick={(event) => {
            event.stopPropagation(); 
            setToggleSidePane(!toggleSidePane);
          }}>
            { '☰' }
        </p>        
        <h2>{ title }</h2>
        <ThemeToggle />
        {/* <Searchbar /> */}
      </div>

    </div>
  )
}

export default TopBar

