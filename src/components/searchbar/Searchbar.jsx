"use client";
import React, { useState, useContext, useEffect } from "react";
import styles from "./searchbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "@/context/ThemeContext";
import BASE_PATH from "../../../base";
import Link from "next/link";
import ComponentLoader from "../componentloader/ComponentLoader";

const Searchbar = () => {
  const { overlay, setOverlay } = useContext(ThemeContext);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchResults = async () => {
    if (!search.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/search?searchTerm=${search}`
      );
      if (!response.ok) {
        throw new Error("Something Went Wrong");
      }
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!search.trim()) return; // Guard against empty input
    fetchResults();
  };

  const handleKeyCombination = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "/") {
      event.preventDefault();
      setOverlay(!overlay);
    }
  };

  useEffect(() => {
    // Add event listener
    window.addEventListener("keydown", handleKeyCombination);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyCombination);
    };
  }, [overlay]); // Empty dependency array to run only on mount/unmount

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
              handleSearch();
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
          {loading ? (
            <div className={styles.loader}>
              <ComponentLoader />
            </div>
          ) : (
            <div className={`${styles.result} ${styles.counter}`}>
              {result.length > 0 ? (
                result?.map((res) => (
                  <Link
                    href={`/${res.slug}`}
                    key={res.key}
                    className={styles.resultContainer}
                    style={{ "--back": `url(${BASE_PATH}${res.image || '/coding.png'})` }}
                    onClick={() => {
                      setOverlay(!overlay);
                    }}
                  >
                    <h1 className={styles.resultTitle}>{res.title}</h1>
                    <p className={styles.resultDescription}>
                      {res.desc?.slice(0, 100) + "..."}
                    </p>
                  </Link>
                ))
              ) : (
                <p className={styles.noResult}>No Result Found </p>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Searchbar;
