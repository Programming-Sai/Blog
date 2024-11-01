"use client";
import React, { useState, useEffect } from "react";
import styles from "./adminrecentpost.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarChart,
  faClock,
  faComment,
  faEye,
  faGear,
  faPencil,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import BASE_PATH from "../../../base";

const AdminRecentPosts = () => {
  const sliderData = [
    {
      img: "/style.png",
      title: "20 Best Travel Tips After 5 Years Of Traveling The World",
      views: "12K Views",
      shares: "234 Shares",
      comments: "44 Comments",
      released: "Released 3d ago",
    },
    {
      img: "/coding.png",
      title: "Top 10 Programming Tips for Beginners",
      views: "15K Views",
      shares: "300 Shares",
      comments: "60 Comments",
      released: "Released 2d ago",
    },
    {
      img: "/food.png",
      title: "Best Recipes for Home-Cooked Meals in 2024",
      views: "18K Views",
      shares: "500 Shares",
      comments: "120 Comments",
      released: "Released 5d ago",
    },
    {
      img: "/fashion.png",
      title: "Fashion Trends to Watch in 2024",
      views: "9K Views",
      shares: "150 Shares",
      comments: "30 Comments",
      released: "Released 1w ago",
    },
    {
      img: "/travel.png",
      title: "Hidden Travel Gems Around the World You Must Visit",
      views: "20K Views",
      shares: "450 Shares",
      comments: "80 Comments",
      released: "Released 1d ago",
    },
    {
      img: "/culture.png",
      title: "Understanding Global Cultures: A Guide for 2024",
      views: "22K Views",
      shares: "600 Shares",
      comments: "140 Comments",
      released: "Released 3h ago",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = sliderData.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
      if (currentSlide === totalSlides - 1) {
        sliderData.push(sliderData.shift());
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <div className={styles.container}>
      <div
        className={styles.sliderItems}
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {sliderData.map((item, i) => (
          <div
            className={styles.sliderItem}
            key={i}
            style={{ "--img": `url(${BASE_PATH}${item.img})` }}
          >
            <div className={styles.top}>
              <div className={styles.itemsContainer}>
                <div className={styles.button}>
                  <FontAwesomeIcon icon={faPencil} />
                </div>
                <div className={styles.button}>
                  <FontAwesomeIcon icon={faGear} />
                </div>
                <div className={styles.button}>
                  <FontAwesomeIcon icon={faBarChart} />
                </div>
              </div>
            </div>

            <div className={styles.textContainer}>
              <p>LATEST POSTS</p>
              <h4>{item.title}</h4>
              <div className={styles.stats}>
                <div className={styles.stat}>
                  <FontAwesomeIcon className={styles.icon} icon={faEye} />
                  <p>{item.views}</p>
                </div>
                <div className={styles.stat}>
                  <FontAwesomeIcon className={styles.icon} icon={faShare} />
                  <p>{item.shares}</p>
                </div>
                <div className={styles.stat}>
                  <FontAwesomeIcon className={styles.icon} icon={faComment} />
                  <p>{item.comments}</p>
                </div>
                <div className={styles.stat}>
                  <FontAwesomeIcon className={styles.icon} icon={faClock} />
                  <p>{item.released}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.dashes}>
        {sliderData.map((_, i) => (
          <div
            key={i}
            className={`${styles.dash} ${
              currentSlide === i ? styles.active : ""
            }`}
            onClick={() => setCurrentSlide(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminRecentPosts;
