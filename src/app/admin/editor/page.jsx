'use client'
import React, { useContext, useEffect } from 'react'
import styles from './editor.module.css';
import ThemeToggle from '@/components/themetoggle/ThemeToggle';
import Searchbar from '@/components/searchbar/Searchbar';
import { ThemeContext } from '@/context/ThemeContext'
import Card from '@/components/card/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCab, faClock, faComputer, faEarth, faFileAlt, faNewspaper, faStopwatch, faTv } from '@fortawesome/free-solid-svg-icons';



const Editor = () => {
  const { setToggleSidePane, toggleSidePane } = useContext(ThemeContext);


  return (
    <div className={`${styles.container} ${toggleSidePane ? styles.active : ''}`} style={toggleSidePane ? {'--left': '80px', zIndex:10} : {'--left': '250px', zIndex:10}}>
    
    </div>
  )
}

export default Editor;
