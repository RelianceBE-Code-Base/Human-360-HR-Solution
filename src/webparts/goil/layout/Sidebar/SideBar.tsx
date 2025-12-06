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
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <div className={styles.logo}></div>
        <h2>GOIL PMS</h2>
      </div>

      {/* Administrator side bar view */}
      <nav className={styles.sidebarNav}>
        <div className={styles.navSection}>
          <div className={styles.navSectionTitle}>Main</div>
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

          {/* /*Manager sidenav Section*/ }
        <div className={styles.navSection}>
          <div className={styles.navSectionTitle}>Manager Section</div>
          <NavLink to="/ManagerDashboard" className={getNavLinkClass} end>
            <Icon iconName="ViewDashboard"></Icon>
            <span>Manager Dashboard</span>
          </NavLink>
          <NavLink to="/" className={getNavLinkClass} end>
            <Icon iconName="AddToShoppingList"></Icon>
            <span>Feedback</span>
          </NavLink>
          <NavLink to="/" className={getNavLinkClass} end>
            <Icon iconName="Calendar"></Icon>
            <span>Performance Review</span>
          </NavLink>
          <NavLink to="/" className={getNavLinkClass} end>
            <Icon iconName="Chart"></Icon>
            <span>Goals</span>
          </NavLink>
          <NavLink to="/" className={getNavLinkClass} end>
            <Icon iconName="PowerBILogo16"></Icon>
            <span>Report and Analytics</span>
          </NavLink>
        </div>

        <div className={styles.navSection}>
          <div className={styles.navSectionTitle}>Management Module</div>
          <NavLink to="/user-management" className={getNavLinkClass}>
            <Icon iconName="ViewDashboard"></Icon>
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/department-management" className={getNavLinkClass}>
            <Icon iconName="Group"></Icon>
            <span>Team Management</span>
          </NavLink>
          <NavLink to="/reports" className={getNavLinkClass}>
            <Icon iconName="AccessibiltyChecker"></Icon>
            <span>Performance Review</span>
          </NavLink>
          <NavLink to="/reports" className={getNavLinkClass}>
            <Icon iconName="CircleAdditionSolid"></Icon>
            <span>Create KPI</span>
          </NavLink>
        </div> 

        {/* User side bar view */}
       {/*Employee Dashboard*/}
        <div className={styles.navSection}>
          <div className={styles.navSectionTitle}>Employee Dashboard</div>
          <NavLink to="/EmpDashboard" className={getNavLinkClass}>
            <Icon iconName="PlayerSettings"></Icon>
            <span>Employee Dashboard</span>
          </NavLink>
          <NavLink to="/department-management" className={getNavLinkClass}>
            <Icon iconName="EMI"></Icon>
            <span>Feedback</span>
          </NavLink>
          <NavLink to="/reports" className={getNavLinkClass}>
            <Icon iconName="PowerBILogo16"></Icon>
            <span>Perfromance Review</span>
          </NavLink>
          <NavLink to="/department-management" className={getNavLinkClass}>
            <Icon iconName="EMI"></Icon>
            <span>Goals</span>
          </NavLink>
          <NavLink to="/reports" className={getNavLinkClass}>
            <Icon iconName="PowerBILogo16"></Icon>
            <span>Reports & Analytics</span>
          </NavLink>
        </div>
        {/* BDE side bar view */}
        {/* Manager side bar view */}
      </nav>
    </aside>
  );
};

export default SideBar;
