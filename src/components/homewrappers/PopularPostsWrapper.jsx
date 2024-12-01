"use client";
import React, { useState, useEffect } from "react";
import ComponentLoader from "../componentloader/ComponentLoader";
import PopularPosts from "../popularposts/PopularPosts";

const PopularPostsWrapper = ({
  glow,
  width,
  className,
  borderRad,
  marginBlock,
  isOutline,
}) => {
  const [topPosts, setTopPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/topPosts`
        );
        if (!result.ok) {
          throw new Error("Failed to fetch top posts");
        }
        const data = await result.json();
        setTopPosts(data);
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

  return (
    <PopularPosts
      topPosts={topPosts}
      glow={glow}
      width={width}
      className={className}
      borderRad={borderRad}
      marginBlock={marginBlock}
      isOutline={isOutline}
    />
  );
};

export default PopularPostsWrapper;
