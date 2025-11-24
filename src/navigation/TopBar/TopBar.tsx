import * as React from "react";
import styles from "./TopBar.module.scss";
import { Icon } from "@fluentui/react/lib/Icon";
import Breadcrumbs from "../../shared/Breadcrumbs/Breadcrumbs";
import Button from "../../shared/common/Button/Button";

const Nav: React.FC = () => {
  return (
    <div className={styles.topBar}>
      <div className={styles.topBarLeft}>
        <button id="mobileMenuBtn" className="btn btn-secondary btn-sm">
          <i className="fas fa-bars"></i>
        </button>
        <div>
          {/* <span>Dashboard</span> */}
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

        {/* <button id="logoutBtn" className="btn btn-secondary btn-sm"></button> */}
        <Button variant="secondary">
          <Icon iconName="SignOut"></Icon>
        </Button>
      </div>
    </div>
  );
};

export default Nav;
