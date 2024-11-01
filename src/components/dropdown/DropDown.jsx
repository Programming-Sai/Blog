"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./dropdown.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import BASE_PATH from "../../../base";

const DropDown = ({ className, category, setCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // Reference to the dropdown container

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setCategory(option);
    setIsOpen(false);
  };

  const options = [
    {
      label: "Sports",
      image: `${BASE_PATH}/food.png`,
    },
    {
      label: "News",
      image: `${BASE_PATH}/fashion.png`,
    },
    {
      label: "Lifestyle",
      image: `${BASE_PATH}/travel.png`,
    },
    {
      label: "Music",
      image: `${BASE_PATH}/culture.png`,
    },
    {
      label: "Movies",
      image: `${BASE_PATH}/coding.png`,
    },
  ];

  useEffect(() => {
    if (typeof document !== "undefined") {
      const handleClickOutside = (event) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          setIsOpen(false); // Close the dropdown if clicked outside
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside); // Cleanup on unmount
      };
    }
  }, []);

  return (
    <div className={`${styles.dropdown} ${className}`} ref={dropdownRef}>
      <div className={styles.dropdownHeader} onClick={toggleDropdown}>
        {category}
        <FontAwesomeIcon icon={isOpen ? faCaretUp : faCaretDown} />
      </div>
      {isOpen && (
        <div className={styles.dropdownList}>
          {options.map((option, index) => (
            <div
              key={index}
              className={styles.dropdownItem}
              onClick={() => handleOptionClick(option.label)}
            >
              <div className={styles.imgContainer}>
                <Image fill src={option.image} className={styles.img} />
              </div>
              <p>{option.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
