import React from "react";
import styles from "./commentsection.module.css";
import Image from "next/image";
import Glow from "../glow/Glow";
import ComponentLoader from "../componentloader/ComponentLoader";

const CommentSection = ({ width, isLoading, error, comments }) => {
  if (isLoading) return <ComponentLoader />;
  if (error) return <div>Error loading comments: {error.message}</div>;
  if (!comments || comments.length === 0)
    return <div>No comments available.</div>;

  return (
    <div className={styles.container} style={{ width: width }}>
      <div className={styles.postsContainer}>
        {comments && comments.length > 0 ? (
          comments.map((comment, index) => (
            <div
              className={`${styles.item} ${
                index === comments.length - 1 ? styles.lastItem : ""
              }`}
              key={comment.id}
            >
              <div className={styles.imgContainer}>
                {comment?.user?.image && (
                  <Image
                    src={comment?.user?.image}
                    fill
                    className={styles.img}
                    alt={comment?.user?.name || "User Image"}
                    objectFit="cover"
                  />
                )}
              </div>
              <div className={styles.post}>
                <h4>"{comment.desc}"</h4>
                <div className={styles.timeDate}>
                  <p className={styles.username}>
                    {comment?.user?.name || "Anonymous"}
                  </p>
                  <p>
                    {new Date(comment.createdAt)
                      .toISOString()
                      .substring(0, 10)
                      .replace(/-/g, " • ")}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No comments available.</div>
        )}

        <Glow
          top="50%"
          left="50%"
          width={500}
          height={500}
          color="#F0E711"
          mtop="-20%"
          mleft="20%"
        />
      </div>
    </div>
  );
};

export default CommentSection;
