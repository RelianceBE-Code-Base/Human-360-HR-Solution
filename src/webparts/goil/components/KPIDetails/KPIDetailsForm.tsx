import * as React from 'react';
import styles from './KPIDetailsForm.module.scss';

interface IKPIDetailsFormProps {
  setShowForm:React.Dispatch<React.SetStateAction<boolean>>
}

const KPIDetailsForm: React.FC<IKPIDetailsFormProps> = ({setShowForm}) => {
  return (
    <div className={styles.kpiFormContainer}>
      <h2>KPI Details</h2>

      <form className={styles.kpiForm}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Objective</label>
            <textarea />
          </div>
          <div className={styles.formGroup}>
            <label>Indicator</label>
            <input type="text" />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Target</label>
            <input type="text" />
          </div>
          <div className={styles.formGroup}>
            <label>Baseline</label>
            <input type="text" />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Department</label>
            <select>
              <option>Select Department</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Status</label>
            <select>
              <option>Ongoing</option>
              <option>Completed</option>
              <option>Pending</option>
            </select>
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Timeline Start</label>
            <input type="date" />
          </div>
          <div className={styles.formGroup}>
            <label>Timeline End</label>
            <input type="date" />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Budget (GHS)</label>
            <input type="text" />
          </div>
          <div className={styles.formGroup}>
            <label>Frequency</label>
            <select>
              <option>Weekly</option>
              <option>Monthly</option>
              <option>Quarterly</option>
              <option>Yearly</option>
            </select>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Activities</label>
          <textarea rows={3} />
        </div>

        <div className={styles.formGroup}>
          <label>Means of Verification</label>
          <textarea rows={3} />
        </div>

        <div className={styles.formGroup}>
          <label>Comments</label>
          <textarea rows={3} />
        </div>

        <div className={styles.formActions}>
          <button type="button" className={styles.cancelBtn} onClick={() =>setShowForm(false)}>Cancel</button>
          <button type="submit" className={styles.saveBtn}>Save KPI</button>
        </div>
      </form>
    </div>
  );
};

export default KPIDetailsForm;
