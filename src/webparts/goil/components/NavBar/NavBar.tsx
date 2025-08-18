import * as React from 'react';
import styles from './NavBar.module.scss';
import { Icon } from '@fluentui/react/lib/Icon';
import { useNavigate } from 'react-router-dom';

const Nav: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav className={`${styles.bgWhite} ${styles.shadowMd}`}>
      <div className={`${styles.container} ${styles.mxAuto} ${styles.px4}`}>
        <div className={`${styles.flex} ${styles.spaceX0}`}>

          <button
            onClick={() => navigate('/')}
            className={`${styles.navBtn}  ${styles.px6} ${styles.py4} ${styles.borderB2} ${styles.borderTransparent} ${styles.hoverBorderOrange500} ${styles.transitionColors}`}
          >
            <Icon iconName='AutoRacing' /> Dashboard
          </button>

          <button
            onClick={() => navigate('/kpi')}
            className={`${styles.navBtn}  ${styles.px6} ${styles.py4} ${styles.borderB2} ${styles.borderTransparent} ${styles.hoverBorderOrange500} ${styles.transitionColors}`}
          >
            <Icon iconName='TaskList' /> KPI Management
          </button>

          <button
            onClick={() => navigate('/audit')}
          className={`${styles.navBtn}  ${styles.px6} ${styles.py4} ${styles.borderB2} ${styles.borderTransparent} ${styles.hoverBorderOrange500} ${styles.transitionColors}`}
          >
            <Icon iconName='History' /> Audit Trail
          </button>

          <button
            onClick={() => navigate('/reports')}
         className={`${styles.navBtn}  ${styles.px6} ${styles.py4} ${styles.borderB2} ${styles.borderTransparent} ${styles.hoverBorderOrange500} ${styles.transitionColors}`}
          >
            <Icon iconName='PowerBILogo' /> Reports
          </button>

          <button
            onClick={() => navigate('/notifications')}
        className={`${styles.navBtn}  ${styles.px6} ${styles.py4} ${styles.borderB2} ${styles.borderTransparent} ${styles.hoverBorderOrange500} ${styles.transitionColors}`}
          >
            <Icon iconName='MailReminder' /> Notifications
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Nav;
