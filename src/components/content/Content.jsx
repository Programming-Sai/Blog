"use client";
import React, { useContext } from "react";
import styles from "./content.module.css";
import { ThemeContext } from "@/context/ThemeContext";
import Home from "../Home/Home";

export default function Content({ page, items }) {
  const { overlay, theme, toggleSidePane } = useContext(ThemeContext);

  return (
    <div
      className={styles.container}
      style={overlay || toggleSidePane ? { zIndex: 0 } : { zIndex: 1 }}
    >
      {/* <Home data={data} theme={theme} /> */}
      <Home theme={theme} {...items} />
    </div>
  );
}

// comeback and handle the double page reload and non faSuitcaseRolling.
