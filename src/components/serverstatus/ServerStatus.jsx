import React, { useState } from "react";
import styles from "./serverstatus.module.css";

const serverMetrics = [
  {
    name: "CPU Usage",
    value: "40.05%",
    details: "32 CPUs",
    total: 100,
    color: "rgba(76, 175, 80, 0.7)", // Green shade
  },
  {
    name: "Memory Usage",
    value: "32.2%",
    details: "of total memory",
    total: 100,
    color: "rgba(139, 195, 74, 0.7)", // Lighter green shade
  },
  {
    name: "Disk Usage",
    value: "82.2%",
    details: "of available storage",
    total: 100,
    color: "rgba(205, 220, 57, 0.7)", // Different green shade
  },
  {
    name: "Databases",
    value: "63",
    details: "out of 100 available",
    total: 100,
    color: "rgba(165, 214, 167, 0.7)", // Soft green shade
  },
  {
    name: "Domains",
    value: "30",
    details: "out of 50 available",
    total: 50,
    color: "rgba(0, 150, 136, 0.7)", // Teal shade
  },
  {
    name: "Email Accounts",
    value: "13",
    details: "out of 50 available",
    total: 50,
    color: "rgba(0, 188, 212, 0.7)", // Cyan shade
  },
];

const ProgressBar = ({ id, color, title, value, total, details }) => {
  const percentage = (parseFloat(value) / total) * 100;
  return (
    <div key={id} className={styles.progressContainer}>
      <p>
        {title}({value} - {details})
      </p>
      <div
        className={styles.progressbar}
        style={{ "--color": color, "--percentage": percentage }}
      />
    </div>
  );
};

const ServerStatus = () => {
  return (
    <div className={styles.container}>
      <h3>Server Metrics</h3>
      <p className={styles.summary}>Summary of the status of your server.</p>
      <div className={styles.progresses}>
        {serverMetrics.map((metrics, i) => (
          <ProgressBar
            key={i}
            color={metrics.color}
            title={metrics.name}
            value={metrics.value}
            total={metrics.total}
            details={metrics.details}
          />
        ))}
      </div>
    </div>
  );
};

export default ServerStatus;
