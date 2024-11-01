import React from "react";
import styles from "./login.module.css";
import Image from "next/image";
import Link from "next/link";
import BASE_PATH from "../../../base";

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.back}>.</div>
      <div className={styles.overlay}>
        <div className={styles.loginContainer}>
          <h1>Sign In With</h1>
          <div className={styles.links}>
            <Link href="/login">
              <Image
                className={styles.img}
                src={`${BASE_PATH}/facebook.png`}
                width={90}
                height={90}
                alt="Facebook"
              />
            </Link>
            <Link href="/login">
              <Image
                className={styles.img}
                src={`${BASE_PATH}/X.png`}
                width={90}
                height={90}
                alt="X"
              />
            </Link>
            <Link href="/login">
              <Image
                className={styles.img}
                src={`${BASE_PATH}/Google.png`}
                width={90}
                height={90}
                alt="Google"
              />
            </Link>
            <Link href="/login">
              <Image
                className={styles.img}
                src={`${BASE_PATH}/Github.png`}
                width={90}
                height={90}
                alt="Github"
              />
            </Link>
            <Link href="/login">
              <Image
                className={styles.img}
                src={`${BASE_PATH}/LinkedIn.png`}
                width={90}
                height={90}
                alt="LinkedIn"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
