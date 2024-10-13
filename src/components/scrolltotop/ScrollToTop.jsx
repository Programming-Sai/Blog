import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import styles from './scrolltotop.module.css';

const ScrollToTop = () => {
    return (
        <a href="#top" className={styles.container}>
            <FontAwesomeIcon icon={faAngleUp} className={styles.button} />
        </a>
    );
};

export default ScrollToTop;
