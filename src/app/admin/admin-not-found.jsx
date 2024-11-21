"use client";
import React, { useContext } from "react";
import TopBar from "@/components/topbar/TopBar";
import SideNavbar from "@/components/sidenavbar/SideNavbar";
import "./globals.css";
import styles from "./admin-not-found.module.css";
import { ThemeContext } from "@/context/ThemeContext";
import Glow from "@/components/glow/Glow";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AdminNotFound = () => {
  const { theme, toggleSidePane } = useContext(ThemeContext);
  const { data } = useSession();
  const router = useRouter();

  if (data?.user?.role !== "ADMIN") {
    router.push(`/not-authorized`);
  }

  return (
    <div className="admin-container">
      <main className="admin-wrapper">
        <SideNavbar />
        <TopBar />
        <div
          className={`${styles.container} ${
            toggleSidePane ? styles.active : ""
          }`}
          style={
            toggleSidePane
              ? { "--left": "80px", zIndex: 10 }
              : { "--left": "250px", zIndex: 10 }
          }
        >
          <div className={styles.notFoundContainer}>
            <Glow
              top="-40%"
              left="10%"
              width={500}
              height={500}
              color={theme === "dark" ? "red" : "gold"}
              mtop="-5%"
              mleft="0%"
            />
            <h1>Error... 404 Page Not Found</h1>
            <h3>Sorry, the page you are looking for may not exist</h3>
            <h6>Plaese use the side bar to navigate to an existing page.</h6>
            <Glow
              top="30%"
              left="50%"
              width={500}
              height={500}
              color={theme === "dark" ? "purple" : "green"}
              mtop="-5%"
              mleft="0%"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminNotFound;
