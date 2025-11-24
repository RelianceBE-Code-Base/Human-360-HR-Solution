import * as React from "react";
import styles from "./Notification.module.scss";
import { Icon } from "@fluentui/react";
import NotificationSettings from "./NotificationSettings/NotificationSettings";

interface Notification {
  title: string;
  message: string;
  time: string;
  department: string;
  icon: "alert" | "trophy" | "info";
}

const notifications: Notification[] = [
  {
    title: "KPI Deadline Approaching",
    message: "Equipment Uptime Percentage review due in 3 days",
    time: "2 hours ago",
    department: "Operations",
    icon: "alert",
  },
  {
    title: "KPI Target Achieved",
    message: "Customer Retention Rate exceeded target of 95%",
    time: "5 hours ago",
    department: "Sales",
    icon: "trophy",
  },
  {
    title: "KPI Updated",
    message: "Budget allocation updated for Digital Transformation Progress",
    time: "1 day ago",
    department: "IT",
    icon: "info",
  },
];

const Notification = ({}) => {
  return (
    <div
      style={{
        marginBottom: "1rem",
      }}
    >
      <h2
        style={{
          fontWeight: "700",
          fontSize: "1.875rem",
          lineHeight: "2.25rem",
          color: "#212121",
          margin: ".5rem 0",
        }}
      >
        Notifications & Reminders
      </h2>
      <p
        style={{
          color: "#4b5563",
        }}
      >
        Automated notification system for KPI deadlines and updates
      </p>
      <div className={styles.container}>
        <h2>Recent Notifications</h2>
        {notifications.map((note, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.icon}>
              <div>
                {note.icon === "alert" && (
                  <Icon iconName="AwayStatus" color="#ff5722" />
                )}
                {note.icon === "trophy" && (
                  <Icon iconName="trophy2Solid" color="#ff9800" />
                )}
                {note.icon === "info" && (
                  <Icon iconName="InfoSolid" color="#2196f3" />
                )}
              </div>
            </div>
            <div className={styles.content}>
              <p>{note.title}</p>
              <p>{note.message}</p>
              <span className={styles.meta}>
                {note.time} &nbsp; • &nbsp; {note.department}
              </span>
            </div>
          </div>
        ))}
      </div>

      <NotificationSettings />
    </div>
  );
};

export default Notification;
// export {itemsCommandBar};
