import React from "react";
import styles from "./popularposts.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import Glow from "../glow/Glow";
import BASE_PATH from "../../../base"; // Ensure BASE_PATH is imported

const PopularPosts = ({
  glow,
  width,
  className,
  borderRad,
  marginBlock,
  isOutline,
}) => {
  // Sample post data with realistic names, titles, and dates
  const posts = [
    {
      id: 1,
      title: "The Rise of Sustainable Fashion",
      img: "/sustainable-fashion.jpg",
      date: "15 Oct 2024",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "Exploring the Best Travel Destinations for 2024",
      img: "/travel-destinations.jpg",
      date: "22 Oct 2024",
      readTime: "4 min read",
    },
    {
      id: 3,
      title: "Top 10 Health Benefits of Yoga",
      img: "/yoga-benefits.jpg",
      date: "28 Oct 2024",
      readTime: "3 min read",
    },
    {
      id: 4,
      title: "How to Build a Successful Morning Routine",
      img: "/morning-routine.jpg",
      date: "30 Oct 2024",
      readTime: "6 min read",
    },
    {
      id: 5,
      title: "The Future of Technology: Trends to Watch",
      img: "/technology-trends.jpg",
      date: "01 Nov 2024",
      readTime: "7 min read",
    },
  ];

  return (
    <div
      className={`${styles.container} ${className}`}
      style={{
        width: width,
        "--borderRad": borderRad,
        "--marginBlock": marginBlock,
        "--outline": isOutline,
      }}
    >
      <h2>Popular Posts</h2>
      <div className={styles.postsContainer}>
        {posts.map(({ id, title, img, date, readTime }) => (
          <div key={id} className={styles.item}>
            <div className={styles.imgContainer}>
              <Image
                src={`${BASE_PATH}${img}`}
                fill
                className={styles.img}
                alt={title}
                objectFit="cover"
              />
            </div>
            <div className={styles.post}>
              <h4>{title}</h4>
              <div className={styles.timeDate}>
                <div className={styles.readingTime}>
                  <FontAwesomeIcon icon={faClock} />
                  <p>{readTime}</p>
                </div>
                <p>{date}</p>
              </div>
            </div>
          </div>
        ))}
        {glow && (
          <Glow
            top="100%"
            left="50%"
            width={500}
            height={500}
            color="#09D5B0"
            mtop="90%"
            mleft="50%"
          />
        )}
      </div>
    </div>
  );
};

export default PopularPosts;
