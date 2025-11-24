import * as React from "react";
import styles from "./SideBar.module.scss";
import { Icon } from "@fluentui/react/lib/Icon";

// 1. Import NavLink instead of useNavigate
import { NavLink } from "react-router-dom";

// Helper function to generate class names, making the code cleaner
const getNavLinkClass = ({ isActive }: { isActive: boolean }): string => {
  return `${styles.navItem} ${isActive ? styles.active : ""}`;
};

const SideBar: React.FC = () => {
  // 2. You no longer need useNavigate here
  // const navigate = useNavigate();
 
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <div className={styles.logo}></div>
        <h2>GOIL PMS</h2>
      </div>

      <nav className={styles.sidebarNav}>
        <div className={styles.navSection}>
          <div className={styles.navSectionTitle}>Main</div>
          {/* 3. Use NavLink, the 'to' prop, the 'end' prop, and the className function */}
          <NavLink to="/" className={getNavLinkClass} end>
            <Icon iconName="ViewDashboard"></Icon>
            <span>Dashboard</span>
          </NavLink>
        </div>

        <div className={styles.navSection}>
          <div className={styles.navSectionTitle}>KPI Management</div>
          <NavLink to="/kpi-dashboard" className={getNavLinkClass}>
            <Icon iconName="Chart"></Icon>
            <span>KPI Dashboard</span>
          </NavLink>
          <NavLink to="/all-kpis" className={getNavLinkClass}>
            <Icon iconName="CheckList"></Icon>
            <span>All KPIs</span>
          </NavLink>
          <NavLink to="/kpis/kpi-create" className={getNavLinkClass}>
            <Icon iconName="CircleAdditionSolid"></Icon>
            <span>Create KPI</span>
          </NavLink>
        </div>

        <div className={styles.navSection}>
          <div className={styles.navSectionTitle}>Performance</div>
          <NavLink to="/performance-cycles" className={getNavLinkClass}>
            <Icon iconName="Calendar"></Icon>
            <span>Performance Cycles</span>
          </NavLink>
          <NavLink to="/team-performance" className={getNavLinkClass}>
            <Icon iconName="Group"></Icon>
            <span>Team Performance</span>
          </NavLink>
        </div>

        <div className={styles.navSection}>
          <div className={styles.navSectionTitle}>Administration</div>
          <NavLink to="/user-management" className={getNavLinkClass}>
            <Icon iconName="PlayerSettings"></Icon>
            <span>User Management</span>
          </NavLink>
          <NavLink to="/department-management" className={getNavLinkClass}>
            <Icon iconName="EMI"></Icon>
            <span>Departments</span>
          </NavLink>
          <NavLink to="/reports" className={getNavLinkClass}>
            <Icon iconName="PowerBILogo16"></Icon>
            <span>Reports & Analytics</span>
          </NavLink>
        </div>
      </nav>
    </aside>
  );
};

export default SideBar;
