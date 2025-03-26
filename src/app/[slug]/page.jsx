import React from "react";
import styles from "./singleblogpage.module.css";
import numeral from "numeral";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faEye, faHeart, faShare } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Glow from "@/components/glow/Glow";
import Wrapper from "@/components/pagewrapper/Wrapper";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import DOMPurify from "isomorphic-dompurify";
import PopularPostsWrapper from "@/components/homewrappers/PopularPostsWrapper";
import CommentWrapper from "@/components/CommentWrapper";
import GeneralNotFound from "../general-not-found";
import { LikeShareView } from "@/components/likeshareview/LikeShareView";



const getPageData = async () => {
  const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/posts?page=1`, {next: { revalidate: 2 * 3600 },});
  if (!result.ok) {
    throw new Error("Failed to get Posts");
  }
  const data = result.json();
  if (!data) {
    console.log("NO DATA FOUND!!!!!");
    return { notFound: true };
  }
  return data;
};




const getData = async (slug) => {
  const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/${slug}`, {next: { revalidate: 2 * 3600 },});
  if (!result.ok) {
    throw new Error("Failed to get Post");
  }
  const data = result.json();
  if (!data) {
    console.log("NO DATA FOUND!!!!!");
    return { notFound: true };
  }
  return data;
};


export const generateStaticParams = async () => {
  const { paginatedPosts } = await getPageData();
  return paginatedPosts; 
};


export const generateMetadata = async ({ params }) => {
  const { slug } = params;
  const { post } = await getData(slug);
  if (!post) {
    console.log(post);
    return {};
  }
  return {
    title : post?.title,
    description: post?.desc,

  }
}



const SingleBlogPage = async ({ params }) => {
  const { slug } = params;
  const { post } = await getData(slug);
  if (!post) {
    console.log(post);
    return <GeneralNotFound />;
  }

  
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
                  {new Date(post?.lastModified)
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
                -
                <p className={styles.time}>
                  <FontAwesomeIcon icon={faShare} />
                  <p> {numeral(post?.shares).format("0.[0]a")}</p>
                </p>
                -
                <p className={styles.time}>
                  <FontAwesomeIcon icon={faHeart} />
                  <p> {numeral(post?.likes).format("0.[0]a")}</p>
                </p>
                -<p className={styles.tag}>{post.catSlug.toUpperCase()}</p>
              </div>
              <LikeShareView className={styles.likeshareview} slug={post?.slug} />
            </div>
            <div
              className={styles.item}
              style={{ "--img": `url(${post?.image || '/coding.png'})` }}
            >
              <Image
                fill
                alt={post?.title}
                src={post?.image || '/coding.png'}
                className={styles.img}
              />
            </div> 
          </div>
          {/* <LikeShareView className={styles.likeshareview}/> */}
          <div className={styles.content}>
            <div className={styles.post}>
              <div
                className={`${styles.blogPost} ql-editor`}
                style={{ background: "transparent" }}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post?.content, {
                    FORBID_TAGS: ["script"],
                    ADD_TAGS: ["iframe", "style"],
                    ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "src", "width", "height", "title"],
                  }),
                }}
              />;
              
              <Glow
                top="20%"
                left="50%"
                width={500}
                height={500}
                color="#00A3FF"
                mtop="90%"
                mleft="-10%"
              />
              <CommentWrapper postSlug={slug} />
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
