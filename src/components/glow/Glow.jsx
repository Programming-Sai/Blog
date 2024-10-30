import React from 'react';
import styles from './glow.module.css';

const Glow = ({ width, height, color, mtop, mleft, top = '-90%', left = '60%' }) => {
  return (
    <div 
      className={styles.container}
      style={{
        '--glow-color': color, // Use a variable for the background color
        '--top': top,          // Use a variable for default top position
        '--left': left,        // Use a variable for default left position
        '--mtop': mtop,        // Custom variable for mobile top position
        '--mleft': mleft,      // Custom variable for mobile left position
        width: `${width}px`,
        height: `${height}px`,
        filter: `blur(${width / 4}px)`, 
        zIndex: -10,
      }}
    />
  );
}

export default Glow;
