"use client";
import React, { useState, useEffect } from "react";
import FeaturedSection from "../featuredsection/FeaturedSection";
import ComponentLoader from "../componentloader/ComponentLoader";

// Client-side wrapper component
const FeaturedSectionWrapper = ({ theme }) => {
  const [featuredPost, setFeaturedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/featuredPost`
        );
        if (!result.ok) {
          throw new Error("Failed to fetch featured post");
        }
        const data = await result.json();
        setFeaturedPost(data);
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
  return <FeaturedSection featuredPost={featuredPost} theme={theme} />;
};

export default FeaturedSectionWrapper;
