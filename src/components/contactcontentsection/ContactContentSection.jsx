'use client'
import React, { useState } from 'react'
import styles from './contactcontentsection.module.css'

const ContactContentSection = ({ className }) => {
  const isLoggedin = true;
  return (
    <form className={`${styles.container} ${className}`}> 
      { !isLoggedin && (<input type='email' placeholder='From...'  required/>)}
      <input type='text' placeholder='Subject...' required/>
      <textarea placeholder='Message...' required/>
      <div className={styles.centerSubmitButton}>
          <input type='submit' value='Send' />
      </div>
    </form> 
  )
}

export default ContactContentSection
