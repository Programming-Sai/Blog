import React from "react";
import styles from "./footer.module.css";
import Link from "next/link";
import Image from "next/image";
import BASE_PATH from "../../../base"; // Ensure BASE_PATH is imported

const Footer = ({ disabled }) => {
  if (disabled) return null;

  const socialLinks = [
    { name: "Facebook", src: "/facebook.png", href: "/" },
    { name: "Instagram", src: "/instagram.png", href: "/" },
    { name: "Tiktok", src: "/tiktok.png", href: "/" },
    { name: "Youtube", src: "/youtube.png", href: "/" },
  ];

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
          <Link href="/category/news#categoryTop" className={styles.link}>
            News
          </Link>
          <Link href="/category/lifestyle#categoryTop" className={styles.link}>
            Lifestyle
          </Link>
          <Link href="/category/sports#categoryTop" className={styles.link}>
            Sports
          </Link>
          <Link href="/category/music#categoryTop" className={styles.link}>
            Music
          </Link>
          <Link href="/category/movies#categoryTop" className={styles.link}>
            Movies
          </Link>
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.title}>Socials</div>
        {socialLinks?.map(({ name, src, href }) => (
          <Link key={name} href={href} className={styles.socialLink}>
            <Image
              width={14}
              height={14}
              alt={name}
              src={`${BASE_PATH}${src}`} // Use BASE_PATH for the image source
              className={styles.socialImage}
            />
            <p>{name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Footer;
