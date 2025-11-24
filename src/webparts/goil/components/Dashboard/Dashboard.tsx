import * as React from "react";
import SummaryCard from "../SummaryCard/SummaryCard";
import Filter from "../Filter/Filter";
import KPICard from "../KPICard/KPICard";
import KPIStatusDistribution from "./KPIStatusDistribution/KPIStatusDistribution";
import KPIDepartmentChart from "./KPIDepartmentChart/KPIDepartmentChart";
// import { Icon } from '@fluentui/react/lib/Icon';
import styles from "./Dashboard.module.scss";
import { IKPI } from "../IKPI";
import { IKPIStats } from "../IKPIStats";

interface IDashboardProps {
  KPIs: IKPI[];
  KPIStats: IKPIStats;
}

const Dashboard: React.FC<IDashboardProps> = ({ KPIs, KPIStats }) => {
  const getTotalKPIcounts = () => {
    const totalKPIcount =
      KPIStats.KPIStatusCounts.achievedCount +
      KPIStats.KPIStatusCounts.missedCount +
      KPIStats.KPIStatusCounts.ongoingCount;

    return totalKPIcount;
  };
  const summarycards = [
    {
      label: "Total KPIs",
      value: getTotalKPIcounts(),
      icon: "BullseyeTarget",
      bgColor: "#ea5b0c",
    },
    {
      label: "Archieved",
      value: KPIStats.KPIStatusCounts.missedCount,
      icon: "SkypeCircleClock",
      bgColor: "#10b981",
    },
    {
      label: "Ongoing",
      value: KPIStats.KPIStatusCounts.ongoingCount,
      icon: "SkypeCircleClock",
      bgColor: "#f59e0b",
    },
    {
      label: "Missed",
      value: KPIStats.KPIStatusCounts.missedCount,
      icon: "IncidentTriangle",
      bgColor: "#ef4444",
    },
  ];

  return (
    // <section className={styles.dashboard}>
    //   <div className={styles.header}>
    <section>
      <div
        style={{
          marginBottom: "1rem",
        }}
      >
        <h2
          style={{
            fontWeight: "700",
            fontSize: "1.875rem",
            lineHeight: "2.25rem",
            color: "#212121",
            margin: ".5rem 0",
          }}
        >
          KPI Dashboard
        </h2>
        <p
          style={{
            color: "#4b5563",
          }}
        >
          Real-time overview of key performance indicators across all
          departments
        </p>
      </div>

      {/* SummaryCards */}
      <div className={styles.summaryCards}>
        {summarycards.map((item, index) => {
          return (
            <SummaryCard
              key={index}
              position={index}
              label={item.label}
              value={item.value}
              icon={item.icon}
              bgColor={item.bgColor}
            />
          );
        })}
      </div>

      <KPIStatusDistribution counts={KPIStats.KPIStatusCounts} />
      <KPIDepartmentChart counts={KPIStats.KPIStatusCounts} />
      <Filter />

      <div className={styles.KPIcards}>
        {KPIs.map((item, index) => {
          return (
            <KPICard
              key={index}
              department={item.department}
              target={item.target}
              timeline="mdo"
              budget={item.budget}
              progress={item.progress}
              status={item.status}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Dashboard;
