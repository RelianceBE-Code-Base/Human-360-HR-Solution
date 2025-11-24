import * as React from "react";
import styles from "./Reports.module.scss";
// import { initializeIcons } from '@fluentui/react/lib/Icons';
// import { Icon } from "@fluentui/react/lib/Icon";
import KPIDetailsForm from "../KPIDetails/KPIDetailsForm";
import KPIList from "../KPIList/KPIList";
import { IKPI } from "../IKPI";

interface IKPIMangementProps {
  KPIs: IKPI[];
}

const KPIManagement: React.FC<IKPIMangementProps> = ({ KPIs }) => {
  const [showForm, setShowForm] = React.useState(false);

  return (
    <section className={styles.KPIManagement}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#ffffff",
          marginBottom: "1rem",
        }}
      >
        <div>
          <h2
            style={{
              fontWeight: "700",
              fontSize: "1.875rem",
              lineHeight: "2.25rem",
              color: "#212121",
              margin: ".5rem 0",
            }}
          >
            KPI Mangement
          </h2>
          <p
            style={{
              color: "#4b5563",
            }}
          >
            Create, edit, and manage key performance indicators
          </p>
        </div>
        <button
          style={{
            backgroundColor: "#ea5b0c",
            padding: ".75rem 1.25rem",
            borderRadius: ".5rem",
            cursor: "pointer",
            border: "1px solid transparent ",
            display: "flex",
            justifyContent: "center",
            gap: "10px",
          }}
          onClick={() => setShowForm(!showForm)}
          className={styles.addButton}
        >
          {showForm ? "Close Form" : `Add New KPI `}
          {/* ${<Icon iconName="Add"/>} */}
        </button>
      </div>
      {showForm && <KPIDetailsForm setShowForm={setShowForm} />}

      <KPIList kpis={KPIs} onDelete={() => {}} onEdit={() => {}} />
    </section>
  );
};

export default KPIManagement;
// export {itemsCommandBar};
