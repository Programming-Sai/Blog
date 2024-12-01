import React from "react";
import styles from "./singleblogpage.module.css";
import numeral from "numeral";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faEye } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import WriteComment from "@/components/writecomment/WriteComment";
import CommentSection from "@/components/commentsection/CommentSection";
import Pagination from "@/components/pagination/Pagination";
import Glow from "@/components/glow/Glow";
import Wrapper from "@/components/pagewrapper/Wrapper";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import DOMPurify from "dompurify";
import PopularPostsWrapper from "@/components/homewrappers/PopularPostsWrapper";

// Temporary slugs for development purposes
// const temporarySlugs = [
//   "understanding-react-hooks",
//   "css-grid-layout-guide",
//   "building-a-nextjs-blog",
//   "introduction-to-typescript",
//   "optimizing-performance-in-react",
// ];

// export async function generateStaticParams() {
//   return temporarySlugs.map((slug) => ({
//     slug, // This will match the [slug] parameter in the URL
//   }));
// }

const getData = async (slug) => {
  const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${slug}`);
  if (!result.ok) {
    throw new Error("Failed to get Post");
  }
  return result.json();
};

const SingleBlogPage = async ({ params }) => {
  const { slug } = params;
  const { post } = await getData(slug);
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
              <h1>{post.title}</h1>
              <div className={styles.postDetails}>
                <p className={styles.date}>
                  {new Date(post?.createdAt)
                    .toISOString()
                    .substring(0, 10)
                    .replace(/-/g, " • ")}
                </p>
                -
                <p className={styles.time}>
                  <FontAwesomeIcon icon={faClock} />
                  <p>{post.readingTime}min(s) read</p>
                </p>
                -
                <p className={styles.time}>
                  <FontAwesomeIcon icon={faEye} />
                  <p> {numeral(post.views).format("0.[0]a")}</p>
                </p>
                -<p className={styles.tag}>{post.catSlug.toUpperCase()}</p>
              </div>
            </div>
            <div
              className={styles.item}
              // style={{ "--img": `url("${BASE_PATH}/fashion.png")` }}
              style={{ "--img": `url(${post?.image})` }}
            >
              <Image
                fill
                alt="f"
                // src={`${BASE_PATH}/fashion.png`}
                src={post?.image}
                className={styles.img}
              />
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.post}>
              <div
                className={styles.blogPost}
                dangerouslySetInnerHTML={{
                  // __html: DOMPurify.sanitize(post?.desc),
                  __html: post?.desc,
                }}
              />
              <Glow
                top="20%"
                left="50%"
                width={500}
                height={500}
                color="#00A3FF"
                mtop="90%"
                mleft="-10%"
              />
              {/* </div> */}
              <WriteComment />
              <CommentSection />
              <Pagination />
            </div>
            <PopularPostsWrapper
              className={styles.popularPosts}
              borderRad="20px"
              marginBlock="5%"
              isOutline="2px"
            />
          </div>
        </div>
      </Wrapper>
      <Footer />
    </>
  );
};

export default SingleBlogPage;
