import React from "react";
import styles from "./recentposts.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import Glow from "../glow/Glow";
import BASE_PATH from "../../../base";

const postsData = [
  {
    id: 1,
    image: `${BASE_PATH}/fashion.png`,
    date: "01-11-2024",
    category: "Fashion",
    title: "Fall Fashion Trends: What to Wear This Season",
    description:
      "Explore the latest trends in fall fashion and how to style them for any occasion. From cozy sweaters to chic boots, discover your new favorite outfits!",
    readingTime: "4min read",
  },
  {
    id: 2,
    image: `${BASE_PATH}/food.png`,
    date: "28-10-2024",
    category: "Food",
    title: "10 Quick and Healthy Dinner Recipes",
    description:
      "Busy week? No problem! These quick and healthy dinner recipes will help you whip up delicious meals in no time.",
    readingTime: "5min read",
  },
  {
    id: 3,
    image: `${BASE_PATH}/coding.png`,
    date: "15-10-2024",
    category: "Technology",
    title: "The Future of Web Development: Trends to Watch",
    description:
      "Stay ahead of the curve with these emerging trends in web development that are shaping the future of the industry.",
    readingTime: "6min read",
  },
  {
    id: 4,
    image: `${BASE_PATH}/culture.png`,
    date: "10-10-2024",
    category: "Culture",
    title: "Exploring Cultural Heritage: Festivals Around the World",
    description:
      "Join us as we explore vibrant festivals from around the globe, celebrating diversity and cultural heritage.",
    readingTime: "5min read",
  },
  {
    id: 5,
    image: `${BASE_PATH}/travel.png`,
    date: "05-10-2024",
    category: "Travel",
    title: "Top 10 Destinations to Visit in 2025",
    description:
      "Plan your next getaway with our guide to the top travel destinations for 2025. From hidden gems to popular hotspots, find your perfect vacation spot.",
    readingTime: "7min read",
  },
];

const RecentPosts = ({ width }) => {
  return (
    <div className={styles.container} style={{ width: width }}>
      <h1>Recent Posts</h1>
      <div className={styles.recentPostsContainer}>
        <Glow
          top="30%"
          left="20%"
          width={600}
          height={600}
          color="#00A3FF"
          mtop="35%"
          mleft="0"
        />

        {postsData.map((post) => (
          <div className={styles.item} key={post.id}>
            <div className={styles.imgContainer}>
              <Image
                src={post.image}
                alt={post.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className={styles.post}>
              <p className={styles.timeTag}>
                <span className={styles.time}>{post.date}</span> -{" "}
                {post.category.toUpperCase()}
              </p>
              <h3>{post.title}</h3>
              <p className={styles.desc}>{post.description}</p>
              <div className={styles.dateRead}>
                <button className={styles.read}>Read More</button>
                <div className={`${styles.readingTime} ${styles.time}`}>
                  <FontAwesomeIcon icon={faClock} />
                  <p>{post.readingTime}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;
