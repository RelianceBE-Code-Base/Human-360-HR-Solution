import * as React from "react";
import styles from "./ActivityLogs.module.scss";

// import { Icon } from "@fluentui/react";
// import { Icon } from '@fluentui/react/lib/Icon';

interface KPIListProps {
  activityLog: IActivityLog[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface IActivityLog {
  timestamp: string;
  user: string;
  role: string;
  action: string;
  details: string;
  ipaddress: string;
}
const ActivityLogs: React.FC<KPIListProps> = ({
  activityLog,
  onEdit,
  onDelete,
}) => {
  return (
    <div className={styles.kpiListContainer}>
      <h2>Activity Log</h2>
      <table className={styles.kpiTable}>
        <thead>
          <tr>
            <th>TIMESTAMP</th>
            <th>USER</th>
            <th>ROLE</th>
            <th>ACTION</th>
            <th>DETAILS</th>
            <th>IP ADDRESS</th>
          </tr>
        </thead>
        <tbody>
          {activityLog.map((activity, index) => (
            <tr key={index}>
              <td>
                <div>{activity.timestamp}</div>
              </td>
              <td>{activity.user}</td>
              <td>{activity.role}</td>
              <td>{<span>{activity.action}</span>}</td>
              <td>{activity.details}</td>
              <td>{activity.ipaddress}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityLogs;
