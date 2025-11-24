import * as React from "react";
import styles from "./KPIList.module.scss";
import { IKPI } from "../../../../shared/types/IKPI";
import { Icon } from "@fluentui/react";
// import { Icon } from '@fluentui/react/lib/Icon';

interface KPIListProps {
  kpis: IKPI[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}
const KPIList: React.FC<KPIListProps> = ({ kpis, onEdit, onDelete }) => {
  const getKPISatusColor = (value: number): string => {
    if (value < 60) return "#ef4444"; //red
    if (value < 100) return "#fbc02d"; // Yellow
    return "#10b981"; // Green
  };
  return (
    <div className={styles.kpiListContainer}>
      <table className={styles.kpiTable}>
        <thead>
          <tr>
            <th>Indicator</th>
            <th>Department</th>
            <th>Status</th>
            <th>Target</th>
            <th>Timeline</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {kpis.map((kpi) => (
            <tr key={kpi.id}>
              <td>
                <div
                  style={{
                    color: "#111827",
                    fontWeight: 500,
                  }}
                >
                  {kpi.indicator}
                </div>
                <div
                  style={{
                    color: "#6b7280",
                  }}
                >{`(${kpi.objective})`}</div>
              </td>
              <td>{kpi.department}</td>
              <td>
                <span
                  className={`${styles.statusTag} 
                
                `}
                  style={{
                    backgroundColor: getKPISatusColor(kpi.progress),
                  }}
                >
                  {kpi.status}
                </span>
              </td>
              <td>{kpi.target}</td>
              <td>
                {kpi.timelineStart} - {kpi.timelineEnd}
              </td>
              <td className={styles.actions}>
                <Icon
                  iconName="SingleColumnEdit"
                  onClick={() => onEdit(kpi.id)}
                  className={styles.editIcon}
                />
                <Icon
                  iconName="Delete"
                  onClick={() => onDelete(kpi.id)}
                  className={styles.deleteIcon}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KPIList;

// export {itemsCommandBar};
