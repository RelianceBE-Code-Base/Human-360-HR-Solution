/**
 * TopBar (Nav) component renders the application's top navigation bar.
 *
 * Features:
 * - Left section:
 *   - Mobile menu toggle button.
 *   - Breadcrumb navigation.
 * - Right section:
 *   - Notification icon with badge.
 *   - User menu displaying avatar, name, and role.
 *   - Logout button with sign-out icon that navigates to the portal page.
 *
 * @returns {TSX.Element} A top navigation bar element.
 */

import * as React from "react";
import styles from "./TopBar.module.scss";
import { Icon } from "@fluentui/react/lib/Icon";
import Breadcrumbs from "../../components/common/Breadcrumbs/Breadcrumbs";
import Button from "../../components/common/Button/Button";
import { useNavigate } from "react-router-dom";

const Nav: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/portal");
  };
  return (
    <div className={styles.topBar}>
      <div className={styles.topBarLeft}>
        <button id="mobileMenuBtn" className="btn btn-secondary btn-sm">
          <i className="fas fa-bars"></i>
        </button>
        <div>
          <Breadcrumbs />
        </div>
      </div>

      <div className={styles.topBarRight}>
        <div className={styles.notificationIcon}>
          <Icon iconName="RingerSolid"></Icon>
          <span className={styles.notificationBadge} id="notificationCount">
            0
          </span>
        </div>

        <div className={styles.userMenu}>
          <div className={styles.userAvatar} id="userAvatar">
            JM
          </div>
          <div className={styles.userInfo}>
            <div className={styles.userName} id="userName">
              Admin User
            </div>
            <div className={styles.userRole} id="userRole">
              Administrator
            </div>
          </div>
        </div>

        <Button variant="secondary" onClick={handleLogout}>
          <Icon iconName="SignOut"></Icon>
        </Button>
      </div>
    </div>
  );
};

export default Nav;
