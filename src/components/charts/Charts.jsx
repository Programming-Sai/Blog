'use client'
import React, { useContext } from 'react';
import { PieChart, Pie, Cell, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './charts.module.css';
import { ThemeContext } from '@/context/ThemeContext';





// Post Performance Chart (Line/Bar Chart)

const PostPerformanceChart = () => {
  const { theme } = useContext(ThemeContext);

  const data = [
    { 
        name: 'Music', 
        Views: 400, 
        Shares: 240, 
        Likes: 150, 
        Comments: 45, 
        'Engagement Rate': ((150 + 240 + 45) / 400) * 100, // 108.75%
        'Virality Rate': (240 / 400) * 100 // 60%
    },
    { 
        name: 'News', 
        Views: 300, 
        Shares: 221, 
        Likes: 120, 
        Comments: 30, 
        'Engagement Rate': ((120 + 221 + 30) / 300) * 100, // 123.67%
        'Virality Rate': (221 / 300) * 100 // 73.67%
    },
    { 
        name: 'Movies', 
        Views: 200, 
        Shares: 229, 
        Likes: 180, 
        Comments: 55, 
        'Engagement Rate': ((180 + 229 + 55) / 200) * 100, // 232%
        'Virality Rate': (229 / 200) * 100 // 114.5%
    },
    { 
        name: 'Sports', 
        Views: 278, 
        Shares: 200, 
        Likes: 140, 
        Comments: 40, 
        'Engagement Rate': ((140 + 200 + 40) / 278) * 100, // 137.41%
        'Virality Rate': (200 / 278) * 100 // 71.94%
    },
    { 
        name: 'Lifestyle', 
        Views: 189, 
        Shares: 218, 
        Likes: 160, 
        Comments: 38, 
        'Engagement Rate': ((160 + 218 + 38) / 189) * 100, // 218.52%
        'Virality Rate': (218 / 189) * 100 // 115.34%
    },
];



  return (
      <ResponsiveContainer width="100%" height={300} className={styles.container}>
        <h4>Blog Performance Chart</h4> 
        <h5>Performance Metrics by Category</h5> 
        <BarChart data={data}>
          <CartesianGrid  />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />


          <Bar dataKey="Views" fill={theme == 'dark' ? "#4CAF50" : "#88B04B"} />
          <Bar dataKey="Shares" fill={ theme === 'dark' ? "#81C784" : "#B4D2A1" } />
          <Bar dataKey="Likes" fill={ theme === 'dark' ? "#82ca9d" : "#F2B957"} />
          <Bar dataKey="Comments" fill={ theme ? "#0FEB3B" : "#82ca9d"} />
          <Bar dataKey="Engagement Rate" fill={ theme === 'dark' ? "green" : "#F57F20"} />
          <Bar dataKey="Virality Rate" fill={ theme ==='dark' ? "#FF9800" : "pink" } />
          
        </BarChart>
      </ResponsiveContainer>
  );
};









// Growth Rate Chart (Line Chart)
const GrowthRateChart = () => {
  const { theme } = useContext(ThemeContext);

  const data = [
    { date: 'Oct 1', Views: 400, Shares: 240, Likes: 150, Comments: 30, "Engagement Rate": 0.75, "Virality Rate": 0.6 },
    { date: 'Oct 2', Views: 300, Shares: 221, Likes: 120, Comments: 25, "Engagement Rate": 0.65, "Virality Rate": 0.5 },
    { date: 'Oct 3', Views: 200, Shares: 229, Likes: 100, Comments: 15, "Engagement Rate": 0.55, "Virality Rate": 0.4 },
    { date: 'Oct 4', Views: 278, Shares: 200, Likes: 90, Comments: 20, "Engagement Rate": 0.5, "Virality Rate": 0.45 },
    { date: 'Oct 5', Views: 189, Shares: 218, Likes: 80, Comments: 10, "Engagement Rate": 0.4, "Virality Rate": 0.42 },
  ];

  // Define colors based on theme
  const lineColors = {
    Views: theme === 'dark' ? "#FFA726" : "#ff7300",
    Shares: theme === 'dark' ? "#66BB6A" : "#4CAF50",
    Likes: theme === 'dark' ? "#42A5F5" : "#2196F3",
    Comments: theme === 'dark' ? "#FFB74D" : "#FF9800",
    "Engagement Rate": theme === 'dark' ? "#BA68C8" : "#9C27B0",
    "Virality Rate": theme === 'dark' ? "#EF5350" : "#E91E63",
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
        <Line type="monotone" dataKey="Engagement Rate" stroke={lineColors["Engagement Rate"]} />
        <Line type="monotone" dataKey="Virality Rate" stroke={lineColors["Virality Rate"]} />
      </LineChart>
    </ResponsiveContainer>
  );
};







// Likes, Shares, and Other Feedback Chart (Bar Chart)

const FeedbackChart = () => {
  const { theme } = useContext(ThemeContext);

  // Sample data with more feedback metrics
  const data = [
    { name: 'Post 1', Likes: 240, Shares: 130, Comments: 80, Views: 400, EngagementRate: 0.75, ViralityRate: 0.6 },
    { name: 'Post 2', Likes: 150, Shares: 90, Comments: 50, Views: 300, EngagementRate: 0.65, ViralityRate: 0.5 },
    { name: 'Post 3', Likes: 100, Shares: 70, Comments: 30, Views: 200, EngagementRate: 0.55, ViralityRate: 0.4 },
    { name: 'Post 4', Likes: 90, Shares: 50, Comments: 20, Views: 150, EngagementRate: 0.5, ViralityRate: 0.35 },
  ];

  // Define colors based on theme
  const barColors = {
    Likes: theme === 'dark' ? '#FFAB00' : '#FFC107',
    Shares: theme === 'dark' ? '#4CAF50' : '#8BC34A',
    Comments: theme === 'dark' ? '#F44336' : '#FF5252',
    Views: theme === 'dark' ? '#2196F3' : '#3F51B5',
    'Engagement Rate': theme === 'dark' ? '#9C27B0' : '#E91E63',
    'Virality Rate': theme === 'dark' ? '#FF9800' : '#FF5722',
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Likes" fill={barColors.Likes} />
        <Bar dataKey="Shares" fill={barColors.Shares} />
        <Bar dataKey="Comments" fill={barColors.Comments} />
        <Bar dataKey="Views" fill={barColors.Views} />
        <Bar dataKey="EngagementRate" fill={barColors.EngagementRate} />
        <Bar dataKey="ViralityRate" fill={barColors.ViralityRate} />
      </BarChart>
    </ResponsiveContainer>
  );
};


// Engagement Metrics (Bar Chart)
const EngagementMetricsChart = () => {
  const data = [
    { name: 'Post 1', engagement: 400 },
    { name: 'Post 2', engagement: 300 },
    { name: 'Post 3', engagement: 200 },
    { name: 'Post 4', engagement: 278 },
    { name: 'Post 5', engagement: 189 },
    { name: 'Post 6', engagement: 239 },
    { name: 'Post 7', engagement: 349 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="engagement" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

// Traffic Overview (Line Chart)
const TrafficOverviewChart = () => {
  const data = [
    { date: 'Oct 1', Views: 4000, engagement: 2400 },
    { date: 'Oct 2', Views: 3000, engagement: 2210 },
    { date: 'Oct 3', Views: 2000, engagement: 2290 },
    { date: 'Oct 4', Views: 2780, engagement: 2000 },
    { date: 'Oct 5', Views: 1890, engagement: 2181 },
    { date: 'Oct 6', Views: 2390, engagement: 2500 },
    { date: 'Oct 7', Views: 3490, engagement: 2100 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Views" stroke="#8884d8" />
        <Line type="monotone" dataKey="engagement" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};



const ContentEngagementChart = () => {
  const data = [
    { name: 'Likes', value: 400 },
    { name: 'Shares', value: 300 },
    { name: 'Comments', value: 300 },
    { name: 'Saves', value: 100 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

// Export the pie chart component


// Export all charts together
export { 
  PostPerformanceChart, 
  GrowthRateChart, 
  FeedbackChart, 
  EngagementMetricsChart, 
  TrafficOverviewChart ,
  ContentEngagementChart
};