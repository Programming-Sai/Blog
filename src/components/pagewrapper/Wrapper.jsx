"use client";
import React, { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

const Wrapper = ({ children }) => {
  const { overlay, toggleSidePane } = useContext(ThemeContext);

  return (
    <div
      style={
        overlay || toggleSidePane
          ? { zIndex: 0, position: "relative" }
          : { zIndex: 1, position: "relative" }
      }
    >
      {children}
    </div>
  );
};

export default Wrapper;
