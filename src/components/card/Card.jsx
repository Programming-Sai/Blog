import React from 'react';
import styles from './card.module.css';

const Card = ({ children, justify, className }) => {
  return (
    <div 
      className={`${styles.container} ${className}`} 
      style={{ '--justify': justify }}
    >
      {children}
    </div>
  );
};

export default Card;
