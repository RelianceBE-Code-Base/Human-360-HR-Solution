import * as React from 'react';
import styles from './Filter.module.scss';
// import { initializeIcons } from '@fluentui/react/lib/Icons';
import { Icon } from '@fluentui/react/lib/Icon';

// initializeIcons();

export interface IFilterProps {
  title: string;
  subtitle: string;
  userName: string;
  userRole: string;
  notificationsCount?: number;
  onLogout: () => void;
}

const Filter = () => {
  return (
	<div className={styles.filtersCard}>
        <h3>Filters</h3>
        <div className={styles.filtersGrid}>
          <select>
            <option value="">All Departments</option>
            <option value="Operations">Operations</option>
            <option value="Sales">Sales</option>
            <option value="Finance">Finance</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
          </select>
          <select>
            <option value="">All Status</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Achieved">Achieved</option>
            <option value="Missed">Missed</option>
          </select>
          <input type="month" />
          <button>
            <Icon iconName="Filter" /> Apply Filters
          </button>
        </div>
      </div>
  );
};

export default Filter;
// export {itemsCommandBar};