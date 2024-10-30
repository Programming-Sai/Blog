"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import styles from "./scrolltotopbutton.module.css";

const ScrollToTopButton = () => {
  const [toggle, setToggle] = useState(true);
  return (
    <a
      href={toggle ? "#top" : "#bottom"}
      className={styles.container}
      onClick={() => {
        setToggle(!toggle);
      }}
    >
      <FontAwesomeIcon
        icon={toggle ? faAngleDown : faAngleUp}
        className={styles.button}
      />
    </a>
  );
};

export default ScrollToTopButton;
