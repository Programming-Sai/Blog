"use client";
import styles from "./recentpostwrapper.module.css";
import React, { useState, useEffect, useRef } from "react";
import RecentPosts from "../recentposts/RecentPosts";
import ComponentLoader from "../componentloader/ComponentLoader";
import { useSearchParams } from "next/navigation";

const RecentPostsWrapper = ({ cat, theme }) => {
  const [data, setData] = useState({
    paginatedPosts: [],
    POST_PER_PAGE: 3,
    count: 0,
    currentPage: 1,
    cat: cat || "",
    totalPages: 1,
  });
  const searchParams = useSearchParams(); // Read query parameters
  const postsRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUserClicking, setIsUserClicking] = useState(false); // Track user interaction

  const fetchPosts = async (page, category) => {
    try {
      const res = await fetch(`/api/posts?page=${page}&cat=${category}`);
      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }

      const { paginatedPosts, POST_PER_PAGE, count } = await res.json();
      const totalPages = Math.ceil(count / POST_PER_PAGE);

      setData({
        paginatedPosts,
        POST_PER_PAGE,
        count,
        currentPage: page,
        totalPages,
        cat: category,
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    const category = searchParams.get("cat") || cat || "";
    setLoading(true);
    fetchPosts(page, category);
  }, [searchParams, cat]);

  const handlePageChange = (newPage) => {
    setData((prevData) => ({
      ...prevData,
      currentPage: newPage,
    }));
    setIsUserClicking(true);
    fetchPosts(newPage, data.cat);

    if (postsRef.current) {
      postsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start", // Aligns the section at the top
      });
    }
  };

  useEffect(() => {
    if (postsRef.current && isUserClicking) {
      setTimeout(() => {
        postsRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300); // Delay the scroll slightly to ensure rendering is complete
      setIsUserClicking(false);
    }
  }, [data.paginatedPosts, isUserClicking]);

  useEffect(() => {
    if (postsRef.current && isUserClicking) {
      window.scrollBy(0, -100); // Adjust the offset value (100px) as per your layout
    }
  }, [data.paginatedPosts, isUserClicking]);

  if (error)
    return (
      <div style={{ color: "red", fontWeight: "bold" }}>Error: {error}</div>
    );

  return (
    <div className={styles.container}>
      <div ref={postsRef}>
        {loading ? (
          <ComponentLoader />
        ) : (
          <RecentPosts
            paginatedPosts={data.paginatedPosts}
            POST_PER_PAGE={data.POST_PER_PAGE}
            count={data.count}
            currentPage={data.currentPage}
            cat={data.cat}
            totalPages={data.totalPages}
            onPageChange={handlePageChange}
            theme={theme}
          />
        )}
      </div>
    </div>
  );
};

export default RecentPostsWrapper;
