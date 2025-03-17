"use client";
import React, { useEffect } from "react";
import WriteComment from "./writecomment/WriteComment";
import CommentSection from "./commentsection/CommentSection";
import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
};

const CommentWrapper = ({ postSlug }) => {
  const {
    data: comments = [],
    error,
    isLoading,
    mutate,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/comments?postSlug=${postSlug}`,
    fetcher
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.substring(1);
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  }, [comments]); // Runs when comments are fetched

  return (
    <>
      <WriteComment postSlug={postSlug} mutate={mutate} />
      <CommentSection
        postSlug={postSlug}
        comments={comments}
        isLoading={isLoading}
        error={error}
      />
    </>
  );
};

export default CommentWrapper;
