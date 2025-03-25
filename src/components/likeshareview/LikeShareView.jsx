"use client"
import { faHeart, faShareNodes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './likeshareview.module.css'
import React, { useEffect, useRef, useState } from 'react'
import { faFacebook, faWhatsapp, faLinkedin, faXTwitter, faReddit, faTelegram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import { updateLikes, updateShares, updateViews } from "@/utils/clientUpdateFuncs"; // Adjust path accordingly


const socialMediaLinks = [
  {
    name: "Facebook",
    icon: faFacebook,
    url: "https://www.facebook.com/sharer/sharer.php?u=",
  },
  {
    name: "WhatsApp",
    icon: faWhatsapp,
    url: "https://wa.me/?text=",
  },
  {
    name: "LinkedIn",
    icon: faLinkedin,
    url: "https://www.linkedin.com/sharing/share-offsite/?url=",
  },
  {
    name: "X (Twitter)",
    icon: faXTwitter,
    url: "https://twitter.com/intent/tweet?url=",
  },
  {
    name: "Reddit",
    icon: faReddit,
    url: "https://www.reddit.com/submit?url=",
  },
  {
    name: "Telegram",
    icon: faTelegram,
    url: "https://t.me/share/url?url=",
  },
  {
    name: "Email",
    icon: faEnvelope,
    url: "mailto:?subject=Check%20this%20out&body=",
  },
];


export const LikeShareView = ({ className, slug }) => {
  const [isMobile, setIsMobile] = useState(false);
  const hasUpdatedViews = useRef(false);




  useEffect(() => {
    if (navigator.share) {
      setIsMobile(true);
    }
  }, []);

  
  useEffect(() => {
    if (slug && !hasUpdatedViews.current) {
      console.log("updateViews useEffect fired for slug:", slug);
      updateViews(slug).catch((error) => {
        console.error("Error updating views:", error);
      });
      hasUpdatedViews.current = true;
    }
  }, [slug]);



  const handleShare = async () => {
    try {
      await navigator.share({
        title: document.title, 
        text: "Check out this blog post!",
        url: window.location.href,
      });
      await updateShares(slug);
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };



  const handleLike = async () => {
    try {
      // Increment likes on click (server-side will enforce one-like-per-day via cookies)
      await updateLikes(slug);
      alert("Post liked!");
    } catch (error) {
      alert(error.message);
    }
  };



  return (
    <div className={`${styles.container} ${className || ""}`}>
      <button title="Like" onClick={handleLike}>
        <FontAwesomeIcon icon={faHeart} className={styles.icon} />
      </button>
      <p className={styles.pipe}>{!isMobile && '|'}</p>
     {isMobile ? (
        <button onClick={handleShare} className={styles.shareButton} title="Share">
          <FontAwesomeIcon icon={faShareNodes} className={styles.icon} />
        </button>
      ) : (
        socialMediaLinks.map((media, idx) => (
          <Link
            title={media.name}
            className={styles.link}
            key={idx}
            href={`${media.url}${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={async () => {
              // Increment shares when a desktop share link is clicked.
              try {
                await updateShares(slug);
              } catch (error) {
                console.error("Error updating share count:", error);
              }
            }}
          >
            <FontAwesomeIcon className={styles.icon} icon={media.icon} />
          </Link>
        ))
      )}
    </div>
  )
}
