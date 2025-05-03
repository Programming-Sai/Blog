import React from "react";
import styles from "./footer.module.css";
import Link from "next/link";
import Image from "next/image";
import BASE_PATH from "../../../base"; // Ensure BASE_PATH is imported


const getCategories = async () => {
  try{
    const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/categories`);

    if (!result.ok){
      throw new Error(`${result.message || result.statusText || "Something went wrong."}`)
    }

    const data = await result.json();
    return data;
  }
  catch (e){
    console.log(e.message);
  }
}




const Footer = async({ disabled }) => {
  if (disabled) return null;
  const categories = await getCategories();
  
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
          <div className={styles.logo}>
            
          </div>

          <p className={styles.desc}>
          Ghtrendz is your go-to hub for the latest in sports, 
          news, lifestyle, music, and movies. Stay informed, entertained, 
          and inspired with fresh content daily.
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
          <Link href="/sitemap.xml" className={styles.link}>
            Sitemap
          </Link>
        </div>
      </div>

      
      <div className={styles.item}>
        <div className={styles.title}>Categories</div>
        <div className={styles.tags}>
          {
            categories && categories.map((cat, idx) => (
              <Link key={cat.id} href={`${process.env.NEXT_PUBLIC_BASE_URL}category/${cat.slug}#categoryTop`} className={styles.link}>
                {cat.title}
              </Link>
            ))
          }
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
