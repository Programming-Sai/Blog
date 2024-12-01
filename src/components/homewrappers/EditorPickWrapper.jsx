"use client";
import React, { useState, useEffect } from "react";
import FeaturedSection from "../featuredsection/FeaturedSection";
import ComponentLoader from "../componentloader/ComponentLoader";
import EditorPick from "../editorpick/EditorPick";

// Client-side wrapper component
const EditorPickWrapper = ({ theme }) => {
  const [editorPick, setEditorPick] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/editorPick`
        );
        if (!result.ok) {
          throw new Error("Failed to fetch Editor's Pick");
        }
        const data = await result.json();
        setEditorPick(data);
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

  return <EditorPick editorPick={editorPick} />;
};

export default EditorPickWrapper;
