'use client'
import React, { useContext, useEffect } from 'react'
import styles from './publishedblogs.module.css';
import ThemeToggle from '@/components/themetoggle/ThemeToggle';
import Searchbar from '@/components/searchbar/Searchbar';
import { ThemeContext } from '@/context/ThemeContext'
import Card from '@/components/card/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCab, faClock, faComputer, faEarth, faFileAlt, faNewspaper, faStopwatch, faTv } from '@fortawesome/free-solid-svg-icons';



const PublishedBlogs = () => {
  const { setToggleSidePane, toggleSidePane } = useContext(ThemeContext);


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
      <h2>Published Blogs</h2>
      <ThemeToggle />
      {/* <Searchbar /> */}
      </div>

    </div>
  )
}

export default PublishedBlogs;
