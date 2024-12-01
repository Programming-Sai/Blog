"use client";
import React, { useState, useEffect } from "react";
import PopularTags from "../populartags/PopularTags";
import ComponentLoader from "../componentloader/ComponentLoader";

// Client-side wrapper component
const PopularTagWrapper = () => {
  const [popularTag, setPopularTag] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`
        );
        if (!result.ok) {
          throw new Error("Failed to fetch Categories");
        }
        const data = await result.json();
        setPopularTag(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <ComponentLoader />;
  if (error)
    return (
      <div style={{ color: "red", fontWeight: "bold" }}>Error: {error}</div>
    );

  return <PopularTags tags={popularTag} />;
};

export default PopularTagWrapper;
