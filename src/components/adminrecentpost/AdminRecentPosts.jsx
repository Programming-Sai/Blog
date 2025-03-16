"use client";
import React, { useState, useEffect } from "react";
import styles from "./adminrecentpost.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarChart,
  faComment,
  faEye,
  faGear,
  faHeart,
  faPencil,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import BASE_PATH from "../../../base";

const AdminRecentPosts = ({data}) => {
  const sliderData = data?.map(post => ({
    img: post.image, 
    title: `${post.title}`,
    views: `${post.views} Views`,
    shares: `${post.shares} Shares`,
    comments: `${post._count.comment} Comments`,
    likes:`${post.likes} Likes`,
  }));


  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = sliderData?.length;

  useEffect(() => {
    if (totalSlides > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
      }, 5000);
  
      return () => clearInterval(interval);
    }
  }, [totalSlides]);
  
  

  return (
    <div className={styles.container}>
      <div
        className={styles.sliderItems}
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {sliderData?.map((item, i) => (
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
                  <FontAwesomeIcon className={styles.icon} icon={faHeart} />
                  <p>{item.likes}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.dashes}>
        {sliderData?.map((_, i) => (
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
