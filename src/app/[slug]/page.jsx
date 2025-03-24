import React from "react";
import styles from "./singleblogpage.module.css";
import numeral from "numeral";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faEye } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Glow from "@/components/glow/Glow";
import Wrapper from "@/components/pagewrapper/Wrapper";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import DOMPurify from "isomorphic-dompurify";
import PopularPostsWrapper from "@/components/homewrappers/PopularPostsWrapper";
import CommentWrapper from "@/components/CommentWrapper";
import GeneralNotFound from "../general-not-found";
import { LikeShareView } from "@/components/aboutherosection/LikeShareView";



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
  await updateViews(slug);
  return data;
};


const updateViews = async (slug) => {
  const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/updateViews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ slug }),
    cache: "no-store", // Prevent caching
  });

  if (!result.ok) {
    throw new Error(`Failed to update views: ${result.statusText}`);
  }

  return result.json();
};




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
              <LikeShareView />
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
          <div className={styles.content}>
            <div className={styles.post}>
              {/* {console.log("BLOG: ", post?.content)} */}
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
