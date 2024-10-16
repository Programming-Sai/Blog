import React from 'react';
import styles from './card.module.css';

const Card = ({ children, justify }) => {
  return (
    <div className={styles.container} style={{'--justify': justify}}>
        { children }
    </div>
  )
}

export default Card;
