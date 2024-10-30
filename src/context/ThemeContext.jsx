"use client";

import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

const getThemeFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) return storedTheme;
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return systemPrefersDark ? "dark" : "light";
  }
  return "dark";
};

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(getThemeFromLocalStorage());
  const [overlay, setOverlay] = useState(false);
  const [toggleSidePane, setToggleSidePane] = useState(false);
  const [autoSave, setAutoSave] = useState(() => {
    const savedValue = localStorage.getItem("autoSave");
    return savedValue !== null ? JSON.parse(savedValue) : true;
  });
  const [autoSaveDuration, setAutoSaveDuration] = useState(() => {
    const savedValue = localStorage.getItem("autoSaveDuration");
    return savedValue !== null ? Number(savedValue) : 120000;
  });
  const [quillTheme, setQuillTheme] = useState(() => {
    const savedValue = localStorage.getItem("quillTheme");
    return savedValue !== null ? savedValue : "snow";
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("quillTheme", quillTheme);
  }, [quillTheme]);

  useEffect(() => {
    localStorage.setItem("autoSaveDuration", autoSaveDuration.toString());
  }, [autoSaveDuration]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        overlay,
        setOverlay,
        toggleSidePane,
        setToggleSidePane,
        autoSaveDuration,
        setAutoSaveDuration,
        autoSave,
        setAutoSave,
        quillTheme,
        setQuillTheme,
      }}
    >
      {" "}
      {/* Add value prop */}
      {children}
    </ThemeContext.Provider>
  );
};
