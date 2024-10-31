import React from "react";
import styles from "./authlinks.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShield,
  faSignIn,
  faSignOut,
  faUserLock,
} from "@fortawesome/free-solid-svg-icons";

const AuthLinks = ({ currentRoute }) => {
  // let isAdmin = false;
  let isAdmin = true;
  const status = "unauthenticated";
  return (
    <>
      <li className={styles.authlink}>
        <Link className={styles.anchor} href="/login">
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
