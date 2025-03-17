"use client";
import React, { useState } from "react";
import styles from "./writecomment.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const WriteComment = ({ postSlug, mutate }) => {
  const { data, status } = useSession();
  const [desc, setDesc] = useState("");
  const router = usePathname();

  const handleSubmit = async () => {
    if (!desc){return};
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/comments?postSlug=${postSlug}`,
        {
          method: "POST",
          body: JSON.stringify({ desc, postSlug }),
          headers: { "Content-Type": "application/json" },
        }
      );

      // Check if the response is OK (status 2xx)
      if (!response.ok) {
        const errorData = await response.text(); // Use text() to read raw body for errors
        throw new Error(errorData || "Failed to add comment");
      }

      // Parse the response JSON (it may not be empty now)
      const responseData = await response.json();

      // Log or handle success (you may want to do something with the response here)
      console.log("Comment added:", responseData);

      // Trigger mutate to refresh the comments list
      mutate();
      setDesc("");
    } catch (error) {
      console.error("Error submitting comment:", error.message);
    } finally {
    }
  };

  return (
    <div className={styles.container}>
      <h2>Comments</h2>

      {status === "authenticated" ? (
        <div className={styles.comment}>
          <input
            placeholder="Write Your thoughts here..."
            className={styles.input}
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSubmit();
              }
            }}
          />
          <button className={styles.send} onClick={handleSubmit}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      ) : (
        <Link
          href={`/login?redirect=${encodeURIComponent(router)}`}
          className={styles.aTag}
        >
          Please Login to Write A Comment
        </Link>
      )}
    </div>
  );
};

export default WriteComment;
