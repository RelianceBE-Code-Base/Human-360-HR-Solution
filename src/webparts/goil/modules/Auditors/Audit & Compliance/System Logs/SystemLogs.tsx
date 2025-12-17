import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import styles from "./SystemLogs.module.scss";
import { IStatsData } from "../../../../../../shared/types/IStatsData";
import StatsCard from "../../../../components/common/Card/StatsCard";
// REMOVED: import { ... } from "react-icons/fa";

export type LogSeverity = "CRITICAL" | "ERROR" | "WARNING" | "INFO";

export interface ISystemLog {
  id: string;
  severity: LogSeverity;
  message: string;
  details?: string;
  category: string;
  user?: string;
  timestamp: string;
}

// --- Mock Data Generator ---
const generateMockLogs = (): ISystemLog[] => {
  const categories = [
    "[authentication]",
    "[api]",
    "[database]",
    "[performance]",
    "[security]",
  ];
  const severities: LogSeverity[] = ["INFO", "WARNING", "ERROR", "CRITICAL"];
  const users = ["user_19", "user_5", "user_13", "user_4", "admin", "system"];
  const messages = {
    INFO: [
      "Configuration updated",
      "Session created",
      "Database connection established",
    ],
    WARNING: [
      "Unauthorized access attempt",
      "Memory usage high",
      "Slow query detected",
      "Security scan completed",
    ],
    ERROR: [
      "Data export failed",
      "Failed login attempt",
      "Database connection lost",
      "Session created",
    ],
    CRITICAL: [
      "API rate limit reached",
      "System crash imminent",
      "Security breach detected",
      "Data corruption detected",
    ],
  };

  return Array.from({ length: 25 })
    .map((_, i) => {
      const sev = severities[Math.floor(Math.random() * severities.length)];
      const cat = categories[Math.floor(Math.random() * categories.length)];

      return {
        id: `LOG-${1000 + i}`,
        severity: sev,
        category: cat,
        message: `${cat} ${
          messages[sev][Math.floor(Math.random() * messages[sev].length)]
        }`,
        details:
          sev === "INFO" ? undefined : "Stack trace would appear here...",
        user: users[Math.floor(Math.random() * users.length)],
        timestamp: new Date(
          Date.now() - Math.floor(Math.random() * 1000000000)
        ).toISOString(),
      };
    })
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
};

