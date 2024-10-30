'use client'
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import styles from './scrolltotopbutton.module.css';
import { useRouter } from 'next/navigation';


const ScrollToTopButton = () => {
    const router = useRouter();

    const isLoading = router.isFallback;

    return (
            isLoading && (
            <a href="#top" className={styles.container}>
                <FontAwesomeIcon icon={faAngleUp} className={styles.button} />
             </a>
            )        
    );
};

export default ScrollToTopButton;
