"use client";
import React, { useContext, useState, useEffect } from "react";
import styles from "./dashboard.module.css";
import { ThemeContext } from "@/context/ThemeContext";
import Card from "@/components/card/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarth, faNewspaper, faStopwatch, faTv } from "@fortawesome/free-solid-svg-icons";
import { PostPerformanceChart, GrowthRateChart, ContentEngagementChart, TrafficSourcesChart, SEOMetrics } from "@/components/charts/Charts";
import AdminCommentsSection from "@/components/admincommentssection/AdminCommentsSection";
import AdminRecentPosts from "@/components/adminrecentpost/AdminRecentPosts";
import ServerStatus from "@/components/serverstatus/ServerStatus";
import PopularPostsWrapper from "@/components/homewrappers/PopularPostsWrapper";
import PopularPosts from "@/components/popularposts/PopularPosts";

const DashBoard = () => {
  const { toggleSidePane } = useContext(ThemeContext);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [analyticsRes, adminPostRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/analytics`).then((res) => res.json()),
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/adminPostData`).then((res) => res.json()),
        ]);
  
        // console.log("Raw Analytics Response:", analyticsRes);
        // console.log("Raw Admin Post Response:", adminPostRes);
  
        const resultAnalytics = analyticsRes?.result;
        const resultAdminPost = adminPostRes;
  
        const cleanedData = {
          todayVisits: resultAnalytics?.todayVisits?.rowCount,
          uniqueVisits: resultAnalytics?.uniqueVisits?.rowCount,
          bounceRate: resultAnalytics?.bounceRate?.rows,
          trafficSourcesGeneral: resultAnalytics?.trafficSourcesGeneral?.rows,
          trafficSourcesSocials: resultAnalytics?.trafficSourcesSocials?.rows,
          adminPostData: resultAdminPost, // Store admin post data directly
        };
  
    

        setData(cleanedData);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchData();
  }, []);

  
  const getBounceRate = (rows)=>{
    if (!Array.isArray(rows) || rows.length === 0) return 0;
    const totalRates = rows.reduce((sum, row) => sum + parseFloat(row.metricValues[0].value), 0);
    return Math.round(totalRates / rows.length* 100) / 100;
  };

  const capitalise = (str) =>{
    return str.charAt(0).toUpperCase() + str.slice(1)
  };

  const getTrafficGeneralData = (rows) => {
    if (!Array.isArray(rows) || rows.length === 0) return [];
    let res = rows?.map((row, idx)=>({
      name: row.dimensionValues[0].value === '(none)' ? 'Direct': row.dimensionValues[0].value === '(not set)' ? 'Unknown' : capitalise(row.dimensionValues[0].value) || "Other",
      value: parseInt(row.metricValues[0].value) || 0,
    }));
    res = [...res, {name:'Other', value: getTrafficSocialData(data?.trafficSourcesSocials)?.reduce((sum, row)=>sum + parseInt(row.value), 0)}]
    return res
  };



  const getTrafficSocialData = (rows) => {
    const COLORS = [
      "#4CAF50", // Green (Facebook)
      "#81C784", // Light Green (Twitter)
      "#A5D6A7", // Light Greenish (Instagram)
      "#4A8C2A", // Darker Green (LinkedIn)
      "#66BB6A", // Medium Green (YouTube)
      "#DCE775", // Light Yellowish Green (Snapchat)
      "#C6FF00", // Bright Green (TikTok)
    ];
    if (!Array.isArray(rows) || rows.length === 0) return [];
    let res = rows?.map((row, idx)=>({
      name: row.dimensionValues[0].value === '(none)' || row.dimensionValues[0].value === '(direct)' ? 'Direct': row.dimensionValues[0].value === '(not set)' ? 'Unknown' : (row.dimensionValues[0].value) || "Other",
      value: parseInt(row.metricValues[0].value) || 0,
      color:COLORS[Math.floor(Math.random() * COLORS.length)]
    }));
    return res
  };



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
            <h1>{data?.todayVisits || 0}</h1>
            {/* <h1>1,234,567</h1> */}
            <p className={styles.small}>
            {
                data?.todayVisits === 0
                ? "No visits yet today"
                : data?.todayVisits < 10
                ? "Slow start, let's get more visitors!"
                : data?.todayVisits < 100
                ? "Steady traffic today!"
                : "Great engagement so far!"
            }
            </p>
          </div>

          <div className={styles.icon}>
            <FontAwesomeIcon icon={faEarth} className={styles.img} />
          </div>
        </Card>

        <Card className={styles.cardTop} justify={"space-between"}>
          <div className={styles.text}>
            <p className={styles.big}>Unique Visits</p>
            <h1>{data?.uniqueVisits || 0}</h1>
            {/* <h1>54.45%</h1> */}
            <p className={styles.small}>
              {
                data?.uniqueVisits === 0
                ? "No visitors yet today"
                : data?.uniqueVisits < 10
                ? "Few visitors so far, let's boost traffic!"
                : data?.uniqueVisits < 100
                ? "Steady number of unique visitors!"
                : "High engagement today!"
              }
            </p>
          </div>

          <div className={styles.icon}>
            <FontAwesomeIcon icon={faTv} className={styles.img} />
          </div>
        </Card>

        <Card className={styles.cardTop} justify={"space-between"}>
          <div className={styles.text}>
            <p className={styles.big}>Total Number of Posts</p>
            <h1>{data?.adminPostData?.totalPosts || 0}</h1>
            {/* <h1>53</h1> */}
            <p className={styles.small}>
              {
                data?.adminPostData?.totalDrafts
                ? `${data.adminPostData.totalDrafts} drafts pending`
                : "All posts published"
              }
            </p>
          </div>

          <div className={styles.icon}>
            <FontAwesomeIcon icon={faNewspaper} className={styles.img} />
          </div>
        </Card>

        <Card className={styles.cardTop} justify={"space-between"}>
          <div className={styles.text}>
            <p className={styles.big}>Bounce Rate</p>
            <h1>{getBounceRate(data?.bounceRate)}%</h1> 
            {/* <h1>19.78%</h1>  */}
            <p className={styles.small}>
              {
                data?.bounceRate > 50
                ? "Consider improving user engagement"
                : "Healthy engagement rate"
              }
            </p>
          </div>

          <div className={styles.icon}>
            <FontAwesomeIcon icon={faStopwatch} className={styles.img} />
          </div>
        </Card>
      </div>

      <div className={styles.secondRow}>
        <Card className={`${styles.card} ${styles.card1}`}>
          <PostPerformanceChart data={data?.adminPostData?.categoryStats}/>
        </Card>

        {/* <PopularPostsWrapper
          glow={false}
          imageWidth={10}
          className={`${styles.card} ${styles.card2}`}
          borderRad="5px"
          marginBlock="0"
          isOutline="0"
        /> */}

        <PopularPosts
          glow={false}
          imageWidth={10}
          className={`${styles.card} ${styles.card2}`}
          borderRad="5px"
          marginBlock="0"
          isOutline="0"
        />

        <Card className={`${styles.card} ${styles.card3}`}>
          <TrafficSourcesChart trafficData={getTrafficGeneralData(data?.trafficSourcesGeneral)} socialMediaData={getTrafficSocialData(data?.trafficSourcesSocials, 'social')}/>
        </Card>

        {/* <Card className={`${styles.card} ${styles.card4}`}>
          <ContentEngagementChart />
        </Card> */}

        <Card className={`${styles.card} ${styles.card5}`}>
          <AdminRecentPosts data={data?.adminPostData?.latestPosts}/>
        </Card>

        {/* <Card className={`${styles.card} ${styles.card6}`}>
          <GrowthRateChart />
        </Card> */}
        
        {/* <Card className={`${styles.card} ${styles.card7}`}>
          <ServerStatus />
        </Card> */}

        <Card className={`${styles.card} ${styles.card8}`}>
          <SEOMetrics />
        </Card>

        <Card className={`${styles.card} ${styles.card9}`}>
          <AdminCommentsSection data={data?.adminPostData?.latestComments}/>
        </Card>
      </div>
    </div>
  );
};

export default DashBoard;


// Specific to Your Dashboard Widgets
// Top Metrics Cards:

// Today's Visits: date, userType, country.
// % Unique Visits: deviceCategory, source/medium.
// Total Number of Posts: postStatus (e.g., published, pending).
// Bounce Rate: pagePath, deviceCategory.
// Charts and Popular Posts:

// PostPerformanceChart: postId, engagementType (e.g., likes, shares, comments).
// TrafficSourcesChart: source/medium, region.
// ContentEngagementChart: pagePath, engagementType.
// GrowthRateChart: week, month.
// Additional Components:

// PopularPostsWrapper: postId, engagementType, postCategory.
// AdminRecentPosts: postId, postDate, author.
// ServerStatus: System health metrics (e.g., uptime, latency).
// SEOMetrics: pagePath, searchEngine, keyword.
// AdminCommentsSection: postId, commentDate, userType.
