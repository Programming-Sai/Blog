"use client";

import React, { createContext, useState } from "react";
import useLocalStorage from "@/components/UseLocalStorage";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage("theme", getDefaultTheme());
  const [overlay, setOverlay] = useState(false);
  const [toggleSidePane, setToggleSidePane] = useState(false);
  const [autoSave, setAutoSave] = useLocalStorage("autoSave", true);
  const [autoSaveDuration, setAutoSaveDuration] = useLocalStorage(
    "autoSaveDuration",
    120000
  );
  const [quillTheme, setQuillTheme] = useLocalStorage("quillTheme", "snow");

  function getDefaultTheme() {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) return storedTheme;
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      return systemPrefersDark ? "dark" : "light";
    }
    return "dark"; // Default to dark if no window
  }

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

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
      {children}
    </ThemeContext.Provider>
  );
};
