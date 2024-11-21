"use client";
import React, { useContext } from "react";
import styles from "./content.module.css";
import { ThemeContext } from "@/context/ThemeContext";
import Home from "../Home/Home";

export default function Content({ page }) {
  const { overlay, theme, toggleSidePane } = useContext(ThemeContext);

  return (
    <div
      className={styles.container}
      style={overlay || toggleSidePane ? { zIndex: 0 } : { zIndex: 1 }}
    >
      <Home page={page} theme={theme} />
    </div>
  );
}
