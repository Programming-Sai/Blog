import React from "react";
import styles from "./footer.module.css";
import Link from "next/link";
import Image from "next/image";

const Footer = ({ disabled }) => {
  if (disabled) return null;

  return (
    <div className={styles.container} style={disabled && { display: "none" }}>
      <div className={styles.back} />

      <div className={styles.item}>
        <div className={styles.descContainer}>
          <div className={styles.logo}>Logo</div>

          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum tempora
            a aut cupiditate vitae provident totam, accusantium quod aspernatur
            temporibus? Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Cum tempora a aut cupiditate vitae provident totam, accusantium quod
            aspernatur temporibus?
          </p>
        </div>

        <div className={styles.title}>Links</div>
        <div className={styles.links}>
          <Link href="/" className={styles.link}>
            Home
          </Link>
          <Link href="/contact" className={styles.link}>
            Contact
          </Link>
          <Link href="/about" className={styles.link}>
            About
          </Link>
          <Link href="/privacy-policy" className={styles.link}>
            Privacy Policy
          </Link>
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.title}>Categories</div>
        <div className={styles.tags}>
          <Link href="/category/news" className={styles.link}>
            News
          </Link>
          <Link href="/category/lifestyle" className={styles.link}>
            Lifestyle
          </Link>
          <Link href="/category/sports" className={styles.link}>
            Sports
          </Link>
          <Link href="/category/music" className={styles.link}>
            Music
          </Link>
          <Link href="/category/movies" className={styles.link}>
            Movies
          </Link>
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.title}>Socials</div>
        <Link href="/" className={styles.socialLink}>
          <Image
            width={14}
            height={14}
            alt="Moon"
            src="/facebook.png"
            className={styles.socialImage}
          />
          <p>Facebook</p>
        </Link>
        <Link href="/" className={styles.socialLink}>
          <Image
            width={14}
            height={14}
            alt="Moon"
            src="/instagram.png"
            className={styles.socialImage}
          />
          <p>Instagram</p>
        </Link>
        <Link href="/" className={styles.socialLink}>
          <Image
            width={14}
            height={14}
            alt="Moon"
            src="/tiktok.png"
            className={styles.socialImage}
          />
          <p>Tiktok</p>
        </Link>
        <Link href="/" className={styles.socialLink}>
          <Image
            width={14}
            height={14}
            alt="Moon"
            src="/youtube.png"
            className={styles.socialImage}
          />
          <p>Youtube</p>
        </Link>
      </div>
    </div>
  );
};
{
  /* <div className={styles.title}></div> */
}
export default Footer;
