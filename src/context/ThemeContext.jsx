"use client";

import React, { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();

const getThemeFromLocalStorage = () => {
    if (typeof window !== 'undefined') {  // Fixed check for undefined
        const value = localStorage.getItem("theme");
        return value || 'light';
    }
    return 'light'; // Fallback in case window is undefined
};


export const ThemeContextProvider = ({ children }) => {
    const [theme, setTheme] = useState(getThemeFromLocalStorage());
    const [overlay, setOverlay] = useState(false);
    const [toggleSidePane, setToggleSidePane] = useState(false);



    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    useEffect(()=>{
        localStorage.setItem('theme', theme)
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, overlay, setOverlay, toggleSidePane, setToggleSidePane }}> {/* Add value prop */}
            {children}
        </ThemeContext.Provider>
    );
};
