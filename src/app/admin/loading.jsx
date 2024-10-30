'use client'
import ComponentLoader from '@/components/componentloader/ComponentLoader'
import React, { useContext } from 'react'
import styles from './drafts/drafts.module.css'
import { ThemeContext } from '@/context/ThemeContext'


const PageLoaderContainer = () => {
  const { toggleSidePane } = useContext(ThemeContext);

  return (
    <div className={`${styles.container} ${toggleSidePane ? styles.active : ''}`} style={toggleSidePane ? {'--left': '80px', zIndex: 10} : {'--left': '250px', zIndex: 10}}>
        <ComponentLoader  />
    </div>
  )
}

export default PageLoaderContainer
