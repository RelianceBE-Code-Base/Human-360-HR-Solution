import * as React from "react";
import Card from "../../../../components/common/Card/Card";
import Button from "../../../../components/common/Button/Button";
import { Icon } from "@fluentui/react/lib/Icon";
import styles from "./AuditTrail.module.scss";

type AuditAction = "CREATE" | "APPROVE" | "UPDATE" | "DELETE";

interface IAuditLog {
  id: number;
  title: string;
  action: AuditAction;
  user: string;
  time: string;
  ip: string;
  description: string;
}

const mockLogs: IAuditLog[] = [
  {
    id: 1,
    title: "KPI Created",
    action: "CREATE",
    user: "Ama Owusu",
    time: "2025-01-02 09:15:30",
    ip: "192.168.1.10",
    description: 'Created KPI: "Increase market share in Greater Accra Region"',
  },
  {
    id: 2,
    title: "KPI Approved",
    action: "APPROVE",
    user: "John Mensah",
    time: "2025-01-02 10:42:11",
    ip: "192.168.1.14",
    description: 'Approved KPI: "Reduce operational cost by 10%"',
  },
];

const actionClassMap: Record<AuditAction, string> = {
  CREATE: styles.create,
  APPROVE: styles.approve,
  UPDATE: styles.update,
  DELETE: styles.delete,
};

const AuditTrail: React.FC = () => {
  return (
    <section>
      <h1>Audit Trail</h1>
      <p className="text-muted">
        Complete system activity log and audit history
      </p>

      {/* Filters */}
      <Card title="">
        <div className={styles.filters}>
          <div>
            <label>Action Type</label>
            <select className="form-control">
              <option>All Actions</option>
              <option>Create</option>
              <option>Approve</option>
              <option>Update</option>
              <option>Delete</option>
            </select>
          </div>

          <div>
            <label>User</label>
            <select className="form-control">
              <option>All Users</option>
            </select>
          </div>

          <div>
            <label>Date From</label>
            <input type="date" className="form-control" />
          </div>

          <div>
            <label>Date To</label>
            <input type="date" className="form-control" />
          </div>

          <div className={styles.searchBtn}>
            <Button size="sm">
              <Icon iconName="Search" /> Search
            </Button>
          </div>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card title="Recent Activity">
        <div className={styles.activityList}>
          {mockLogs.map((log) => (
            <div key={log.id} className={styles.activityItem}>
              <div
                className={`${styles.indicator} ${actionClassMap[log.action]}`}
              />

              <div className={styles.content}>
                <h4>{log.title}</h4>
                <p className={styles.meta}>
                  User: {log.user} • Time: {log.time} • IP: {log.ip}
                </p>
                <p className={styles.desc}>{log.description}</p>
              </div>

              <div className={`${styles.badge} ${actionClassMap[log.action]}`}>
                {log.action}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
};

export default AuditTrail;
