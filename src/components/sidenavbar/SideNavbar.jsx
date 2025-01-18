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
import { signOut, useSession } from "next-auth/react";

const SideNavbar = () => {
  const { toggleSidePane, setToggleSidePane } = useContext(ThemeContext);
  const pathname = usePathname();
  const { data, status } = useSession();

  useEffect(() => {
    if (window.innerWidth <= 640) {
      setToggleSidePane(false);
    }
  }, []);

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
          style={{
            "--img": `url(${
              data?.user?.image || BASE_PATH + "/LinkedInAvatar.png"
            })`,
          }}
        >
          <Image
            className={styles.img}
            src={data?.user?.image || `${BASE_PATH}/LinkedInAvatar.png`}
            fill
            alt="Fashion"
          />
        </div>
        <h3>{data?.user?.name}</h3>
      </div>

      <ul>
        <li className={pathname == "/admin/dashboard" ? styles.sideActive : ""}>
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

        <li
          className={
            pathname == "/admin/published-blogs" ? styles.sideActive : ""
          }
        >
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

        <li className={pathname == "/admin/drafts" ? styles.sideActive : ""}>
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

        <li className={pathname == "/admin/editor" ? styles.sideActive : ""}>
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

        <li className={pathname == "/admin/settings" ? styles.sideActive : ""}>
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
          <button
            onClick={(e) => {
              window.innerWidth <= 868
                ? setToggleSidePane(!toggleSidePane)
                : "";
              if (status === "authenticated") {
                signOut({ callbackUrl: "/" });
              }
            }}
            className={styles.a}
            title="Logout"
          >
            <FontAwesomeIcon className={styles.icon} icon={faSignOutAlt} />
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SideNavbar;
