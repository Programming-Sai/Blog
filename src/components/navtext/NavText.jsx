"use client";
import React from "react";
import { usePathname } from "next/navigation";
import styles from "./navtext.module.css";

const NavText = ({ children }) => {
  const currentPath = usePathname();

  return (
    <span
      className={`${styles.navText} ${
        currentPath.replace("/", "") === children.toLowerCase() ||
        (currentPath === "/" && children.toLowerCase() === "home")
          ? styles.active
          : ""
      }`}
    >
      {children}
    </span>
  );
};

export default NavText;
