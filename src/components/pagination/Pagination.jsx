"use client";

import React from "react";
import styles from "./pagination.module.css";
import { useRouter } from "next/navigation";
import Glow from "../glow/Glow";

const Pagination = ({ theme, cat, page, totalPages, onPageChange }) => {
  const router = useRouter();

  const handleNavigation = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      onPageChange(newPage);
      router.push(`?page=${newPage}${cat ? `&cat=${cat}` : ""}`);
    }
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={page <= 1}
        onClick={() => handleNavigation(page - 1)}
      >
        Previous
      </button>
      <span className={styles.pageInfo}>
        Page {page} of {totalPages}
      </span>
      <Glow
        top="-700%"
        left="-50%"
        width={500}
        height={500}
        color={theme === "dark" ? "#890A8C" : "#11F027"}
        mtop="90%"
        mleft="50%"
      />
      <button
        className={styles.button}
        disabled={page >= totalPages}
        onClick={() => handleNavigation(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

// TODO: Fix pagination issues on the page due to the cat query param.
