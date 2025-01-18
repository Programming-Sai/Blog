"use client";
import React, { useContext } from "react";
import styles from "./dashboard.module.css";
import { ThemeContext } from "@/context/ThemeContext";
import Card from "@/components/card/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEarth,
  faNewspaper,
  faStopwatch,
  faTv,
} from "@fortawesome/free-solid-svg-icons";
import PopularPosts from "@/components/popularposts/PopularPosts";
import {
  PostPerformanceChart,
  GrowthRateChart,
  ContentEngagementChart,
  TrafficSourcesChart,
  SEOMetrics,
} from "@/components/charts/Charts";
import AdminCommentsSection from "@/components/admincommentssection/AdminCommentsSection";
import AdminRecentPosts from "@/components/adminrecentpost/AdminRecentPosts";
import ServerStatus from "@/components/serverstatus/ServerStatus";
import PopularPostsWrapper from "@/components/homewrappers/PopularPostsWrapper";

const DashBoard = () => {
  const { toggleSidePane } = useContext(ThemeContext);

  return (
    <div
      className={`${styles.container} ${toggleSidePane ? styles.active : ""}`}
      style={
        toggleSidePane
          ? { "--left": "80px", zIndex: 10 }
          : { "--left": "240px", zIndex: 10 }
      }
    >
      <div className={styles.topContainer}>
        <Card className={styles.cardTop} justify={"space-between"}>
          <div className={styles.text}>
            <p className={styles.big}>Today's Visits</p>
            <h1>1,234,567</h1>
            <p className={styles.small}>24% higher yesterday</p>
          </div>

          <div className={styles.icon}>
            <FontAwesomeIcon icon={faEarth} className={styles.img} />
          </div>
        </Card>

        <Card className={styles.cardTop} justify={"space-between"}>
          <div className={styles.text}>
            <p className={styles.big}>% Unique Visits</p>
            <h1>54.45%</h1>
            <p className={styles.small}>23% average duration</p>
          </div>

          <div className={styles.icon}>
            <FontAwesomeIcon icon={faTv} className={styles.img} />
          </div>
        </Card>

        <Card className={styles.cardTop} justify={"space-between"}>
          <div className={styles.text}>
            <p className={styles.big}>Total Number of Posts</p>
            <h1>53</h1>
            <p className={styles.small}>5 pending</p>
          </div>

          <div className={styles.icon}>
            <FontAwesomeIcon icon={faNewspaper} className={styles.img} />
          </div>
        </Card>

        <Card className={styles.cardTop} justify={"space-between"}>
          <div className={styles.text}>
            <p className={styles.big}>Bounce Rate</p>
            <h1>19.78%</h1>
            <p className={styles.small}>65.45% on average time</p>
          </div>

          <div className={styles.icon}>
            <FontAwesomeIcon icon={faStopwatch} className={styles.img} />
          </div>
        </Card>
      </div>

      <div className={styles.secondRow}>
        <Card className={`${styles.card} ${styles.card1}`}>
          <PostPerformanceChart />
        </Card>

        <PopularPostsWrapper
          glow={false}
          imageWidth={10}
          className={`${styles.card} ${styles.card2}`}
          borderRad="5px"
          marginBlock="0"
          isOutline="0"
        />

        <Card className={`${styles.card} ${styles.card3}`}>
          <TrafficSourcesChart />
        </Card>

        <Card className={`${styles.card} ${styles.card4}`}>
          <ContentEngagementChart />
        </Card>

        <Card className={`${styles.card} ${styles.card5}`}>
          <AdminRecentPosts />
        </Card>

        <Card className={`${styles.card} ${styles.card6}`}>
          <GrowthRateChart />
        </Card>

        <Card className={`${styles.card} ${styles.card7}`}>
          <ServerStatus />
        </Card>

        <Card className={`${styles.card} ${styles.card8}`}>
          <SEOMetrics />
        </Card>

        <Card className={`${styles.card} ${styles.card9}`}>
          <AdminCommentsSection />
        </Card>
      </div>
    </div>
  );
};

export default DashBoard;

// TODO When the page reaches a tablet screen, in the css medai query change the --left progerty so it stays, 80px.
// TODO Add a subtitle to each blog (Optionally)
