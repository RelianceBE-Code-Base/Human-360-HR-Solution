/**
 * SideBar component renders the application's sidebar navigation.
 *
 * Features:
 * - Displays a logo and application title at the top.
 * - Contains multiple navigation sections with headings:
 *   - Main
 *   - KPI Management
 *   - Performance
 *   - Administration
 * - Uses `NavLink` from react-router-dom to highlight the active route.
 * - Each navigation item displays an icon and a label.
 *
 * @returns {TSX.Element} A sidebar element with navigational links.
 */

import * as React from "react";
import styles from "./SideBar.module.scss";
import { Icon } from "@fluentui/react/lib/Icon";
import { NavLink } from "react-router-dom";

// Helper function to generate class names, making the code cleaner
const getNavLinkClass = ({ isActive }: { isActive: boolean }): string => {
  return `${styles.navItem} ${isActive ? styles.active : ""}`;
};

const SideBar: React.FC = () => {
  const role = localStorage.getItem("role"); // "admin", "user", "hod", etc.

  let content: React.ReactNode = null;

  switch (role) {
    case "admin":
      content = (
        <>
          {/* Admin Menu */}
          <div className={styles.navSection}>
            <div className={styles.navSectionTitle}>Main</div>
            <NavLink to="/AdminDashboard" className={getNavLinkClass} end>
              <Icon iconName="ViewDashboard" />
              <span>Dashboard</span>
            </NavLink>
          </div>
          <div className={styles.navSection}>
            <div className={styles.navSectionTitle}>KPI Management</div>
            <NavLink to="/kpi-dashboard" className={getNavLinkClass}>
              <Icon iconName="Chart" />
              <span>KPI Dashboard</span>
            </NavLink>
            <NavLink to="/all-kpis" className={getNavLinkClass}>
              <Icon iconName="CheckList" />
              <span>All KPIs</span>
            </NavLink>
            <NavLink to="/kpis/kpi-create" className={getNavLinkClass}>
              <Icon iconName="CircleAdditionSolid" />
              <span>Create KPI</span>
            </NavLink>
          </div>
          <div className={styles.navSection}>
            <div className={styles.navSectionTitle}>Performance</div>
            <NavLink to="/performance-cycles" className={getNavLinkClass}>
              <Icon iconName="Calendar" />
              <span>Performance Cycles</span>
            </NavLink>
            <NavLink
              to="/performance-cycles/create"
              className={getNavLinkClass}
            >
              <Icon iconName="CircleAdditionSolid" />
              <span>Create Performance Cycle</span>
            </NavLink>
            <NavLink to="/team-performance" className={getNavLinkClass}>
              <Icon iconName="Group" />
              <span>Team Performance</span>
            </NavLink>
          </div>
          <div className={styles.navSection}>
            <div className={styles.navSectionTitle}>Administration</div>
            <NavLink to="/user-management" className={getNavLinkClass}>
              <Icon iconName="PlayerSettings" />
              <span>User Management</span>
            </NavLink>
            <NavLink to="/department-management" className={getNavLinkClass}>
              <Icon iconName="EMI" />
              <span>Departments</span>
            </NavLink>
            <NavLink to="/reports" className={getNavLinkClass}>
              <Icon iconName="PowerBILogo16" />
              <span>Reports & Analytics</span>
            </NavLink>
            <NavLink to="/settings" className={getNavLinkClass}>
              <Icon iconName="Settings" />
              <span>Settings</span>
            </NavLink>
          </div>
        </>
      );
      break;

    case "hod":
      content = (
        <>
          {/* HOD / Manager Menu */}
          <div className={styles.navSection}>
            <div className={styles.navSectionTitle}>Manager Section</div>
            <NavLink to="/ManagerDashboard" className={getNavLinkClass} end>
              <Icon iconName="ViewDashboard" />
              <span>Manager Dashboard</span>
            </NavLink>
            <NavLink to="/TeamManagement" className={getNavLinkClass} end>
              <Icon iconName="AddToShoppingList"></Icon>
              <span>Team Management</span>
            </NavLink>
            <NavLink to="/" className={getNavLinkClass} end>
            <Icon iconName="Calendar"></Icon>
            <span>Performance Review</span>
            </NavLink>
            <NavLink to="/ManagercreateKPI" className={getNavLinkClass} end>
              <Icon iconName="Chart"></Icon>
              <span>Create KPI</span>
            </NavLink>
            {/* <NavLink to="/" className={getNavLinkClass} end>
              <Icon iconName="PowerBILogo16"></Icon>
              <span>Report and Analytics</span>
            </NavLink> */}
          </div>
        </>
      );
      break;

    case "user":
      content = (
        <>
          {/* Employee / User Menu */}
          <div className={styles.navSection}>
            <div className={styles.navSectionTitle}>Employee Dashboard</div>
            <NavLink to="/EmployeeDashboard" className={getNavLinkClass}>
              <Icon iconName="PlayerSettings" />
              <span>Employee Dashboard</span>
            </NavLink>
            <NavLink to="/FeedbackCenter" className={getNavLinkClass}>
              <Icon iconName="EMI" />
              <span>Feedback</span>
            </NavLink>
            <NavLink to="/PerformanceCycle" className={getNavLinkClass}>
              <Icon iconName="PowerBILogo16" />
              <span>Performance Review</span>
            </NavLink>
            <NavLink to="/GoalsObjectives" className={getNavLinkClass}>
              <Icon iconName="EMI" />
              <span>Goals</span>
            </NavLink>
            <NavLink to="/reports" className={getNavLinkClass}>
              <Icon iconName="PowerBILogo16" />
              <span>Reports & Analytics</span>
            </NavLink>
          </div>
        </>
      );
      break;

    case "bde":
      content = (
        <>
          {/* BDE Menu */}
          <div className={styles.navSection}>
            <div className={styles.navSectionTitle}>BDC Dashboard</div>
            <NavLink to="/BDEDashboard" className={getNavLinkClass}>
              <Icon iconName="ViewDashboard" />
              <span>BDC Dashboard</span>
            </NavLink>
            <NavLink to="/approval-queue" className={getNavLinkClass}>
              <Icon iconName="CompletedSolid" />
              <span>Approval Queue</span>
            </NavLink>
            <NavLink to="/kpi-dashboard" className={getNavLinkClass}>
              <Icon iconName="Chart" />
              <span>KPI Dashboard</span>
            </NavLink>
            <NavLink to="/all-kpis" className={getNavLinkClass}>
              <Icon iconName="TaskList" />
              <span>All KPIs</span>
            </NavLink>
            <NavLink to="/reports" className={getNavLinkClass}>
              <Icon iconName="PowerBILogo16" />
              <span>Reports & Analytics</span>
            </NavLink>
          </div>
        </>
      );
      break;

    default:
      content = null; // no sidebar if role unknown
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <div className={styles.logo}></div>
        <h2>GOIL PMS</h2>
      </div>
      <nav className={styles.sidebarNav}>{content}</nav>
    </aside>
  );
};

export default SideBar;
