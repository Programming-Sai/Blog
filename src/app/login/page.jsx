"use client";
import React from "react";
import styles from "./login.module.css";
import Image from "next/image";
import Link from "next/link";
import BASE_PATH from "../../../base";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import PageLoader from "@/components/pageloader/PageLoader";

const Login = () => {
  const { data, status } = useSession();
  const route = useRouter();
  if (status == "loading") {
    return (
      <PageLoader
        isBorderRadius={false}
        widthOfSlice={60}
        slices={10}
        img={`${BASE_PATH}/p1.jpeg`}
      />
    );
  }

  if (status == "authenticated") {
    route.push("/");
  }

  console.log(data, status);
  return (
    <div className={styles.container}>
      <div className={styles.back}>.</div>
      <div className={styles.overlay}>
        <div className={styles.loginContainer}>
          <h1>Sign In With</h1>
          <div className={styles.links}>
            <Link
              href="/login"
              onClick={() => {
                signIn("facebook");
              }}
            >
              <Image
                className={styles.img}
                src={`${BASE_PATH}/facebook.png`}
                width={90}
                height={90}
                alt="Facebook"
              />
            </Link>
            <Link
              href="/login"
              onClick={() => {
                signIn("twitter");
              }}
            >
              <Image
                className={styles.img}
                src={`${BASE_PATH}/X.png`}
                width={90}
                height={90}
                alt="X"
              />
            </Link>
            <Link
              href="/login"
              onClick={() => {
                signIn("google");
              }}
            >
              <Image
                className={styles.img}
                src={`${BASE_PATH}/Google.png`}
                width={90}
                height={90}
                alt="Google"
              />
            </Link>
            <Link
              href="/login"
              onClick={() => {
                signIn("github");
              }}
            >
              <Image
                className={styles.img}
                src={`${BASE_PATH}/Github.png`}
                width={90}
                height={90}
                alt="Github"
              />
            </Link>
            <Link
              href="/login"
              onClick={() => {
                signIn("linkedin");
              }}
            >
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
