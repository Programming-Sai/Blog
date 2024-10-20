'use client'
import styles from './sidenavbar.module.css'
import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faEdit, faGear, faPencilAlt, faSignOutAlt, faTachometerAlt } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Image from 'next/image'
import { ThemeContext } from '@/context/ThemeContext'

const SideNavbar = () => {
    const { toggleSidePane } = useContext(ThemeContext);

  return (
    <div className={`${styles.container} ${toggleSidePane ? styles.active : ''}`} style={toggleSidePane ? {'--left': '80px'} : {'--left': '250px'}}>
     
      


      <div className={styles.profileContainer}>
        <div className={styles.imgContainer} style={{'--img': 'url("/p1.jpeg")'}}>
            <Image className={styles.img} src='/fashion.png' fill/>
        </div>
        <h1>Name</h1>
        <p>email@gmail.com</p>
      </div>

      <ul>
        <li>
            <Link className={styles.a} href='/admin/dashboard'>
                <FontAwesomeIcon className={styles.icon} icon={ faTachometerAlt } />
                <span>Dashboard</span>
            </Link>
        </li>

        <li>
            <Link className={styles.a} href='/admin/published-blogs'>
                <FontAwesomeIcon className={styles.icon} icon={ faCheckCircle } />
                <span>Published Blogs</span>
            </Link>
        </li>

        <li>
            <Link className={styles.a} href='/admin/drafts'>
                <FontAwesomeIcon className={styles.icon} icon={ faPencilAlt } />
                <span>Drafts</span>
            </Link>
        </li>

        <li>
            <Link className={styles.a} href='/admin/editor'>
                <FontAwesomeIcon className={styles.icon} icon={ faEdit } />
                <span>Editor</span>
            </Link>
        </li>

        <li>
            <Link className={styles.a} href='/admin/settings'>
                <FontAwesomeIcon className={styles.icon} icon={ faGear } />
                <span>Settings</span>
            </Link>
        </li>

        <li>
            <Link className={styles.a} href='/admin/logout'>
                <FontAwesomeIcon className={styles.icon} icon={ faSignOutAlt } />
                <span>Logout</span>
            </Link>
        </li>
      </ul>
    </div>
  )
}

export default SideNavbar

