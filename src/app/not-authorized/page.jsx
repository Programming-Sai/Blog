"use client";
import React from "react";
import styles from "../not-found.module.css";
import Wrapper from "@/components/pagewrapper/Wrapper";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import RecentPosts from "@/components/recentposts/RecentPosts";
import PopularPosts from "@/components/popularposts/PopularPosts";
import Glow from "@/components/glow/Glow";
import Link from "next/link";
import { signOut } from "next-auth/react";
import RecentPostsWrapper from "@/components/recentpostwrapper/RecentPostsWrapper";

const NotAuthorized = () => {
  return (
    <div>
      <div>
        <Navbar past="/admin/dashboard" />
        <Wrapper>
          <div className={styles.container} style={{ zIndex: 1 }}>
            <h1>Access Denied: 403 - Not Authorized</h1>
            <h3>
              You are not authorized to access the Admin page. This is because
              you're either not logged in or you don't have the necessary admin
              privileges.
            </h3>
            <p>
              Please log out of your current session and log back in as an admin
              to access the admin section. Alternatively, you can click the
              button below to quickly log in as an administrator.
            </p>
            <p>
              If you're not an admin, you can still access other sections of the
              website that don't require admin privileges.
            </p>
            <button
              className={styles.adminLogin}
              onClick={() =>
                signOut({
                  callbackUrl: `/login?redirect=${encodeURIComponent(
                    "/admin/dashboard"
                  )}`,
                })
              }
            >
              Log In as an Administrator
            </button>

            <Glow
              top="-10%"
              left="-15%"
              width={500}
              height={500}
              color="red"
              mtop="-5%"
              mleft="0%"
            />
            <div className={styles.flexWrapper}>
              {/* <RecentPosts className={styles.itemOne} /> */}
              <RecentPostsWrapper className={styles.itemOne} />
              <PopularPosts
                className={styles.itemTwo}
                glow={true}
                borderRad="20px"
                marginBlock="0%"
                isOutline="2px"
              />
            </div>
          </div>
        </Wrapper>
        <Footer />
      </div>
    </div>
  );
};

export default NotAuthorized;
