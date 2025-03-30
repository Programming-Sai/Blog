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
  const [options, setOptions] = useState([]);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };



  

  useEffect(() => {
    const getCategories = async () => {
      try {
        const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/categories`);
  
        if (!result.ok) {
          throw new Error(`${result.statusText || "Something went wrong."}`);
        }
  
        const data = await result.json();
        setOptions(data);
      } catch (e) {
        console.error(e.message);
      }
    };
  
    getCategories();
  }, []);
  



const handleOptionClick = (option) => {
    setCategory(option); 
    console.log(option, " Selected")
    setIsOpen(false);
  };

  
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
          {options?.map((option, index) => (
            <div
              key={index}
              className={styles.dropdownItem}
              onClick={() => handleOptionClick(option.title)}
            >
              <div className={styles.imgContainer}>
                <Image fill src={option.image || '/coding.png'} className={styles.img} alt={option.title}/>
              </div>
              <p>{option.title}</p>
              <input   checked={category === option.title}  type="checkbox" style={{ marginLeft: 'auto' }} readOnly/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
