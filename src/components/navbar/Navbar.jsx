import React from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import AuthLinks from "../authlinks/AuthLinks";
import ThemeToggle from "../themetoggle/ThemeToggle";
import Searchbar from "../searchbar/Searchbar";
import SidePanel from "../sidepanel/SidePanel";
import NavText from "../navtext/NavText";
import Image from "next/image";





const Navbar = ({ past, disabled }) => {
  if (disabled) return null;

  return (
    <header id="categoryTop" className={styles.container}>
      <div className={styles.back} />
      <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}`}>
        <div className={styles.logo} style={{marginTop:'15px'}}>
          {/* <Image 
            src={'/Ghtrendz.png'}
            width={150}
            height={40}
            objectFit="contain"
          /> */}
        </div>
      </Link>
      <div className={styles.header}>
        <div className={styles.e}>
          <Searchbar />
        </div>

        <nav className={styles.nav}>
          <ul>
            <li>
              <Link href="/">
                <NavText>Home</NavText>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <NavText>About</NavText>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <NavText>Contact</NavText>
              </Link>
            </li>
            <AuthLinks past={past} />
          </ul>
        </nav>

        <div className={styles.e}>
          <ThemeToggle />
        </div>

        <div className={styles.e}>
          <SidePanel />
        </div>
        <div className={styles.end}>
          <Searchbar />
          <ThemeToggle />
          <SidePanel />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
