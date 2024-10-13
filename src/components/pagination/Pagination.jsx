import React from 'react';
import styles from './pagination.module.css';
import Glow from '../glow/Glow';



const Pagination = ({ theme, width }) => {
  return (
    <div className={styles.container}  style={{'--width': `${width}`}}>
      <button className={styles.button}>Previous</button>
      <Glow 
        top='-700%' 
        left='-50%' 
        width={500} 
        height={500} 
        color= { theme === 'dark' ? '#890A8C': '#11F027' }
        mtop='90%'
        mleft='50%'
      />
      <button className={styles.button}>Next</button>
    </div>
  )
}

export default Pagination
