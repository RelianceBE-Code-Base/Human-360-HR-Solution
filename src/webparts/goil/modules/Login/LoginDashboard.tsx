/**
 * LoginDashboard Component
 *
 * Provides a role selection interface for the Performance Management System (PMS).
 * Users can select one of three roles: Admin, User, or HOD (Head of Department).
 * The component is divided into two panels:
 *
 * 1. Left Panel:
 *    - Branding, system description, and footer with copyright.
 *
 * 2. Right Panel:
 *    - Role selection cards for Admin, User, and HOD.
 *    - Each card displays an icon, title, description, and navigates to the relevant page on click.
 *
 * Functionality:
 * - Clicking a role card triggers `handleRoleSelect`, logging the selected role.
 * - Navigates to the Admin dashboard if "admin" is selected (placeholder for actual login logic).
 * - Styled using CSS Modules (`LoginDashboard.module.scss`).
 *
 * @component
 * @returns {TSX.Element} The role selection dashboard UI
 */

import * as React from "react";
import styles from "./LoginDashboard.module.scss";
import { Icon } from "@fluentui/react/lib/Icon";
import { useNavigate } from "react-router-dom";
// Using standard FontAwesome icons

// Define the roles available
type UserRole = "admin" | "user" | "hod" | "employee" | "bde";

const LoginDashboard: React.FC = () => {
  const navigate = useNavigate();

  // const handleRoleSelect = (role: UserRole) => {
  //   console.log(`Role Selected: ${role}`);
  //   // Here is where you would trigger navigation or MSAL login
  //   // e.g., navigate('/dashboard');
  //   if (role === "admin") {
  //     navigate("/AdminDashboard");
  //   }
  //   if (role === "user") {
  //     navigate("/EmployeeDashboard");
  //   }
  //   if (role === "hod") {
  //     navigate("/ManagerDashboard");
  //   }
  //   if (role === "bde") {
  //     navigate("/BDEDashboard");
  //   }
  // };

  const handleRoleSelect = (role: UserRole) => {
    console.log(`Role Selected: ${role}`);
    localStorage.setItem("role", role); // << store the selected role
    switch (role) {
      case "admin":
        navigate("/AdminDashboard");
        break;
      case "user":
        navigate("/EmployeeDashboard");
        break;
      case "hod":
        navigate("/ManagerDashboard");
        break;
      case "bde":
        navigate("/BDEDashboard");
        break;
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.mainCard}>
        {/* --- Left Panel (Orange Branding) --- */}
        <div className={styles.leftPanel}>
          <div className={styles.brandContent}>
            <h1>Performance Management System</h1>
            <p>
              Streamline your performance reviews, track KPIs, and foster growth
              within your organization.
            </p>
          </div>
          <div className={styles.footer}>
            &copy; {new Date().getFullYear()} PMS Inc. All rights reserved.
          </div>
        </div>

        {/* --- Right Panel (Role Selection) --- */}
        <div className={styles.rightPanel}>
          <h2>Select Your Role</h2>
          <p className={styles.subHeader}>
            Please select your role to proceed to the login page.
          </p>

          <div className={styles.rolesGrid}>
            {/* 1. Admin Card (Full Width) */}
            <div
              className={styles.roleCard}
              onClick={() => handleRoleSelect("admin")}
            >
              <div className={styles.iconCircle}>
                <Icon iconName="AuthenticatorApp" />
              </div>
              <div className={styles.textGroup}>
                <h3>Login as Admin</h3>
                <p>Access the administrator dashboard</p>
              </div>
              <Icon iconName="ChromeBackMirrored" />
            </div>

            {/* 2. Bottom Row (User & HOD) */}
            <div className={styles.bottomRow}>
              {/* User Card */}
              <div
                className={`${styles.roleCard} ${styles.smallCard}`}
                onClick={() => handleRoleSelect("user")}
              >
                <div className={styles.iconCircle}>
                  <Icon iconName="Contact" />
                </div>
                <div className={styles.textGroup}>
                  <h3>Login as User</h3>
                  <p>Manage your performance</p>
                </div>
                <Icon className={styles.arrowIcon} />
              </div>

              {/* HOD Card */}
              <div
                className={`${styles.roleCard} ${styles.smallCard}`}
                onClick={() => handleRoleSelect("hod")}
              >
                <div className={styles.iconCircle}>
                  <Icon iconName="Group" />
                </div>
                <div className={styles.textGroup}>
                  <h3>Login as HOD</h3>
                  <p>Oversee your department</p>
                </div>
                <Icon className={styles.arrowIcon} />
              </div>

              {/* BDE Card */}
              <div
                className={`${styles.roleCard} ${styles.fullWidth}`}
                onClick={() => handleRoleSelect("bde" as UserRole)}
              >
                <div className={styles.iconCircle}>
                  <Icon iconName="Bullseye" />
                </div>
                <div className={styles.textGroup}>
                  <h3>Login as BDE</h3>
                  <p>Set and approve KPIs for all employees</p>
                </div>
                <Icon className={styles.arrowIcon} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginDashboard;
