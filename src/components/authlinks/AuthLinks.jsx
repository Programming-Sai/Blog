"use client";
import React from "react";
import styles from "./authlinks.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignIn,
  faSignOut,
  faUserLock,
} from "@fortawesome/free-solid-svg-icons";
import { signOut, useSession } from "next-auth/react";

const AuthLinks = ({ currentRoute }) => {
  const { data, status } = useSession();

  let isAdmin = true;
  // let isAdmin = status === "authenticated" && data?.user?.role === "admin";

  return (
    <>
      <li className={styles.authlink}>
        <Link
          className={styles.anchor}
          href="/login"
          onClick={(e) => {
            if (status === "authenticated") {
              e.preventDefault();
              signOut();
            }
          }}
        >
          <FontAwesomeIcon
            className={styles.icon}
            icon={status == "authenticated" ? faSignOut : faSignIn}
          />
          <span>{status == "authenticated" ? "Logout" : "Login"}</span>
        </Link>
      </li>
      {isAdmin && (
        <li className={`${styles.authlink} ${styles.last}`}>
          <Link className={styles.anchor} href="/admin">
            <FontAwesomeIcon className={styles.icon} icon={faUserLock} />
            <span>Admin</span>
          </Link>
        </li>
      )}
    </>
  );
};

export default AuthLinks;
