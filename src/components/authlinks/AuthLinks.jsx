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
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

const AuthLinks = ({ past }) => {
  const { data, status } = useSession();
  const router = usePathname();

  console.log(status, data, data?.user?.role);

  // let isAdmin = true;
  let isAdmin = status === "authenticated" && data?.user?.role === "ADMIN";

  return (
    <>
      <li className={styles.authlink}>
        <Link
          className={styles.anchor}
          href={`/login?redirect=${encodeURIComponent(past ? past : router)}`}
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
