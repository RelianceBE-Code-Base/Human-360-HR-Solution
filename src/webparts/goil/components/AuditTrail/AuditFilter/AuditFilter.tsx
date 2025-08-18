import * as React from "react";
import styles from "./AuditFilter.module.scss";

import { Icon } from "@fluentui/react/lib/Icon";

// export interface IAuditTrailProps {
//   title: string;
//   subtitle: string;
//   userName: string;
//   userRole: string;
//   notificationsCount?: number;
//   onLogout: () => void;
// }

const AuditFilter = ({}) => {
  return (
    <div
      style={{
        marginBottom: "1rem",
      }}
      className={styles.filtersCard}
    >
      <h3>Filter Audit Logs</h3>
      <div className={styles.filtersGrid}>
        <select>
          <option value="All Users">All Users</option>
          <option value="Mike Johnson">Mike Johnson</option>
          <option value="Derek Makarah">Derek Makarah</option>
          <option value="Kamil Hahasan">Kamil Hahasan</option>
        </select>
        <select>
          <option value="All Actions">All Actions</option>
          <option value="Logout">Logout</option>
          <option value="Login">Login</option>
          <option value="KPI Created">KPI Created</option>
          <option value="KPI Updated">KPI Updated</option>
          <option value="Data Export">Data Export</option>
        </select>
        <input type="month" />
        <button>
          <Icon iconName="Filter" /> Filter
        </button>
        <button
          style={{
            background: "#059669",
          }}
        >
          <Icon iconName="Download" /> Export
        </button>
      </div>
    </div>
  );
};

export default AuditFilter;
// export {itemsCommandBar};
