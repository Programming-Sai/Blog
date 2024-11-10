"use client";
import styles from "./sidenavbar.module.css";
import React, { useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faClose,
  faEdit,
  faGear,
  faPencilAlt,
  faSignOutAlt,
  faTachometerAlt,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { ThemeContext } from "@/context/ThemeContext";
import BASE_PATH from "../../../base";
import { usePathname } from "next/navigation";

const SideNavbar = () => {
  const { toggleSidePane, setToggleSidePane } = useContext(ThemeContext);
  const router = usePathname();
  useEffect(() => {
    if (window.innerWidth <= 640) {
      setToggleSidePane(false);
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div
      className={`${styles.container} ${toggleSidePane ? styles.active : ""}`}
      style={
        toggleSidePane
          ? { "--left": "80px", "--mleft": "0" }
          : { "--left": "240px", "--mleft": "-100%" }
      }
    >
      <p
        className={`${styles.buton} ${styles.open}`}
        style={{ zIndex: 100 }}
        onClick={(event) => {
          event.stopPropagation();
          setToggleSidePane(!toggleSidePane);
        }}
      >
        <FontAwesomeIcon icon={faClose} />
      </p>
      <div className={styles.profileContainer}>
        <div
          className={styles.imgContainer}
          style={{ "--img": `url("${BASE_PATH}/p1.jpeg")` }} // Add BASE_PATH here
        >
          <Image
            className={styles.img}
            src={`${BASE_PATH}/fashion.png`}
            fill
            alt="Fashion"
          />
        </div>
        <h1>Name</h1>
      </div>

      <ul>
        <li>
          <Link
            onClick={() => {
              window.innerWidth <= 868
                ? setToggleSidePane(!toggleSidePane)
                : "";
            }}
            className={styles.a}
            href="/admin/dashboard"
            title="Dashboard"
          >
            <FontAwesomeIcon className={styles.icon} icon={faTachometerAlt} />
            <span>Dashboard</span>
          </Link>
        </li>

        <li>
          <Link
            onClick={() => {
              window.innerWidth <= 868
                ? setToggleSidePane(!toggleSidePane)
                : "";
            }}
            className={styles.a}
            href="/admin/published-blogs"
            title="Published Blogs"
          >
            <FontAwesomeIcon className={styles.icon} icon={faCheckCircle} />
            <span>Published Blogs</span>
          </Link>
        </li>

        <li>
          <Link
            onClick={() => {
              window.innerWidth <= 868
                ? setToggleSidePane(!toggleSidePane)
                : "";
            }}
            className={styles.a}
            href="/admin/drafts"
            title="Drafts"
          >
            <FontAwesomeIcon className={styles.icon} icon={faPencilAlt} />
            <span>Drafts</span>
          </Link>
        </li>

        <li>
          <Link
            onClick={() => {
              window.innerWidth <= 868
                ? setToggleSidePane(!toggleSidePane)
                : "";
            }}
            className={styles.a}
            href="/admin/editor"
            title="Editor"
          >
            <FontAwesomeIcon className={styles.icon} icon={faEdit} />
            <span>Editor</span>
          </Link>
        </li>

        <li>
          <Link
            onClick={() => {
              window.innerWidth <= 868
                ? setToggleSidePane(!toggleSidePane)
                : "";
            }}
            className={styles.a}
            href="/admin/settings"
            title="Settings"
          >
            <FontAwesomeIcon className={styles.icon} icon={faGear} />
            <span>Settings</span>
          </Link>
        </li>

        <li>
          {/* <Link className={styles.a} href='/admin/logout' title='Logout'> */}
          <Link
            onClick={() => {
              window.innerWidth <= 868
                ? setToggleSidePane(!toggleSidePane)
                : "";
            }}
            className={styles.a}
            href={`/login?redirect=${encodeURIComponent(router)}`}
            title="Logout"
          >
            <FontAwesomeIcon className={styles.icon} icon={faSignOutAlt} />
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideNavbar;
