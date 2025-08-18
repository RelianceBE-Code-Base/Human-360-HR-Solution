import * as React from "react";
import styles from "./AuditTrail.module.scss";
import SummaryCard from "../SummaryCard/SummaryCard";
import AuditFilter from "./AuditFilter/AuditFilter";
import ActivityLogs from "./ActivityLogs/ActivityLogs";
// import { Icon } from '@fluentui/react/lib/Icon';

// export interface IAuditTrailProps {
//   title: string;
//   subtitle: string;
//   userName: string;
//   userRole: string;
//   notificationsCount?: number;
//   onLogout: () => void;
// }

const AuditTrail = ({}) => {
  const auditSummaryCards = [
    {
      label: "Total Activities",
      value: 156,
      bgColor: "#ea5b0c",
      icon: "History",
    },
    {
      label: "Today's Activities",
      value: 23,
      bgColor: "#3b82ac",
      icon: "Event12",
    },
    {
      label: "Active Users",
      value: 8,
      bgColor: "#10b981",
      icon: "Group",
    },
    {
      label: "Failed Logins",
      value: 2,
      bgColor: "#EF4444",
      icon: "ShieldSolid",
    },
  ];

  const activityLogs = [
    {
      timestamp: "15/08/2025 19:26:26",
      user: "Kamil Alhassan",
      role: "Department Head",
      action: "Navigation",
      details: "Accessed audit-trail section",
      ipaddress: "192.168.1.10",
    },
    {
      timestamp: "15/08/2025 19:26:26",
      user: "Kamil Alhassan",
      role: "Department Head",
      action: "Navigation",
      details: "Accessed audit-trail section",
      ipaddress: "192.168.1.10",
    },
    {
      timestamp: "15/08/2025 19:26:26",
      user: "Kamil Alhassan",
      role: "Department Head",
      action: "Navigation",
      details: "Accessed audit-trail section",
      ipaddress: "192.168.1.10",
    },
    {
      timestamp: "15/08/2025 19:26:26",
      user: "Kamil Alhassan",
      role: "Department Head",
      action: "Navigation",
      details: "Accessed audit-trail section",
      ipaddress: "192.168.1.10",
    },
    {
      timestamp: "15/08/2025 19:26:26",
      user: "Kamil Alhassan",
      role: "Department Head",
      action: "Navigation",
      details: "Accessed audit-trail section",
      ipaddress: "192.168.1.10",
    },
    {
      timestamp: "15/08/2025 19:26:26",
      user: "Kamil Alhassan",
      role: "Department Head",
      action: "Navigation",
      details: "Accessed audit-trail section",
      ipaddress: "192.168.1.10",
    },
    {
      timestamp: "15/08/2025 19:26:26",
      user: "Kamil Alhassan",
      role: "Department Head",
      action: "Navigation",
      details: "Accessed audit-trail section",
      ipaddress: "192.168.1.10",
    },
    {
      timestamp: "15/08/2025 19:26:26",
      user: "Kamil Alhassan",
      role: "Department Head",
      action: "Navigation",
      details: "Accessed audit-trail section",
      ipaddress: "192.168.1.10",
    },
    {
      timestamp: "15/08/2025 19:26:26",
      user: "Kamil Alhassan",
      role: "Department Head",
      action: "Navigation",
      details: "Accessed audit-trail section",
      ipaddress: "192.168.1.10",
    },
    {
      timestamp: "15/08/2025 19:26:26",
      user: "Kamil Alhassan",
      role: "Department Head",
      action: "Navigation",
      details: "Accessed audit-trail section",
      ipaddress: "192.168.1.10",
    },
    {
      timestamp: "15/08/2025 19:26:26",
      user: "Kamil Alhassan",
      role: "Department Head",
      action: "Navigation",
      details: "Accessed audit-trail section",
      ipaddress: "192.168.1.10",
    },
    {
      timestamp: "15/08/2025 19:26:26",
      user: "Kamil Alhassan",
      role: "Department Head",
      action: "Navigation",
      details: "Accessed audit-trail section",
      ipaddress: "192.168.1.10",
    },
    {
      timestamp: "15/08/2025 19:26:26",
      user: "Kamil Alhassan",
      role: "Department Head",
      action: "Navigation",
      details: "Accessed audit-trail section",
      ipaddress: "192.168.1.10",
    },
    {
      timestamp: "15/08/2025 19:26:26",
      user: "Kamil Alhassan",
      role: "Department Head",
      action: "Navigation",
      details: "Accessed audit-trail section",
      ipaddress: "192.168.1.10",
    },
    {
      timestamp: "15/08/2025 19:26:26",
      user: "Kamil Alhassan",
      role: "Department Head",
      action: "Navigation",
      details: "Accessed audit-trail section",
      ipaddress: "192.168.1.10",
    },
    {
      timestamp: "15/08/2025 19:26:26",
      user: "Kamil Alhassan",
      role: "Department Head",
      action: "Navigation",
      details: "Accessed audit-trail section",
      ipaddress: "192.168.1.10",
    },
    {
      timestamp: "15/08/2025 19:26:26",
      user: "Kamil Alhassan",
      role: "Department Head",
      action: "Navigation",
      details: "Accessed audit-trail section",
      ipaddress: "192.168.1.10",
    },
    {
      timestamp: "15/08/2025 19:26:26",
      user: "Kamil Alhassan",
      role: "Department Head",
      action: "Navigation",
      details: "Accessed audit-trail section",
      ipaddress: "192.168.1.10",
    },
    {
      timestamp: "15/08/2025 19:26:26",
      user: "Kamil Alhassan",
      role: "Department Head",
      action: "Navigation",
      details: "Accessed audit-trail section",
      ipaddress: "192.168.1.10",
    },
    {
      timestamp: "15/08/2025 19:26:26",
      user: "Kamil Alhassan",
      role: "Department Head",
      action: "Navigation",
      details: "Accessed audit-trail section",
      ipaddress: "192.168.1.10",
    },
    {
      timestamp: "15/08/2025 19:26:26",
      user: "Kamil Alhassan",
      role: "Department Head",
      action: "Navigation",
      details: "Accessed audit-trail section",
      ipaddress: "192.168.1.10",
    },
    {
      timestamp: "15/08/2025 19:26:26",
      user: "Kamil Alhassan",
      role: "Department Head",
      action: "Navigation",
      details: "Accessed audit-trail section",
      ipaddress: "192.168.1.10",
    },
    {
      timestamp: "15/08/2025 19:26:26",
      user: "Kamil Alhassan",
      role: "Department Head",
      action: "Navigation",
      details: "Accessed audit-trail section",
      ipaddress: "192.168.1.10",
    },
    {
      timestamp: "15/08/2025 19:26:26",
      user: "Kamil Alhassan",
      role: "Department Head",
      action: "Navigation",
      details: "Accessed audit-trail section",
      ipaddress: "192.168.1.10",
    },
    {
      timestamp: "15/08/2025 19:26:26",
      user: "Kamil Alhassan",
      role: "Department Head",
      action: "Navigation",
      details: "Accessed audit-trail section",
      ipaddress: "192.168.1.10",
    },
  ];
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
        Audit Trail
      </h2>
      <p
        style={{
          color: "#4b5563",
        }}
      >
        Comprehensive tracking of all system activities and user actions
      </p>
      <div className={styles.summaryCards}>
        {auditSummaryCards.map((item, index) => {
          return (
            <SummaryCard
              key={index}
              position={index}
              label={item.label}
              value={item.value}
              icon={item.icon}
              bgColor={item.bgColor}
            />
          );
        })}
      </div>
      <AuditFilter />
      <ActivityLogs
        activityLog={activityLogs}
        onDelete={() => {
          ("");
        }}
        onEdit={() => {
          ("");
        }}
      />
    </div>
  );
};

export default AuditTrail;
// export {itemsCommandBar};
