"use client";
import React, { useState, useContext } from "react";
import styles from "./searchbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "@/context/ThemeContext";
import BASE_PATH from "../../../base";

const searchResult = [
  {
    key: "1",
    title: "Understanding React's Virtual DOM",
    description:
      "A comprehensive guide to understanding the Virtual DOM in React and how it optimizes performance.",
    image: "/food.png",
  },
  {
    key: "2",
    title: "JavaScript Promises and Async/Await",
    description:
      "Learn about JavaScript promises and how to use async/await for cleaner asynchronous code.",
    image: "/fashion.png",
  },
  {
    key: "3",
    title: "CSS Grid vs Flexbox: Which One to Use?",
    description:
      "A comparison of CSS Grid and Flexbox layout techniques, their use cases, and which one to choose.",
    image: "/culture.png",
  },
  {
    key: "4",
    title: "Building Scalable APIs with Node.js",
    description:
      "Discover best practices for building scalable and maintainable APIs using Node.js.",
    image: "/coding.png",
  },
  {
    key: "5",
    title: "Getting Started with TypeScript",
    description:
      "An introductory guide to TypeScript, its benefits, and how to get started in your next JavaScript project.",
    image: "/travel.png",
  },
  {
    key: "6",
    title: "Best UI/UX Practices for Web Design",
    description:
      "Explore the best practices for designing user interfaces and improving user experiences on the web.",
    image: "/style.png",
  },
];

const Searchbar = () => {
  const { overlay, setOverlay } = useContext(ThemeContext);

  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);

  const searchAndReturn = () => {
    if (search.trim() === "") return; // Prevent searching when input is empty

    const newResults = []; // Array to hold new results
    const searchLower = search.toLowerCase(); // Convert search to lowercase for case insensitive matching

    for (const obj of searchResult) {
      // Check if title or description includes the search string
      if (
        obj.title.toLowerCase().includes(searchLower) ||
        obj.description.toLowerCase().includes(searchLower)
      ) {
        newResults.push(obj); // Add matching results to the new array
      }
    }

    setResult(newResults); // Set the new results to the state
  };

  return (
    <>
      <div
        className={`${styles.container} ${overlay && styles.grow}`}
        onClick={() => {
          setOverlay(!overlay);
          setResult([]);
          setSearch("");
        }}
      >
        <FontAwesomeIcon
          icon={!overlay ? faSearch : faClose}
          className={styles.searchIcon}
        />
        <input
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              searchAndReturn();
            }
          }}
          value={search}
          className={styles.searchbar}
          placeholder="Discover news, articles and more..."
          onClick={(event) => {
            overlay && event.stopPropagation();
          }}
        />
      </div>
      {overlay && (
        <div className={styles.overlay}>
          <div className={`${styles.result} ${styles.counter}`}>
            {result.length > 0 ? (
              result.map((res) => (
                <div
                  key={res.key}
                  className={styles.resultContainer}
                  style={{ "--back": `url(${BASE_PATH}${res.image})` }}
                  onClick={() => {
                    console.log(res);
                    setSearch("");
                  }}
                >
                  <h1 className={styles.resultTitle}>{res.title}</h1>
                  <p className={styles.resultDescription}>{res.description}</p>
                </div>
              ))
            ) : (
              <p className={styles.noResult}>No Result Found</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Searchbar;
