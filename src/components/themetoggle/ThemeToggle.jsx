"use client";

import React, { useContext } from 'react';
import styles from './themetoggle.module.css'
import Image from 'next/image'
import { ThemeContext } from '@/context/ThemeContext';


const ThemeToggle = () => {


  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={styles.container} onClick={toggleTheme} style={theme == 'dark' ? {borderColor: '#EEFFEF', backgroundColor:'#EEFFEF'} : {borderColor: '#011106', backgroundColor:'#011106'}}>
      <Image className={styles.img} width={14} height={14} alt='Moon' src='/moon.png'/>
      <div className={styles.ball} style={theme == 'dark' ? {left:1, backgroundColor:'black'} : {right:1, backgroundColor:'white'}}></div>
      <Image className={styles.img} width={14} height={14} alt='Sun' src='/sun.png'/>
    </div>
  )
}

export default ThemeToggle