const SystemLogs: React.FC = () => {
  // --- State ---

  const [logs, setLogs] = useState<ISystemLog[]>([]);
  const [filters, setFilters] = useState({
    level: "All Levels",
    category: "All Categories",
    startDate: "",
    endDate: "",
    search: "",
  });

  // --- Initialize Data ---
  useEffect(() => {
    setLogs(generateMockLogs());
  }, []);

  // --- Derived Data (Stats & Filtering) ---
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchLevel =
        filters.level === "All Levels" || log.severity === filters.level;
      const matchCategory =
        filters.category === "All Categories" ||
        log.category.includes(filters.category);
      const matchSearch =
        log.message.toLowerCase().includes(filters.search.toLowerCase()) ||
        log.id.toLowerCase().includes(filters.search.toLowerCase());
      return matchLevel && matchCategory && matchSearch;
    });
  }, [logs, filters]);

  const stats = useMemo(() => {
    const total = logs.length;
    const errs = logs.filter(
      (l) => l.severity === "ERROR" || l.severity === "CRITICAL"
    ).length;
    const warns = logs.filter((l) => l.severity === "WARNING").length;
    // Simple mock health calculation
    const health =
      total > 0 ? Math.round(100 - ((errs * 2 + warns) / total) * 10) : 100;

    return {
      total,
      errors: errs,
      warnings: warns,
      health: Math.max(0, health), // Ensure not negative
    };
  }, [logs]);

  // --- Handlers ---
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const formatDate = (isoString: string) => {
    const d = new Date(isoString);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
  };

  // --- Render Helpers ---
  // UPDATED: Using Flaticon classes (assuming standard 'fi fi-rr-' prefix)
  const getSeverityIcon = (sev: LogSeverity) => {
    switch (sev) {
      case "CRITICAL":
        return <i className="fi fi-rr-skull"></i>;
      case "ERROR":
        return <i className="fi fi-rr-cross-circle"></i>;
      case "WARNING":
        return <i className="fi fi-rr-triangle-warning"></i>;
      case "INFO":
        return <i className="fi fi-rr-info"></i>;
    }
  };

  const logStats: IStatsData[] = [
    {
      label: "Total Logs",
      icon: "fi fi-rr-info",
      value: stats.total, // Assuming 'stats' is available in scope
      iconColour: "info",
      change: {
        description: "All recorded events",
        type: "neutral",
        icon: "",
      },
    },
    {
      label: "Warnings",
      icon: "fi fi-rr-triangle-warning",
      value: stats.warnings,
      iconColour: "warning",
      change: {
        description: "Non-critical issues",
        type: "neutral",
        icon: "",
      },
    },
    {
      label: "Errors",
      icon: "fi fi-rr-cross-circle",
      value: stats.errors,
      iconColour: "danger", // You may need to map this to a specific color class in your CSS
      change: {
        description: "Requires attention",
        type: "negative",
        icon: "",
      },
    },
    {
      label: "System Health",
      icon: "fi fi-rr-check-circle",
      value: stats.health,
      iconColour: "success",
      change: {
        description: "Overall status",
        type: "positive",
        icon: "",
      },
    },
  ];

  return (
    <div className={styles.pageContainer}>
      {/* Header */}

      <h1>System Logs</h1>
      <p className="text-muted">Monitor system activity and error logs</p>

      {/* Stats Section */}

      <section className={styles.statsGrid}>
        {logStats.map((stat, index) => (
          <StatsCard
            key={index}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            iconColour={stat.iconColour}
            change={stat.change}
          />
          // We dynamically build the className based on the iconColour property
          // e.g., styles.statInfo, styles.statWarning, etc.
        ))}
      </section>

      {/* Filter Section */}
      <section className={styles.filterSection}>
        <div className={styles.filterHeader}>
          <h3>
            <i className="fi fi-rr-filter" style={{ marginRight: "5px" }}></i>{" "}
            Log Filters
          </h3>
          <div className={styles.actionButtons}>
            <button
              className={styles.primaryBtn}
              onClick={() => setLogs(generateMockLogs())}
            >
              <i className="fi fi-rr-refresh"></i> Refresh
            </button>
            <button onClick={() => alert("Exporting CSV...")}>
              <i className="fi fi-rr-download"></i> Export
            </button>
          </div>
        </div>

        <div className={styles.filterGrid}>
          <div className={styles.formGroup}>
            <label>Log Level</label>
            <select
              name="level"
              value={filters.level}
              onChange={handleFilterChange}
            >
              <option>All Levels</option>
              <option value="CRITICAL">CRITICAL</option>
              <option value="ERROR">ERROR</option>
              <option value="WARNING">WARNING</option>
              <option value="INFO">INFO</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Category</label>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
            >
              <option>All Categories</option>
              <option value="authentication">Authentication</option>
              <option value="database">Database</option>
              <option value="api">API</option>
              <option value="security">Security</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Start Date</label>
            <input type="date" name="startDate" onChange={handleFilterChange} />
          </div>
          <div className={styles.formGroup}>
            <label>End Date</label>
            <input type="date" name="endDate" onChange={handleFilterChange} />
          </div>
          <div className={styles.formGroup}>
            <label>Search</label>
            <input
              type="text"
              name="search"
              placeholder="Search logs..."
              value={filters.search}
              onChange={handleFilterChange}
            />
          </div>
        </div>
      </section>

      {/* Main Logs List */}
      <section className={styles.logsContainer}>
        <div className={styles.listHeader}>
          <h3>System Logs</h3>
          <div className={styles.paginationControl}>
            <input type="checkbox" id="autorefresh" />
            <label htmlFor="autorefresh">Auto-refresh (30s)</label>
            <select>
              <option>50 per page</option>
              <option>100 per page</option>
            </select>
          </div>
        </div>

        <div className={"loglistwrapper"}>
          {filteredLogs.length === 0 ? (
            <p style={{ textAlign: "center", padding: "2rem", color: "#888" }}>
              No logs found matching criteria.
            </p>
          ) : (
            filteredLogs.map((log) => (
              <div
                key={log.id}
                // FIX: converted severity to lowercase to match SCSS modules behavior
                className={`${styles.logEntry} ${
                  (styles as any)[log.severity.toLowerCase()]
                }`}
              >
                <div className={styles.logHeader}>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span className={styles.severityIcon}>
                      {getSeverityIcon(log.severity)}
                    </span>
                    <span>{log.severity}</span>
                  </span>
                  <span>{formatDate(log.timestamp)}</span>
                </div>
                <div className={styles.logBody}>
                  <div>
                    <strong>{log.category}</strong> {log.message}
                    {log.user && (
                      <span className={styles.userTag}>User: {log.user}</span>
                    )}
                  </div>
                  {log.details && (
                    <div
                      style={{
                        marginTop: "5px",
                        opacity: 0.8,
                        fontSize: "0.8em",
                      }}
                    >
                      {log.details}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
            gap: "0.5rem",
          }}
        >
          <button
            disabled
            style={{ padding: "5px 10px", cursor: "not-allowed", opacity: 0.5 }}
          >
            Previous
          </button>
          <span style={{ padding: "5px" }}>Page 1 of 4</span>
          <button style={{ padding: "5px 10px", cursor: "pointer" }}>
            Next
          </button>
        </div>
      </section>

      {/* Recent Errors Section (Bottom Panel) */}
      <section className={styles.recentErrors}>
        <h3>
          <i className="fi fi-rr-bug" style={{ marginRight: "5px" }}></i> Recent
          Errors
        </h3>
        <div className={styles.simpleErrorList}>
          {logs
            .filter((l) => l.severity === "ERROR" || l.severity === "CRITICAL")
            .slice(0, 5)
            .map((err) => (
              <div
                key={`recent-${err.id}`}
                className={`${styles.simpleErrorItem} ${
                  err.severity === "CRITICAL" ? styles.crit : styles.err
                }`}
              >
                <span className={styles.time}>{formatDate(err.timestamp)}</span>
                <div className={styles.msg}>
                  [{err.severity}] {err.message}
                </div>
                {err.details && (
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "#888",
                      marginTop: "2px",
                    }}
                  >
                    {err.details}
                  </div>
                )}
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default SystemLogs;
