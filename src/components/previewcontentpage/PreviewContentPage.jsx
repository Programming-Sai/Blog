"use client"; // Indicate that this is a client component
import React, { useEffect } from "react";
import styles from "./previewcontentpage.module.css";
import PopularPosts from "@/components/popularposts/PopularPosts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import WriteComment from "@/components/writecomment/WriteComment";
import CommentSection from "@/components/commentsection/CommentSection";
import Pagination from "@/components/pagination/Pagination";
import Glow from "@/components/glow/Glow";
import Wrapper from "@/components/pagewrapper/Wrapper";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import BASE_PATH from "../../../base";

const PreviewContentPage = ({ blogData }) => {
  useEffect(() => {
    if (typeof document !== "undefined") {
      const disableLinksOutsideBlogPost = () => {
        document.querySelectorAll("a").forEach((link) => {
          if (!link.closest(`.${styles.blogPost}`)) {
            link.addEventListener("click", (e) => e.preventDefault());
          }
        });
      };
      // Run once on initial load
      disableLinksOutsideBlogPost();

      // Observe DOM for any new links added after page load
      const observer = new MutationObserver(disableLinksOutsideBlogPost);
      observer.observe(document.body, { childList: true, subtree: true });

      // Cleanup on component unmount
      return () => observer.disconnect();
    }
  }, []);

  return (
    <>
      <Navbar />
      <Wrapper>
        <div className={styles.container}>
          <div className={styles.infoContainer}>
            <div className={styles.item}>
              <Glow
                top="50%"
                left="-20%"
                width={500}
                height={500}
                color="#11F027"
                mtop="300%"
                mleft="-10%"
              />
              <h1>{blogData.title}</h1>
              <div className={styles.postDetails}>
                <p className={styles.date}>{blogData.date}</p>-
                <div className={styles.time}>
                  <FontAwesomeIcon icon={faClock} />
                  <span>{blogData.readingTime}</span>
                </div>
                -
                <p className={styles.tag}>
                  {blogData.category === "Select A Category"
                    ? ""
                    : blogData.category}
                </p>
              </div>
            </div>
            <div
              className={styles.item}
              style={{ "--img": `url(${BASE_PATH}${blogData.image})` }} // Adding BASE_PATH here
            >
              <Image
                fill
                src={`${BASE_PATH}${blogData.image}`} // Adding BASE_PATH here
                alt={blogData.title}
                className={styles.img}
              />
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.post}>
              <div
                className={styles.blogPost}
                dangerouslySetInnerHTML={{ __html: blogData.blogContent }}
              />
              <WriteComment />
              <CommentSection />
              <Pagination />
            </div>
            <PopularPosts
              className={styles.popularPosts}
              borderRad="20px"
              marginBlock="5%"
              isOutline="2px"
            />
          </div>
          <div className={styles.previewIndicator}>This Is A Preview</div>
        </div>
      </Wrapper>
      <Footer />
    </>
  );
};

export default PreviewContentPage;
