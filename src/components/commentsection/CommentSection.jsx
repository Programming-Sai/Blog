import React from "react";
import styles from "./commentsection.module.css";
import Image from "next/image";
import Glow from "../glow/Glow";
import BASE_PATH from "../../../base";

const comments = Array.from({ length: 5 }, () => ({
  username: "Jane Smith",
  date: "25 Nov 2025",
  text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias nam eaque aliquam quod recusandae ut culpa dicta pariatur incidunt id tempora, officia laudantium vel, ea omnis modi est! Nam, corrupti?",
  imageSrc: `${BASE_PATH}/fashion.png`,
}));

const CommentSection = ({ width }) => {
  return (
    <div className={styles.container} style={{ width: width }}>
      <div className={styles.postsContainer}>
        {comments.map((comment, index) => (
          <div className={styles.item} key={index}>
            <div className={styles.imgContainer}>
              <Image
                src={comment.imageSrc}
                fill
                className={styles.img}
                alt={comment.username}
                objectFit="cover"
              />
            </div>
            <div className={styles.post}>
              <h4>{comment.text}</h4>
              <div className={styles.timeDate}>
                <p className={styles.username}>{comment.username}</p>
                <p>{comment.date}</p>
              </div>
            </div>
          </div>
        ))}

        <Glow
          top="-30%"
          left="-10%"
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
