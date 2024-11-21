"use client";
import React, { useEffect, useState } from "react";
import styles from "./pagination.module.css";
import Glow from "../glow/Glow";
import { useRouter } from "next/navigation";
import ComponentLoader from "../componentloader/ComponentLoader";

const Pagination = ({ page, theme, width }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false); // To track navigation loading state
  const router = useRouter();

  const fetchData = async (newPage) => {
    setLoading(true); // Show loader
    try {
      const result = await fetch(`/api/posts?page=${newPage}`);
      if (!result.ok) {
        throw new Error("Failed to get posts");
      }
      const json = await result.json();
      setData(json);
    } catch (error) {
      console.error(error);
      setData({ POST_PER_PAGE: 0, count: 0 }); // Default fallback
    } finally {
      setLoading(false); // Hide loader once data is fetched
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handleNavigation = async (newPage) => {
    setIsNavigating(true); // Indicate we are navigating
    await fetchData(newPage); // Wait until data is fetched

    // Once data is fetched and the state is updated, stop loader and scroll
    setIsNavigating(false); // Reset navigating state

    // Ensure that the component is re-rendered with the updated data before scrolling
    setLoading(false); // Stop loader (after state has been updated with new data)

    // Update the URL and scroll after data is loaded
    router.push(`?page=${newPage}#recentPost`);

    // Wait for React to re-render before scrolling
    setTimeout(() => {
      const recentPostSection = document.getElementById("recentPost");
      if (recentPostSection) {
        recentPostSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 0); // This will ensure that scroll happens after the next event loop (i.e., after re-render)
  };

  return (
    <div className={styles.container} style={{ "--width": `${width}` }}>
      <button
        className={styles.button}
        onClick={() => handleNavigation(page - 1)}
        disabled={isNavigating || !data || data.POST_PER_PAGE * (page - 1) <= 0}
      >
        Previous
      </button>
      <Glow
        top="-700%"
        left="-50%"
        width={500}
        height={500}
        color={theme === "dark" ? "#890A8C" : "#11F027"}
        mtop="90%"
        mleft="50%"
      />
      {loading && (
        <div className={styles.loader}>
          <ComponentLoader />
        </div>
      )}
      <button
        className={styles.button}
        onClick={() => handleNavigation(page + 1)}
        disabled={
          isNavigating ||
          !data ||
          data.POST_PER_PAGE * (page - 1) + data.POST_PER_PAGE >= data.count
        }
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

// TODO: Make sure that when the request for new data is given only when the new data is acquired before the scrolling an d the spinner should happen and stop respectively. i think the issue is with the fact that there are 2 different pages.
