"use client";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import PageLoader from "@/components/pageloader/PageLoader";
import styles from "./login.module.css";
import Image from "next/image";
import Link from "next/link";
import BASE_PATH from "../../../base";

const Login = () => {
  const { data, status } = useSession(); // Get session status
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/"; // Get redirect path from query params

  // While the session is loading, show a loading spinner
  if (status === "loading") {
    return (
      <PageLoader
        isBorderRadius={false}
        widthOfSlice={60}
        slices={10}
        img={`${BASE_PATH}/p1.jpeg`}
      />
    );
  }

  if (status === "authenticated") {
    router.push(redirectPath); // Redirect the user to the requested path
  }

  const handleLoginClick = (provider) => {
    signIn(provider); // Trigger sign-in with the chosen provider
  };

  return (
    <div className={styles.container}>
      <div className={styles.back}>.</div>
      <div className={styles.overlay}>
        <div className={styles.loginContainer}>
          <h1>Sign In With</h1>
          <div className={styles.links}>
            <Link href="#" onClick={() => handleLoginClick("facebook")}>
              <Image
                className={styles.img}
                src={`${BASE_PATH}/facebook.png`}
                width={90}
                height={90}
                alt="Facebook"
              />
            </Link>
            <Link href="#" onClick={() => handleLoginClick("twitter")}>
              <Image
                className={styles.img}
                src={`${BASE_PATH}/X.png`}
                width={90}
                height={90}
                alt="Twitter"
              />
            </Link>
            <Link href="#" onClick={() => handleLoginClick("google")}>
              <Image
                className={styles.img}
                src={`${BASE_PATH}/Google.png`}
                width={90}
                height={90}
                alt="Google"
              />
            </Link>
            <Link href="#" onClick={() => handleLoginClick("github")}>
              <Image
                className={styles.img}
                src={`${BASE_PATH}/Github.png`}
                width={90}
                height={90}
                alt="Github"
              />
            </Link>
            <Link href="#" onClick={() => handleLoginClick("linkedin")}>
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
