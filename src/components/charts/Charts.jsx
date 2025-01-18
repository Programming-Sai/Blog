"use client";
import React, { useContext } from "react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "./charts.module.css";
import { ThemeContext } from "@/context/ThemeContext";

const TrafficSourcesChart = () => {
  // Sample data for traffic sources including social media
  const trafficData = [
    { name: "Organic Search", value: 55 },
    { name: "Direct", value: 25 },
    { name: "Referral", value: 10 },
    { name: "Social Media", value: 5 }, // Aggregate for social media
    { name: "Email", value: 5 },
  ];

  // Sample data for social media breakdown
  const socialMediaData = [
    { name: "Facebook", value: 3, color: "#4CAF50" }, // Green
    { name: "Twitter", value: 1, color: "#81C784" }, // Light Green
    { name: "Instagram", value: 1, color: "#A5D6A7" }, // Light Greenish
    { name: "LinkedIn", value: 2, color: "#4A8C2A" }, // Darker Green
    { name: "YouTube", value: 2, color: "#66BB6A" }, // Medium Green
    { name: "Snapchat", value: 1, color: "#DCE775" }, // Light Yellowish Green
    { name: "TikTok", value: 1, color: "#C6FF00" }, // Bright Green
  ];

  const COLORS = [
    "#4CAF50", // Green (Facebook)
    "#81C784", // Light Green (Twitter)
    "#A5D6A7", // Light Greenish (Instagram)
    "#4A8C2A", // Darker Green (LinkedIn)
    "#66BB6A", // Medium Green (YouTube)
    "#DCE775", // Light Yellowish Green (Snapchat)
    "#C6FF00", // Bright Green (TikTok)
  ];

  // Custom Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0];
      let detail = `${name}: ${value}%`;

      // If the "Social Media" segment is hovered, show breakdown
      if (name === "Social Media") {
        return (
          <div
            className="custom-tooltip"
            style={{
              backgroundColor: "#fff",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            <p>{detail}</p>
            {socialMediaData.map((source, index) => (
              <p key={index} style={{ color: source.color }}>
                {source.name}: {source.value}%
              </p>
            ))}
          </div>
        );
      } else {
        return (
          <div
            className="custom-tooltip"
            style={{
              backgroundColor: "#fff",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            <p>{detail}</p>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300} className={styles.container}>
      <h4>Traffic Sources</h4>
      <h5>With a High Focus On Social Media Sources.</h5>
      <PieChart>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Pie
          data={trafficData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          labelLine={true}
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          {trafficData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

const PostPerformanceChart = () => {
  const { theme } = useContext(ThemeContext);

  const data = [
    {
      name: "Music",
      Views: 400,
      Shares: 240,
      Likes: 150,
      Comments: 45,
      "Engagement Rate": ((150 + 240 + 45) / 400) * 100, // 108.75%
      "Virality Rate": (240 / 400) * 100, // 60%
    },
    {
      name: "News",
      Views: 300,
      Shares: 221,
      Likes: 120,
      Comments: 30,
      "Engagement Rate": ((120 + 221 + 30) / 300) * 100, // 123.67%
      "Virality Rate": (221 / 300) * 100, // 73.67%
    },
    {
      name: "Movies",
      Views: 200,
      Shares: 229,
      Likes: 180,
      Comments: 55,
      "Engagement Rate": ((180 + 229 + 55) / 200) * 100, // 232%
      "Virality Rate": (229 / 200) * 100, // 114.5%
    },
    {
      name: "Sports",
      Views: 278,
      Shares: 200,
      Likes: 140,
      Comments: 40,
      "Engagement Rate": ((140 + 200 + 40) / 278) * 100, // 137.41%
      "Virality Rate": (200 / 278) * 100, // 71.94%
    },
    {
      name: "Lifestyle",
      Views: 189,
      Shares: 218,
      Likes: 160,
      Comments: 38,
      "Engagement Rate": ((160 + 218 + 38) / 189) * 100, // 218.52%
      "Virality Rate": (218 / 189) * 100, // 115.34%
    },
  ];

  return (
    <ResponsiveContainer width="90%" height={300} className={styles.container}>
      <h4>Blog Performance Chart</h4>
      <h5>Performance Metrics by Category</h5>
      <BarChart data={data}>
        <CartesianGrid />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />

        <Bar dataKey="Views" fill={theme == "dark" ? "#4CAF50" : "#88B04B"} />
        <Bar dataKey="Shares" fill={theme === "dark" ? "#81C784" : "#B4D2A1"} />
        <Bar dataKey="Likes" fill={theme === "dark" ? "#82ca9d" : "#F2B957"} />
        <Bar dataKey="Comments" fill={theme ? "#0FEB3B" : "#82ca9d"} />
        <Bar
          dataKey="Engagement Rate"
          fill={theme === "dark" ? "green" : "#F57F20"}
        />
        <Bar
          dataKey="Virality Rate"
          fill={theme === "dark" ? "#FF9800" : "pink"}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

const GrowthRateChart = () => {
  const { theme } = useContext(ThemeContext);

  const data = [
    {
      date: "Oct 1",
      Views: 400,
      Shares: 240,
      Likes: 150,
      Comments: 30,
      "Engagement Rate": 0.75,
      "Virality Rate": 0.6,
    },
    {
      date: "Oct 2",
      Views: 300,
      Shares: 221,
      Likes: 120,
      Comments: 25,
      "Engagement Rate": 0.65,
      "Virality Rate": 0.5,
    },
    {
      date: "Oct 3",
      Views: 200,
      Shares: 229,
      Likes: 100,
      Comments: 15,
      "Engagement Rate": 0.55,
      "Virality Rate": 0.4,
    },
    {
      date: "Oct 4",
      Views: 278,
      Shares: 200,
      Likes: 90,
      Comments: 20,
      "Engagement Rate": 0.5,
      "Virality Rate": 0.45,
    },
    {
      date: "Oct 5",
      Views: 189,
      Shares: 218,
      Likes: 80,
      Comments: 10,
      "Engagement Rate": 0.4,
      "Virality Rate": 0.42,
    },
  ];

  // Define colors based on theme
  const lineColors = {
    Views: theme === "dark" ? "#FFA726" : "#ff7300",
    Shares: theme === "dark" ? "#66BB6A" : "#4CAF50",
    Likes: theme === "dark" ? "#42A5F5" : "#2196F3",
    Comments: theme === "dark" ? "#FFB74D" : "#FF9800",
    "Engagement Rate": theme === "dark" ? "#BA68C8" : "#9C27B0",
    "Virality Rate": theme === "dark" ? "#EF5350" : "#E91E63",
  };

  return (
    <ResponsiveContainer width="100%" height={300} className={styles.container}>
      <h4>Growth Rate Chart</h4>
      <h5>Performance Metrics by Category</h5>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />

        <Line type="monotone" dataKey="Views" stroke={lineColors.Views} />
        <Line type="monotone" dataKey="Shares" stroke={lineColors.Shares} />
        <Line type="monotone" dataKey="Likes" stroke={lineColors.Likes} />
        <Line type="monotone" dataKey="Comments" stroke={lineColors.Comments} />
        <Line
          type="monotone"
          dataKey="Engagement Rate"
          stroke={lineColors["Engagement Rate"]}
        />
        <Line
          type="monotone"
          dataKey="Virality Rate"
          stroke={lineColors["Virality Rate"]}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

const ContentEngagementChart = () => {
  const data = [
    { name: "Likes", value: 400 },
    { name: "Shares", value: 300 },
    { name: "Comments", value: 300 },
    { name: "Saves", value: 100 },
  ];

  const COLORS = [
    "#4CAF50", // Green (Facebook)
    "#81C784", // Light Green (Twitter)
    "#A5D6A7", // Light Greenish (Instagram)
    "#4A8C2A", // Darker Green (LinkedIn)
    "#66BB6A", // Medium Green (YouTube)
    "#DCE775", // Light Yellowish Green (Snapchat)
    "#C6FF00", // Bright Green (TikTok)
  ];

  return (
    <ResponsiveContainer width="100%" height={300} className={styles.container}>
      <h4>Content Engagement Chart</h4>
      <h5>Engament Metrics in %</h5>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

const SEOMetrics = () => {
  const seoData = [
    {
      keyword: "Best Travel Tips",
      clicks: 2300,
      impressions: 45000,
      ctr: 5.11,
      avg_position: 3.5,
      pages: ["/blog/best-travel-tips-2024", "/category/travel", "/about"],
    },
    {
      keyword: "Programming Tips",
      clicks: 1800,
      impressions: 30000,
      ctr: 6.0,
      avg_position: 4.2,
      pages: [
        "/blog/top-programming-tips",
        "/category/programming",
        "/contact",
      ],
    },
    {
      keyword: "Home-Cooked Meals",
      clicks: 1500,
      impressions: 25000,
      ctr: 6.0,
      avg_position: 4.8,
      pages: ["/blog/best-home-cooked-meals-2024", "/category/food", "/about"],
    },
    {
      keyword: "Fashion Trends",
      clicks: 2100,
      impressions: 35000,
      ctr: 6.0,
      avg_position: 2.1,
      pages: ["/blog/fashion-trends-2024", "/category/fashion", "/contact"],
    },
    {
      keyword: "Hidden Travel Gems",
      clicks: 2800,
      impressions: 50000,
      ctr: 5.6,
      avg_position: 1.9,
      pages: ["/blog/hidden-travel-gems", "/category/travel", "/about"],
    },
    {
      keyword: "SEO Best Practices",
      clicks: 1600,
      impressions: 20000,
      ctr: 8.0,
      avg_position: 3.8,
      pages: ["/blog/seo-best-practices", "/category/seo", "/about"],
    },
    {
      keyword: "Fitness Tips",
      clicks: 1900,
      impressions: 40000,
      ctr: 4.75,
      avg_position: 5.0,
      pages: ["/blog/top-fitness-tips", "/category/fitness", "/contact"],
    },
    {
      keyword: "Digital Marketing Strategies",
      clicks: 1400,
      impressions: 18000,
      ctr: 7.78,
      avg_position: 3.1,
      pages: [
        "/blog/digital-marketing-strategies",
        "/category/marketing",
        "/about",
      ],
    },
    {
      keyword: "Healthy Eating Habits",
      clicks: 1700,
      impressions: 28000,
      ctr: 6.07,
      avg_position: 4.5,
      pages: ["/blog/healthy-eating-habits", "/category/health", "/about"],
    },
    {
      keyword: "Tech News",
      clicks: 2400,
      impressions: 52000,
      ctr: 4.62,
      avg_position: 3.3,
      pages: ["/blog/latest-tech-news", "/category/tech", "/contact"],
    },
    {
      keyword: "JavaScript Basics",
      clicks: 1300,
      impressions: 22000,
      ctr: 5.91,
      avg_position: 4.0,
      pages: ["/blog/javascript-basics", "/category/programming", "/about"],
    },
    {
      keyword: "Travel Packing Tips",
      clicks: 2100,
      impressions: 38000,
      ctr: 5.52,
      avg_position: 2.9,
      pages: ["/blog/travel-packing-tips", "/category/travel", "/contact"],
    },
    {
      keyword: "Personal Finance Management",
      clicks: 1200,
      impressions: 20000,
      ctr: 6.0,
      avg_position: 4.7,
      pages: ["/blog/personal-finance-tips", "/category/finance", "/about"],
    },
  ];

  return (
    <div className={styles.containerTable}>
      <h3> SEO Performance Metrics </h3>
      <table className={styles.tableContainer}>
        <thead>
          <tr>
            <th>Keywords</th>
            <th>Clicks</th>
            <th>Impressions</th>
            <th>Click Through Rate (%)</th>
            <th>Average Posiiton</th>
            <th>Visited Pages</th>
          </tr>
        </thead>
        <tbody>
          {seoData.map((data, i) => (
            <tr key={i}>
              <td>{data.keyword}</td>
              <td>{data.clicks}</td>
              <td>{data.impressions}</td>
              <td>{data.ctr}</td>
              <td>{data.avg_position}</td>
              <td>
                <ul>
                  {data.pages.map((item, i) => (
                    <li key={i}>
                      <a href={item} title={item}>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SEOMetrics;

// Export all charts together

export {
  PostPerformanceChart,
  GrowthRateChart,
  ContentEngagementChart,
  TrafficSourcesChart,
  SEOMetrics,
};
