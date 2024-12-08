"use client";
import React from "react";
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

  console.log("Fetched comments:", comments);
  console.log("Error:", error);

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
